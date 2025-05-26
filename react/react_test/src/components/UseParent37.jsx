import { useState,useMemo } from "react"
import UseChild from "./UseChild";

const UseParent37 = () => {
    const [parentAge, setParent] = useState(0);
    const [childAge, setChild] = useState(0);

    const handleParent = () => {
        setParent(parentAge + 1)
    }
    const handleChild = () => {
        setChild(childAge + 1)
    }
    // const name = {
    //     lastName: "철수",
    //     firstName: "김"
    // }

    const name = useMemo(() => {
        return {
            lastName: "철수",
            firstName: "김"
        }
    }, [])

    console.log("부모가 렌더링 되었습니다")
    return (
        <>
            <h2>부모</h2>
            <p>age:{parentAge}</p>
            <button onClick={handleParent}>부모나이 증가</button>
            <button onClick={handleChild}>자식 나이 증가</button>
            {/* <UseChild name="홍길동" age={childAge} /> */}
            <UseChild name={name} />
        </>
    )
}
export default UseParent37;