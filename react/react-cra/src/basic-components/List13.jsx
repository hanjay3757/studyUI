const peoples = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List13(){
    //상태변수
    const listItems = peoples.map(item => <li>{item}</li>)
    //화면에 붙일 내용
    return <ul>{listItems}</ul>
}