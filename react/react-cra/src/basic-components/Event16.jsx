import { useState } from "react"

export default function Event16() {
    //상태변수
    const [text, setText] = useState("111");

    //메서드
    const handleChange = (e) => {
        setText(e.target.value);
    }
    const handleReset = () => {
        setText("");
    }
    //화면에 보이기
    return (
        <div>
            <input value={text} onChange={handleChange} />
            <button onClick={handleReset}>초기화</button>
            <p>입력한 내용:{text}</p>
        </div>
    )
}