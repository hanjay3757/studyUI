function Button({ onnClick, children }) {
    return (
        <div>
            <button onClick={e => {
                // 전파중지
                e.stopPropagation();
                onnClick();
            }}>{children}</button>
        </div>
    )
}
export default function EventBubble18() {
    return (
        <div className="bubble" onClick={() => alert("나부모")}>
            <h2>이벤트 버블링</h2>
            <Button onnClick={() => alert("play")}>play</Button>
            <Button onnClick={() => alert("stop")}>sotp</Button>
        </div>
    )
}