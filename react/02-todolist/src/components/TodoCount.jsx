import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoCount = () => {
    const { todos } = useContext(TodoContext);
    const total = todos.length;
    const completed = todos.filter((c) =>c.check).length;
    return (
        <div>
            <p>완료 : {completed} / 전체 : {total}</p>
        </div>
    )
}
export default TodoCount;