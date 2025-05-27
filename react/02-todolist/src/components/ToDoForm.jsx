import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
    const { addTodo } = useContext(TodoContext);
    const [text, setText] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        if(text.trim()){
            addTodo(text);
            setText("")
        }
    }
    return (
        <form className="todoForm" onSubmit={handelSubmit}>
            <input type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="오늘의 할일을 입력하세요" />
            <button type="submit">추가</button>
        </form>
    )
}
export default TodoForm;