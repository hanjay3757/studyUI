import { useState } from "react";

function Event16() {
    const [text, setText] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleReset = () => {
        setText("");
    }
    return (
        <div>
            <input value={text} onChange={handleChange} />
            <button onClick={handleReset}>초기화</button>
            <p>값 : {text}</p>
        </div>
    )
}

export default Event16;