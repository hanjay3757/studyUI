import { useState } from "react";

function InputChild() {
  return <input value></input>;
}
function InputChild({ text, onchildChange }) {
  return (
    <input value={text} onChange={(e) => onchildChange(e.target.value)}></input>
  );
}

export default function stateParent1() {
  const [text, setText] = useState("");
  return (
    <div>
      <h1>State Parent</h1>
      <h2>{text}</h2>
      <InputChild />
      <button onClick={() => setText("Hello")}>Change Text</button>
      <button onClick={() => setText("")}>Clear Text</button>
    </div>
  );
}
