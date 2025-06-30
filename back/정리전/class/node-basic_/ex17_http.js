const http = require('http')
const fs = require('fs')
const path = require('path')
http.createServer((req,res)=>{
    if(req.url =='/'){
        // res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        // res.write(`<a href='/public/pizzaUI.html'><h1>피자 주문하기</h1></a>`);
        // res.end();
        const filename = path.join('public','pizzaUI.html')
        console.log(filename); //public/pizzaUI.html
        console.log(path.resolve(filename));//절대경로

        //fs 이용해서 filename 읽어서 파일 데이터를 res를 통해 브라우저에 write하세요
        fs.readFile(filename,'utf8', (err, data)=>{
            //html내용=> data에 담김
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})//헤더 설정
            res.write(data);//응답 body에 내용 쓰기
            res.end();//end()가 호출되면 응답 전송이 완료되므로 더이상 데이터 쓰기가 불가능
        })
    } 
}).listen(5555, ()=>{
    console.log(`http://localhost:5555`);
})