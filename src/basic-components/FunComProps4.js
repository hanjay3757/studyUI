// function FunComProps4({name,userAge}){
//     return(
//         <div>
//             <h2>부모로 부터 속성값 받기 -props</h2>
//             <p>부모로 받은 값 출력하기</p>
//             <p>부모로 부터 이름, 나이를 전달 받아서 출력하기</p>
//             <p>안녕 {name} 너는 {userAge}몇살이지?</p>
//         </div>
//     )
// }
function FunComProps4(myprops) {
    return (
        <div>
            <h2>부모로 부터 속성값 받기 -props</h2>
            <p>부모로 받은 값 출력하기</p>
            <p>부모로 부터 이름, 나이를 전달 받아서 출력하기</p>
            <p>안녕 {myprops.name} 너는 {myprops.userAge}</p>
        </div>
    )
}
export default FunComProps4;