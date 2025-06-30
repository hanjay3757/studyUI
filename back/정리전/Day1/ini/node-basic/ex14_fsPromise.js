const { copyFile } = require("fs");

// 비동기방식
const fs = require("fs").promises;
console.log("start");
fs.readFile("ex04_os.js")
  .then((data) => {
    console.log(data.toString());
    return fs.readFile("out.txt");
  })
  .then((data2) => {
    console.log("================================");
    console.log(data2.toString());
  })
  .catch((err) => console.error(err));

console.log("end");
fs.copyFile("ex05_module.js", "ex05_copy2.txt")
  .then(() => {
    console.log("카파완료");
  })
  .catch(console.log);

// async.await
async function copy(src, dest) {
  try {
    await fs.copyFile(src, dest);
    console.log(">>>>>>><<<<<<<<<<", dest);
  } catch {
    console.error("파일 카피 중 에러", error);
  }
}
//copy(0 호출) 캡처 이미지를 herimg.jpg 로 카피
copy("캡처.JPG", "herimg.JPG");
