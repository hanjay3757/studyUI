import { createContext, useEffect, useState } from "react";
export const TodoContext = createContext();
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(TODOS_KEY);
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);
  // const TODOS_KEY = "todos";

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const removeAll = () => {
    setTodos([]);
    localStorage.removeItem(TODOS_KEY);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, toggleTodo, removeAll }}
    >
      {children}
    </TodoContext.Provider>
  );
};
