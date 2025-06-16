const fs = require("fs");

// 동기 방식 readFilesync
const data = fs.readFileSync("package.json", "utf8");
console.log("동기");
console.log(data);
console.log("seeya");
// 비동기 방식으로 읽기 readFile(파일명 인코딩 콜백함수)
console.log(
  "---------------------비동기 방식으로 파일 읽기 시작-------------------"
);
fs.readFile("ex01_global2.js", "utf8", function (err, data) {
  // callback 함수
  if (err) throw err; //console.error(err)
  console.log("비동기");
  console.log(data);
  console.log("종료");
  return;
});

