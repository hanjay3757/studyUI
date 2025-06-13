import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoApp from "./components/TodoApp"; // TodoApp.jsx 컴포넌트 사용

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
