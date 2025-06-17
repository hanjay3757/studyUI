const express = require('express');

const app = express();

app.set('port', process.env.PORT || 5555);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pizzaUI.html');
    //fs모듈의 readFile()대신 sendFile()을 사용할 수 있다.
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});
