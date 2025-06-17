import { useCallback, useState, memo } from "react";
const Child = memo(({ onnClick }) => {
  console.log("자식이 렌더링되었습니다");
  return <button onClick={onnClick}>자식버튼</button>;
});

export default function UseCallback39() {
  const childClick = useCallback(() => {
    console.log("자식 버튼이 클릭되었습니다");
  }, []);
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>useCallback</h2>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <Child onnClick={childClick} />
    </>
  );
}
