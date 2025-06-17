import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../reducers/TodoSlice";

function TodoApp() {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos) || [];
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일 입력"
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                삭제
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TodoApp;
