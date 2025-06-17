import React from "react";

const LINETHROUGH = "lineThrough";

export default function ToDoItem({ todo, onnDelete, onnToggle }) {
  return (
    <li className={todo.cheack === LINETHROUGH ? LINETHROUGH : ""}>
      <span>{todo.text}</span>
      <div>
        <button onClick={() => onnToggle(todo.id)}>✔</button>
        <button onClick={() => onnDelete(todo.id)}>✖</button>
      </div>
    </li>
  );
}
