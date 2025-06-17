const express = require("express");
const app = express();
//미들웨어는 요청과 응답 사이에 추가적인 기능을 하는 중간작업을 하고자 할 때 미들웨어를 사용한다
//가령 인증 수행, 세션처리, 예외처리,라우터 등
//미들웨어는 app.use()메서드를 이용한다.
//아래 예제는 요청이 들어올 때마다 로그 기록을 남기는 미들웨어 예제
/**형태
 * app.use(미들웨어) : 모든 요청에서 미들웨어 실행
 * app.use('/path',미들웨어) : 특정경로로 시작하는 요청에서 미들웨어 실행
 * app.post('/path',미들웨어) : 특정 경로의 post방식 요청에서 미들웨어 실행
 * next 인증받은 사용자 정보 넘기기를 원하면
 */

const myLogger = (req, res, next) => {
  console.log("요청들어온 경로: " + req.url + ", 요청메소드 :" + req.method);
  next();
};
//미들웨어 설정 -로깅 미들웨어
// app.use(myLogger);
app.use("/users", myLogger);

//라우터
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/users", (req, res) => {
  res.send(" World2!");
});
app.listen(3333, () => {
  console.log(`http://localhost:3333`);
});
