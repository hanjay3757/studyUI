import { TodoProvider } from "../context/TodoContext";
import TodoCount from "./TodoCount";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {
    return (
        <TodoProvider>
            <div className="todoApp">
                <h1>Todo List</h1>
                <TodoForm />
                <TodoList />
                <TodoCount />
            </div>
        </TodoProvider>
    )
}
export default TodoApp;