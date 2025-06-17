const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("url: ", req.url);

  if (req.url === "/") {
    // 상대 경로 대신 절대 경로 사용
    const filename = path.join(__dirname, "..", "public", "pizzaUI.html");
    // 또는
    // const filename = "C:\\Users\\ezen501-12\\Desktop\\오전반\\studyUI\\back\\Day2\\public\\pizzaUI.html";

    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        // res.writeHead(404);
        // res.end("File Not Found");
        throw err;
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); //헤더 설정
      res.write(data); //응답 body에 내용적기 
      res.end(); //end() 가 호출되면 응답전송이 완료되므로 더이상 데이터 쓰기가 불가능
    });
  }
});

server.listen(5555, () => {
  console.log("http://localhost:5555");
});
