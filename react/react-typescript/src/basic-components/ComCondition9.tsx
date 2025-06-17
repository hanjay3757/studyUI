import { useState } from "react";

function ComCondition9() {
    //상태변수 저장
    //[변수,변수변경함수]=useState(초기값);
    const [isToggle, setToggle] = useState<boolean>(true);

    //메서드
    const handleToggle = () => {
        setToggle(prev => !prev);
    }
    //화면에 보여질 부분
    // 버튼을 클릭하면 버튼 글자가 ON / OFF
    return (
        <div>
            <button onClick={handleToggle}>
                {isToggle ? "ON" : "Off"}
            </button>
        </div>
    )
}
export default ComCondition9;