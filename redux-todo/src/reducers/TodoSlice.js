import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: nextId++, text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {},
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});
export const { addTodo, toggleTodo, removeTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
