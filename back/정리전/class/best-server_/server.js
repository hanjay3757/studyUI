const express =require('express')
require('dotenv').config()
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')


//라우터 가져오기
const indexRouter = require('./src/routes/indexRouter')
const postRouter = require('./src/routes/postRouter')
const userRouter = require('./src/routes/userRouter')
const adminRouter = require('./src/routes/adminRouter')
const loginRouter = require('./src/routes/loginRouter')
const { verifyAccessToken, verifyAdmin } = require('./src/middlewares/verifyMiddleware')

const port =process.env.PORT||7777;

const app=express()

//미들웨어 설정
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(morgan('dev'))
app.use(cors()) //react와 통신하려면 필요한 미들웨어


//라우터와 연결
app.use('/', indexRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/admin',verifyAccessToken, verifyAdmin ,adminRouter) //관리자인지 여부를 체크하는 미들웨어 설정
app.use('/api/auth', loginRouter) //사용자 인증을 체크

//서버가동
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);    
})