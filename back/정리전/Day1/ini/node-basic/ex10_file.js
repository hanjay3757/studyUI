const fs = require("fs");
let data = "how are you";
fs.writeFileSync("result.txt", data);
console.log("finish");

fs.writeFile("result2.txt", "data", "utf8", (err) => {
  if (err) {
    console.error(err, err.message);
    return;
  }
  console.log("result2.txt 쓰기 완료");
});
