// 모든 전역 변수를 담는 객체
import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../reducers/CounterReducer";
import TodoSlice from "../reducers/TodoSlice";
// configureStore
const store = configureStore({
  reducer: { counter: CounterReducer },
  todos: TodoSlice,
});
export default store;
