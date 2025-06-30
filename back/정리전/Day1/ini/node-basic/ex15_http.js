//http 모듈 : 웹서버를 만들거나 클라이언트로 http요청을 보낼수 있게하는 모듈
//express 모듈: 외장 ,설치해서 사용, 더많은 기능을 가짐
const http = require("http");
//createServer() : 웹서버를 생성함
const server = http.createServer((req, res) => {
  console.log(`요청방식 : ${req.method}`); //GET,POST....
  console.log(`요청url : ${req.url}`);
  res.statusCode = 200; // 200 = 성공
  res.setHeader("Content-Type", "text/html; charset=utf-8"); //헤더의 컨텐트 타입 설정
  res.write(`<h1> hello node.js </h1>`);
  res.write(`<h2>안녕</h2>`);
  res.end();
});
//서버 가동
server.listen(3333, () => {
  console.log("potal번호 httpL//localhost:3333 서비스 중");
});
