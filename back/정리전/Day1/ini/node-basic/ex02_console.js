/**sss**/

console.log("정수 출력: %d", 5555);
console.log("실수: %d", 5.555);
console.log("실수: %s", (3.141592).toFixed(2)); //소수점 2자리까지
// %s 문자열
const obj = {
  num: 1,
  name: "홍길동",
  age: 22,
};
console.log("json: %j", obj);
console.log("%d %%할인", 30);

console.table([obj, { num: 2, name: "철수", age: 21 }]);

console.time("sum"); //label 문자열
let result = 0;
for (let i = 0; i < 10000; i++) {
  result += i;
}
console.timeEnd("sum");
console.log("1~100000까지의 누적합 : %d ", result);

console.error("에러 (x)");
console.warn("경고(!)");
//디버깅
console.debug("디버깅정보", result);
console.info("간단한 정보 출력");

//검증할때 조건이 false여야 출력
// console.assert(1 == 2);
console.assert(obj.name == "홍길동");
