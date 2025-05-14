//number
let number: number;
let ingteger: number = 6;
let float: number = 1.234;

//string
let string: string;
let firstName: string = "홍길동";

//boolean
let boolean: boolean;
let check: boolean = false;

//array

//한가지
//여러재
//문자열
let fruits: string[] = ["사과", "바나나", "오렌지"];
let names: Array<string> = ["홍길동", "이순신", "강감찬"];
//숫자
let num: number[] = [1, 2, 3, 4, 5];
let num2: Array<number> = [10, 20, 30, 40, 50];

//여러개 들어가는 배열 union
let ar1: (string | number)[] = ["짱구", 1, 2];
let ar2: Array<string | number> = ["맹구", 5, 8];

//interface
interface Person {
  name: string;
  age: number;
  gender: string;
  isMarried: boolean;
}
const user = {
  name: "홍길동",
  age: 20,
  gender: "남자",
  isMarried: false,
};

//상속
interface animal {
  name: string;
}
interface dog extends animal {
  honey: boolean;
}
const dog1: dog = {
  name: "멍멍이",
  honey: true,
};
