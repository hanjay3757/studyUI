// 이름 그림을 넣어주는 컴포넌트
function Profile({name,img}:{name:string,img:string}){
    return(
        <div>
            <h3>{name}</h3>
            <p><img src={img} alt="" /></p>
        </div>
    )
}
// 위에서 만들 컴포넌트를 여러개 넣기
function ComCombine7(){
    return(
        <div>
            <h2>컴포넌트 합성</h2>
            <p>여러개의 컴포넌트를 삽입하는것을 뜻한다</p>
            <Profile name="홍길동" img="./images/7.png" />
            <Profile name="김철수" img="./images/26.png" />
            <Profile name="이영희" img="./images/33.png" />
        </div>
    )
}
export default ComCombine7;