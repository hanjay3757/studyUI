//document 에 데이터 필터 속성을 가진 요솔르 filter를 추가
//각각의 버튼 filterbtns에 저장
//forEach() 메서드를 사용하여 각 요소에 대해 filter 속성을 추가
//button 요소에 대해 클릭 이벤트를 추가하여 filter 속성을 변경
//filterList에 저장

// const filters = document.querySelectorAll("[data-filter-id]");
// console.log(filters);
//filter 에 저장된 버튼과 li를 각각 저장하기
// filters.forEach((filter) => {
//     const filterBtns = [
//         [...FileSystemWritableFileStream.querySelectorAll(
//             "[data-filter")].filter(el=>el.nodeName==="BUTTON");
//   console.log(filterBtns);

//   const filterList = [
//     ...document.querySelectorAll(
//       `[data-filter-id="${filter.dataset.filterId}"] li`
//     ),
//   console.log(filterList);
// });
const filterBtns = document.querySelectorAll(".menu-wrap button");
console.log(filterBtns);
const filterList = document.querySelectorAll(".menu-wrap li");
console.log(filterList);
filterBtns.forEach((btn) => {
  btn.addEventListender("click", (e) => {
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
      filterList.forEach((list) => {
        if (filtertype === "all") {
          list.computedStyleMap.display = "block";
          return;
        }
        list.computedStyleMap.display =
          list.getAttribute("data-filter") === btn.dataset.filter
            ? "block"
            : "none";
      });
    });
  });
});
