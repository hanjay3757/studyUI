//userController
const pool = require('../models/dbPool')
const bcrypt = require('bcrypt')
//회원가입 처리 메서드
exports.createUser = async (req, res )=>{
    console.log(req.body)
    const { name,email, passwd, role } = req.body;
    if(!name || !email || !passwd){
        return res.status(400).json({result:'fail',message:'이름,이메일,비밀번호 모두 입력해야 해요'})
    }
    const sql=`insert into members(name,email,passwd,role) values(?,?,?,?)`;
    try {
        //비밀번호 암호화 => bcrypt 모듈 npm i bcrypt
        //ex) passwd:111 (평문) ==>  해싱(111 + salt)
        const saltRound =10; //2^10 (1024)번 반복된 해싱값을 생성하기 위해
        const hashPasswd = await bcrypt.hash(passwd, saltRound);
        console.log(hashPasswd);
        //로그인 시에는 bcrypt.compare(passwd, dbPasswd) 이용해서 비교
        const [result] = await pool.query(sql,[name,email,hashPasswd,role])
        if(result.affectedRows>0){
            res.json({result:'success', message:'회원가입 완료-로그인하세요', 
                        data:{insertId: result.insertId}});
        }else{
            res.json({result:'fail', message:'회원정보 등록 실패'})
        }
    } catch (error) {
        console.error('error: ', error)
        res.status(500).json({result:'fail', message:'DB SQL 에러 '+error.message})
    }

}//createUser-------------------------------

//이메일 중복 여부 체크
exports.duplicatedEmail = async(req, res)=>{
    const {email} =req.body;
    console.log(email);
    

}//duplicatedEmail------------------------