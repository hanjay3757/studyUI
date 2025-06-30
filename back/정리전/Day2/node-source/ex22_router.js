const express = require("express"),
  fs = require("fs"),
  path = require("path");
const app = express();
app.set("port", 9090);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get("/users", (req, res) => {
  let str = ` <h1>all register</h1>
      <ul><li><a href="/users/1">1</a></li>
      <li><a href="/users/2">2</a></li>
      <li><a href="/users/3">3</a></li></ul>`;
  res.send(str);
});

app.listen(app.get("port"), () => {
  console.log("http://localhost:" + 9090);
});
// 상위 디렉토리의 public 폴더 경로 설정
// const publicDir = path.join(__dirname, "..", "public");
// 정적 파일 서비스 설정 (CSS, JS, 이미지 등)
// app.use(express.static(publicDir));

/**라우팅----------
 * get  '/' =>index.html 보여주기
 * get  '/users' =>모든 회원 목록
 * get  '/users/아이디' =>특정 회원정보
 * 그 외의 요청 => 해당 페이지는 존재하지 않아요
 */

// // 루트 경로 처리
// app.get("/", (req, res) => {
//   // 상위 디렉토리의 public 폴더에서 index.html 파일 제공
//   res.sendFile(path.join(publicDir, "index.html"));
// });

// app.get("/users", (req, res) => {
//   res.send("<h1>모든 회원 목록</h1>");
// });

// app.get("/users/:uid", (req, res) => {
//   res.send(`<h1 style='color:blue'>${req.params.uid}번 회원님의 정보</h1>`);
// });

// // 404 처리
// app.get("*", (req, res) => {
//   res.status(404).send('<h1 style="color:red">해당 페이지는 없습니다.</h1>');
// });

// app.listen(app.get("port"), () => {
//   console.log("http://localhost:" + app.get("port"));
//   console.log(`정적 파일 디렉토리: ${publicDir}`);
// });
