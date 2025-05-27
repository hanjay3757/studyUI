import { createContext, useEffect, useState } from "react";
//localStorage에 사용할 키를 선언
const TODOS_KEY = "toDos";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    //앱을 처음 렌더링 될때 localStorage에 저장된 toDos를 가져와서
    //todos에 넣기
    useEffect(() => {
        const saved = localStorage.getItem(TODOS_KEY);
        if (saved) {
            setTodos(JSON.parse(saved));
        }
    }, [])

    //todos의 값이 변경되면 localStorage에 저장
    useEffect(() => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }, [todos])

    //새로운 할일 추가
    const addTodo = (text) => {
        // 기존의 데이터 뒤에 새로입력한 데이터를 추가로 넣기
        const newTodo = {
            id: Date.now(),
            text,
            check: false
        }
        setTodos((prev) => [...prev, newTodo])
    }

    //할일 삭제
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    //할일 완료되면 줄
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, check: !todo.check } : todo
            )
        )
    }

    //전체 할일을 제거할
    const removeAll = () => {
        setTodos([]);
        localStorage.removeItem(TODOS_KEY);
    }

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, deleteTodo, toggleTodo, removeAll }}>
            {children}
        </TodoContext.Provider>
    )
}