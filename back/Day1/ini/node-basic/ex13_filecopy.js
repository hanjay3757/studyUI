const fs = require("fs");
const zlib = require("zlib"); //파일 압축시 사용하는 모듈
const copy = function (src, dest) {
  const rs = fs.createReadStream(src); //원본 파일명 => 읽는 스트림 연결
  const ws = fs.createWriteStream(dest);
  // 목적 파일명 => 쓰는 스트림 연결
  rs.pipe(ws);
  console.log(">>파일 카피중...<<<<");
};
//readeStream.pipe(writeStream)
//읽는 스트림과 쓰는 스트림을 연결해서 데이터를 전달하는 기능 수행
console.log("복사시작>ㅁ<");
// copy("ex03_process.js", "ex13_copy.txt");
copy("캡처.JPG", "myimage.JPG");
fs.createReadStream("캡처.JPG")
  .pipe(zlib.createGzip()) //gzip압축
  .pipe(fs.createWriteStream("yourimg.gz"))
  .on("finish", () => {
    console.log("파일 압축완료");
  });
console.log("복사완료");
