import { useState, useMemo } from "react";
import UseChild from "./37-UseChild";
const UseParent = () => {
  const [parentAge, setParent] = useState(0);
  const [childAge, setChild] = useState(0);

  const handleParentAge = () => {
    setParent(parentAge + 1);
  };
  const handleChildAge = () => {
    setChild(childAge + 1);
  };

  const name = useMemo(() => {
    return {
      lastName: " 철수",
      firstName: " 김",
    };
  }, []);

  return (
    <>
      <h2>부모</h2>
      <p>자식 컴포넌트에서 부모 컴포넌트의 상태를 변경하는 예시:{parentAge}</p>
      <button onClick={handleParentAge}>부모나이 증가</button>
      <button onClick={handleChildAge}>자식나이 증가</button>
      {/* <UseChild name="자식" parentAge={childAge} /> */}
      <UseChild name={name} />
    </>
  );
};
export default UseParent;
