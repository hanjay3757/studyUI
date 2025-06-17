import { useState } from "react";

export default function StateDark22() {
    const [isDark, setDark] = useState(true);
    const toggleDark = () => {
        setDark(prev => !prev);
    }
    return (
        <div className={isDark ? "dark" : "light"}>
            <button onClick={toggleDark}>{isDark ? "다크모드" : "라이트모드"}</button>
            <p>버튼을 클릭하면 dark와 light 토글된다</p>
        </div>
    )
}