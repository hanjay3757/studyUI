import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

// 오타 수정: CouterReducer -> CounterReducer
const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "counter/increment":
      return { ...state, value: state.value + 1 };
    case "counter/decrement":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

export default CounterReducer;
