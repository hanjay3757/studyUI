import React, { useState, useEffect } from "react";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import "./scss/TodoList.css";

const TODOS_KEY = "toDos";
const LINETHROUGH = "lineThrough";

export default function ToDoApp() {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(TODOS_KEY);
    if (saved) {
      setToDos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }, [toDos]);

  const addToDo = (text) => {
    const newToDo = {
      id: Date.now(),
      text,
      cheack: false,
    };
    setToDos((prev) => [...prev, newToDo]);
  };

  const deleteToDo = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  const toggleCheck = (id) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              cheack: todo.cheack === LINETHROUGH ? false : LINETHROUGH,
            }
          : todo
      )
    );
  };

  const removeAll = () => {
    localStorage.removeItem(TODOS_KEY);
    setToDos([]);
  };

  return (
    <div className="todo-app">
      <h1>ToDo List</h1>
      <ToDoForm onAdd={addToDo} />
      <button onClick={removeAll}>전체 삭제</button>
      <ToDoList toDos={toDos} onDelete={deleteToDo} onToggle={toggleCheck} />
    </div>
  );
}
