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
