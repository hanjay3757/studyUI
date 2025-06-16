const http = require("http");
const { styleText } = require("util");

http
  .createServer((req, res) => {
    const uri = req.url;
    if (uri == "/") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.write(`
        <ul>
          <li>
            <a href="/hi">HI</a>
          </li>
          <li>
            <a href="/hello">Hello</a>
          </li>
        </ul>`);
      res.end();
    } else if (uri == "/hi") {
      `<h1>뭘봐</h1>`;
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(`<h1 style = 'color:green'>hello</h1>`);
    } else if (uri == "/hello") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.write(`<h1 style="color:red;">너왕</h1>`);
      res.end(`<a href=
        '/'>home</a>`);
    }
  })
  .listen(5555, () => {
    console.log(`http://localhost:5555`);
  });
