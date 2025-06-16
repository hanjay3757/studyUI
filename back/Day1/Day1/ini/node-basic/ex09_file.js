const fs = require("fs");

// 동기 방식
const data = fs.readFileSync("package.json", "utf8");
console.log(data);
console.log("seeya");
