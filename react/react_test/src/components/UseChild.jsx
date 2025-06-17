import { memo } from "react";
const UseChild = ({ name}) => {
    console.log("자식이 렌더링되었습니다");
    return (
        <>
            <h2>자식</h2>
            <p>이름 :{name.firstName} </p>
            <p>나이 :{name.lastName}</p>
        </>
    )
}
export default memo(UseChild);