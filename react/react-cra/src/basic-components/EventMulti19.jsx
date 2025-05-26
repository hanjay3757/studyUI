import { useState } from "react";

function EventMulti19() {
    //상태변수
    const [inputs, setInput] = useState({
        name: "1",
        nickname: "2"
    })
    //비구조화 할당
    const { name, nickname } = inputs;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...inputs,
            [name]: value//name키를 가진 value로 설정하기
        })
    }
    const handleReset = () => {
        setInput({
            name: "",
            nickname: ""
        })
    }
    return (
        <div>
            <input name="name"
                placeholder="이름"
                type="text"
                value={name}
                onChange={handleChange} />

            <input name="nickname" placeholder="닉네임" value={nickname}
                onChange={handleChange} />
            <button onClick={handleReset}>초기화</button>
            <p>이름 :{name}{nickname} </p>
        </div>
    )
}
export default EventMulti19;