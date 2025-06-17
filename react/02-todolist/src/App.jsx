import React from "react";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./components/TodoContext";
import "./App.css";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h1>Todo List</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
