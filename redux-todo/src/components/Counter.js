import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../reducers/CounterReducer";
export default function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>counter</h2>
      <p>{count}</p>
      <p>
        <button onClick={() => dispatch(decrement())}></button>
        <button onClick={() => dispatch(increment())}></button>
      </p>
    </div>
  );
}
