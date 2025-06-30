//promise

const http = require("http");
const fs = require("fs").promises;
const path = require("path");
// npm i -D nodemon
http
  .createServer(async (req, res) => {
    if (req.url == "/") {
      const filename = path.join(__dirname, "..", "public", "tourSample.html");
      try {
        const data = await fs.readFile(filename);
        res.writeHead(200, "const-type", "text/html; charset = utf-8");
        res.end(data);
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "const-type": "text/plain; charset=utf-8" });
        res.end(error.message);
      }
    }
  })
  .listen(3333, () => {
    console.log("http://localhost:3333");
  });
