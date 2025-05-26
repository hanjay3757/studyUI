function FunComProps6(props){
    return(
        <div>
            <h2>부모로 부터 객체값 전달받기</h2>
            <p>{props.name}</p>
            <p><img src={props.imgUrl} width={props.imgSize}/></p>
        </div>
    )
}
export default FunComProps6;