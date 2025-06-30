//postRouter.js
const express = require('express')
const router = express.Router();
const path = require('path')
const multer = require('multer');//파일 업로드 모듈
//npm i multer
const postController = require('../controllers/postController')

//파일 업로드 설정
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(__dirname,'..','..','public','uploads'))
        //콜백함수에 업로드할 파일의 저장 경로를 전달
    },
    filename: function(req, file, callback){
        //한글 파일명 깨짐
        file.originalname = Buffer.from(file.originalname,'latin1').toString('utf8')
        callback(null, Date.now()+'-'+file.originalname);
        //업로드할 파일명: '업로드한날짜시간벙-원본파일명' => 동일한 파일명 중복을 피하기 위한 설정
    }
})
const upMulter = multer({storage:storage})

// '/api/posts/'
//get /api/posts
router.get('/',postController.listPost)

//post /api/posts : 포스트 글쓰기(C) - 파일업로드 처리 필요
//multer 미들웨어 설정해야 함 => 라우터 단위 미들웨어 설정
router.post('/', upMulter.single('file') ,postController.createPost ) 

router.get('/:id', postController.viewPost)

router.delete('/:id', postController.deletePost)

router.put('/:id', upMulter.single('file'),  postController.updatePost)
module.exports = router;