// 태그 생성
let hTitle = document.createElement("h1");
//  태그 속에 내용물 넣고 .innerHtTML 바로 다이렉트로 넣기
hTitle.innerHTML = "제목생성"
//  생성된 대트 body에 붙이기 append = jqury에서도 쓰임
document.body.append(hTitle);
// 여기다가 event 써도 된 document.addEventListener 29번 참조조