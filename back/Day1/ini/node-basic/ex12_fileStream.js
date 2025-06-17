const fs = require("fs");
const writeStream = fs.createWriteStream("out.txt");

writeStream.write("Hello, world!\n");
writeStream.end(); // 이 줄이 꼭 필요합니다!

writeStream.on("finish", () => {
  console.log("out.txt에 쓰기 완료");
});
writeStream.on("error", (err) => {
  console.log("파일쓰기중 에러발생", err.message);
});
