var EnglishScore = prompt("점수를 입력하세요", "정수로");
var MathScore = prompt("점수를 입력하세요", "정수로");
var HistoryScore = prompt("점수를 입력하세요", "정수로");
var KoreanScore = prompt("점수를 입력하세요", "정수로");

var ex =
  (Number(EnglishScore) +
    Number(MathScore) +
    Number(HistoryScore) +
    Number(KoreanScore)) /
  4;

alert("평균점수는:" + ex + "입니다");
