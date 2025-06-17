// ex18_middleware.js
var http = require('http'),
    express = require('express');

var app = express();
app.set('port', 5577);
//1.전역 미들웨어. 라우터 전에 배치한다
//미들웨어 함수를 사용하도록 하려면 use() 함수를 이용
app.use((req, res, next) => {
    console.log('1. 미들웨어 요청 처리...');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Express Middleware</h1>');
    next(); // 다음 미들웨어로 가도록 함
});
app.use((req, res, next) => {
    console.log('2. 미들웨어 요청 처리...');
    req.user = 'King';
    next();
});
app.use((req, res, next) => {
    console.log('3. 미들웨어 요청 처리...');
    res.write(`<h2 style='color:green'>${req.user}</h2>`); //여기서 user정보 출력
    next();
});

function auth(req, res, next) {
    console.log('auth미들웨어 들어옴...');

    if (!req.headers || !req.headers.authorization) {
        return res.status(401).end('<h1 style="color:red">인증받지 않은 사용자는 서비스 이용 불가</h1>');
    }
    next();
}

app.get('/', (req, res) => {
    res.write('<h1>get방식으로 /로 요청 들어옴</h1>');
    console.log('get방식으로 /로 요청 들어옴');
    res.end();
});
//2. 라우터 미들웨어 (인증 미들웨어)
app.get('/protected', auth, (req, res) => {
    res.write('<h1>비밀 정보입니다</h2>');
    res.end();
});
/**전역 미들웨어 1, 2, 3 실행 → 로그 3개 찍힘
auth 미들웨어 실행 → 로그 찍힘
그런데 다시 전역 미들웨어 1, 2, 3이 또 실행 → 다시 3개 로그 찍힘 

왜 미들웨어가 두 번 실행될까?
원인은 next() 호출 후 전역 미들웨어 내에서 res.write()만 하고 res.end()를 호출하지 않아서임
next()가 호출되면 다음 미들웨어가 실행되고, 클라이언트가 실제로 응답을 끝내지 않았기 때문에 다시 라우터와 미들웨어 체인이 돌면서 재진입하는 상황처럼 보임
*/
http.createServer(app).listen(app.get('port'), () => {
    console.log('http://localhost:' + app.get('port'));
});
/**
 * res.end()와 next() 호출의 순서: res.end()를 호출하고 나서도 다음 미들웨어가 실행되는 경우가 있다.
 * res.end()는 응답을 클라이언트로 보내는 것이지 미들웨어 체인을 종료하는 것이 아니다.
 * 미들웨어 체인은 next()가 호출될 때까지 계속 진행
 */
