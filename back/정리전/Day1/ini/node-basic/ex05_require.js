const obj = require("./ex05_module");
const obj2 = require("./sample");

obj.plus(10, 3);
obj.minus(10, 3);
obj2.gop(2, 4);
obj2.divide(2, 4);

// console.log(require);
/**
 * require('모듈명)
 * require ('모듈')
 * [1] module.js 해당 경로에 모듈이 있는지 검색
 * [2] 해당 파일 없다면 module이라는 디렉토리를 찾는다
 * [3] 디렉토리가 있으면 해당 디렉토리의 index.js를 찾아 가져옴
 */
