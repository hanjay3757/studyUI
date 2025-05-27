import React, { useState } from "react";

export default function ToDoForm({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}
