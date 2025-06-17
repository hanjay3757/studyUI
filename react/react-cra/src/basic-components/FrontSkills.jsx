const frontSkills = [
    { id: 1, title: "html", content: "홈페이지의 구조를 나타냅니다" },
    { id: 2, title: "css", content: "홈페이지를 디자인 할때 사용합니다" },
    { id: 3, title: "javascript", content: "동적인 움직임을 만들수 있습니다" },
    { id: 4, title: "react", content: "컴포넌트와 가상돔을 사용합니다" }
]

export default function  FrontSkills(){
    const cardItems = frontSkills.map(front =>
        <li>
            <h2>{front.title}</h2>
            <p>{front.content}</p>
        </li>
    )
    return(
        <div>
            <ul className="card-list">{cardItems}</ul>
        </div>
    )
}