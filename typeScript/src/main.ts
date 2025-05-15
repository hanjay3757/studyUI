//number
let number: number;
let integer: number = 6;
let float: number = 1.2345;

//string
let string: string;
let firstName: string = "홍길동";

//boolean
let boolean: boolean;
let check: boolean = false;

//배열
//한가지 타입
//문자
let fruits: string[] = ["사과", "포도"];
let names: Array<string> = ["홍길동", "김철수"];

//숫자
let num: number[] = [1, 2, 3, 4];
let num2: Array<number> = [10, 20, 30];

//여러가지 타입을 가지는 배열(유니언 타입)
let arr1: (string | number)[] = ["짱구", 1, 2];
let arr2: Array<string | number> = ["홍길동", 20, 40];

//interface
interface Person {
    name: string;
    age: number;
    gender: boolean
}
const user: Person = {
    name: "홍길동",
    age: 18,
    gender: true
}


// 확장
interface Animal {
    name: string
}

interface Bear extends Animal {
    honey: boolean
}

const bear1: Bear = {
    name: "벌",
    honey: true
}

