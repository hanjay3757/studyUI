import React, { createContext, useState } from "react";

// Context 생성
export const TodoContext = createContext(null);

// Provider 컴포넌트
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // 할 일 추가
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, check: "" }]);
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 할 일 토글 (완료/미완료)
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              check: todo.check === "lineThrough" ? "" : "lineThrough",
            }
          : todo
      )
    );
  };

  // Context에 제공할 값
  const value = {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
