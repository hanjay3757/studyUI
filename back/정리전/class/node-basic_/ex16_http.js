// ex16_http.js
const http = require('http')

http.createServer((req, res)=>{
    const uri =req.url;
    if(uri=='/'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        res.write(`
            <ul>
                <li><a href='/hi'>Hi</a></li>
                <li><a href='/hello'>Hello</a></li>
            </ul>
            `);
        res.end();    
    }else if(uri=='/hi'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        res.end(`<h1 style='color:green'>Hi Node.js</h1>`)

        //글자색 : green  "Hi Node.js~"
    }else if(uri=='/hello'){
        //글자색: red "Hello Node.js"
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        res.write(`<h1 style='color:red'>Hello Node.js</h1>`)
        res.end(`<a href='/'>Home</a>`)
    }
}).listen(5555,()=>{
    console.log(`http://localhost:5555`);
    
})