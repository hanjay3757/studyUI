// 태그 생성하기
let hTitle = document.createElement('h1');

// 태그 속에 내용물 넣기 .innerHTML
hTitle.innerHTML = '제목생성'

// 생성된 태그 body에 붙이기
// 자식 요소 붙이기 appendChild, append
document.body.append(hTitle);