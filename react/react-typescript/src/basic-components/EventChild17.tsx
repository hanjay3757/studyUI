type EventSend = {
    onSend: () => void;
    // children: string
    // 자식이 가진 jsx포함한 다양한 형태를 사용
    children: React.ReactNode
}
function Button({ onSend, children }: EventSend) {
    return (
        <div>
            <button onClick={onSend}>{children}</button>
        </div>
    )
}
export default function EventChild17() {
    return (
        <div className="bubble">
            <Button onSend={() => alert("play")}>play</Button>
            <Button onSend={() => alert("stop")}>stop</Button>
        </div>
    )
}