const UseChild = ({ name, parentAge }) => {
  console.log("UseChild component rendered");
  return (
    <>
      <h2>자식</h2>
      <p>이름:{name} </p>
      <p>부모 컴포넌트의 나이: {parentAge}</p>
    </>
  );
};

export default UseChild;
