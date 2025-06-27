// ex03_process.js
//process 객체: 프로그램과 프로세스 관련 기능을 수행
//속성
//argv
console.log('argv속성의 파라미터 수: %d', process.argv.length);
console.log(process.argv);
//node ex03_process.js 99 88 77
console.log(process.argv[2]);
process.argv.forEach((val, i)=>{
    console.log(`${i} : ${val}`);    
})
//process.env : 운영체제에 의해 설정된 환경 변수가 들어감
console.log('****************************');
// console.log(process.env);
console.log(process.env['OS']);
console.log(process.env['Path']);

//process.exit(); //프로그램 종료
/*노드에서 이벤트 등록 방법
[1] addListener('이벤트', 핸들러함수)
[2] on('이벤트',핸들러함수)

이벤트를 강제로 발생시키고자 할 때는
[1] emit('이벤트종류')
*/
process.addListener('exit', ()=>{
    console.log('프로그램이 종료됩니다 Bye Bye~~');    
})
// process.exit()

process.on('myevent', ()=>{
    console.log('myevent가 발생했군요~~~~~');    
})
process.emit('myevent');