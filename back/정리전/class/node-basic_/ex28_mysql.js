const express = require('express')
//npm i mysql2
const mysql = require('mysql2')
const port = 5555;
const app = express();
let pool;
//데이터베이스 커넥션 풀 설정(mysql2)
//즉시 실행함수
(async()=>{
    try{
        pool = await mysql.createPool({
            host:'localhost',
            port:3306,
            database:'eduDB',
            user:'ezen',
            password:'1234',
            connectionLimit: 10
        }).promise() //Promise 기반으로 변환
    }catch(err){
        console.error('db 접속 실패: ', err)
    }
})();//즉시 실행함수


//미들웨어 설정
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//회원가입
app.post(`/api/users`, async (req , res)=>{
    //post방식 => req.body, get => req.query, '/api/users/100' ==> req.params
    const { name,email,passwd} = req.body;
    console.log(name, email, passwd);
    //유효성 체크 (not null 제약조건을 가진 필드들)
    if(!name || !email || !passwd){
        return res.status(400).json({result:'fail',
             message:'이름,이메일,비밀번호는 반드시 입력해야 해요'})
    }
    
    try {
        //db 연동
        const sql=`insert into members(name,email,passwd)
            values(?,?,?)
        `
        const [result] = await pool.query(sql, [name,email,passwd])

        console.log(result);

        res.json({result:'success', message:'회원가입 완료-로그인하세요'})
    } catch (error) {
        console.error(error)
        res.status(500).json({result:'fail', message:'DB에러 :'+error.message})
    }

} )

//서버 시작
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);    
})