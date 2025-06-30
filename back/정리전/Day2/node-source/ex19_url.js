const { parse } = require("path");
const url = require("url");
const str = `https://shopping.naver.com/festa/onsale/play/683509b09d607233695cc883`;
const str2 = `https://shopping.naver.com/festa/onsale/living/683818c4af7f042fff6bb7bc`;
//1. 엤날꺼 url parse url 주소 : url 주소를 분해해서 내가 원하는 정보를 추출할수 있따
// 2.url.format (객체) : 분해된 url 객체를 다시 원상태로 조립한 문자열 반환
// 3. whatwg url 표준을 따르는 새로운 url api를  사용
// const parseUrl = url.parse(str);
const parseUrl = new URL(str2);
console.log(parseUrl);
// console.log(parseUrl.query);
//수정
parseUrl.searchParams.set("id", "300");
console.log(parseUrl.href);
console.log(parseUrl.searchParams.get("query"));
console.log(parseUrl.searchParams.get("id"));
console.log(parseUrl.hash);
//추가
parseUrl.searchParams.append("sort", "price");
console.log(parseUrl.href);
// console.log(parseUrl.pathname);
//삭제
parseUrl.searchParams.delete("sort", "price");

console.log("url.format():", url.format(parseUrl));
