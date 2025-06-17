function FunComProps4({uname,uage}:{uname:string,uage:number}){
    return(
        <div>
            <h2>함수 컴포넌트 -자식요소에 데이터 전달</h2>
            <p>부모로 부터 받은 데이터 출력하기</p>
            <p>안녕 {uname} 만나서 반가워 너는 {uage}살이지?</p>
        </div>
    )
}
export default FunComProps4;