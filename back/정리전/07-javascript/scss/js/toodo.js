const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");
const removeAll = document.querySelector(".remove-all button");

const TODOS_KEY = "todos";

// ✅ 배열로 초기화
let toDos = [];
let id = 0;
// localStorage.clear();
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
  const delLi = e.target.parentElement.parentElement;
  console.log(delLi);
  delLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(delLi.id));
  saveToDos();
}
function lineCheck(e) {
  const li = e.target.closest("li");
  li.classList.toggle("lineThrough");
}
toDos = toDos.map((todo) => {
  if (todo.id === id) {
    return { ...todo, check: !todo.check };
  }
  return todo;
});

function removeAllList(e) {
  localStorage.clear();
  todoList.innerHTML = "";
}

function showToDo(newToDo) {
  const toDoLi = document.createElement("li");
  toDoLi.id = newToDo.id;
  const toDoSpan = document.createElement("span");
  toDoSpan.innerHTML = newToDo.text;

  const toDoIcon = document.createElement("div");
  const toDoCheck = document.createElement("button");
  const toDoRemove = document.createElement("button");
  toDoCheck.textContent = "✔️";
  toDoRemove.textContent = "❌";

  toDoIcon.appendChild(toDoCheck);
  toDoIcon.appendChild(toDoRemove);
  toDoLi.appendChild(toDoSpan);
  toDoLi.appendChild(toDoIcon);
  todoList.appendChild(toDoLi);
  toDoRemove.addEventListener("click", deleteToDo);
  toDoCheck.addEventListener("click", lineCheck);
  removeAll.addEventListener("click", removeAllList);
}

// ✅ submit 이벤트
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newToDo = todoInput.value;
  todoInput.value = "";

  const newToDoObj = {
    text: newToDo,
    id: ++id,
    check: false,
  };

  toDos.push(newToDoObj); // ✅ 배열에 push
  showToDo(newToDoObj);
  saveToDos();
});
const savedToDos = localStorage.getItem(TODOS_KEY);
if (saveToDos !== null) {
  const parsedTodos = JSON.parse(savedToDos);
  toDos = parsedTodos;
}
