import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
    const { toggleTodo, deleteTodo } = useContext(TodoContext);

    const todoCheck = todo.check === true ? "line" : "";
    
    return (
        <li>
            <span className={todoCheck}
                onClick={() => toggleTodo(todo.id)}
            >
                {todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </li>
    )
}
export default TodoItem;