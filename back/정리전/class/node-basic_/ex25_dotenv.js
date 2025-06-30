// ex25_dotenv.js
//npm i dotenv 
//설치한후
//.env 파일을 생성하자
/**---.env------
# key=value
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=testdb
 * 
 */
const dotenv =require('dotenv')
dotenv.config()
//dotenv모듈을 이용해서 .env파일에서 환경변수를 로드하고
//process.env객체에 추가한다
//==> process.env를 이용해 설정정보를 꺼내올 수 있다
//.env.development/ .env.test  / .env.production 등으로 파일을 나누고
//각 환경에 맞는 설정을 관리할 수 있다
//[주의사항] .env ==> .gitignore 에 추가하여 중요한 정보들이 노출되지 않도록 관리해야 함
const express = require('express')
const app= express()

const port =process.env.PORT|| 4000;
const dbUrl= process.env.DB_HOST;
const dbPort=process.env.DB_PORT;
app.get('/',(req,res)=>{
    let str=`<h1>DB HOST: ${dbUrl}</h1>
    <h1>DB PORT: ${dbPort}</h1>
    `
    res.end(str)
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
    
})
