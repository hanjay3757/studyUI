import React from "react";
import ToDoItem from "./ToDoItem";


export default function ToDoList({ toDos, onDelete, onToggle }) {
  return (
    <ul className="todo-list">
      {toDos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onnDelete={onDelete}
          onnToggle={onToggle}
        />
      ))}
    </ul>
  );
}
