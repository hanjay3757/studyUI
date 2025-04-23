const btnGroup = document.getElementById("btn-group");
const btns = btnGroup.querySelectorAll(".btn");
const highlight = btnGroup.querySelector(".highlight");

btns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    highlight.style.left = `${index * 70}px`;
  });
});
