function Item({title,imgUrl,imgSize=70}){
    return(
        <div className="item-list">
            <h2>{title}</h2>
            <p><img src={imgUrl} width={imgSize} height={imgSize}/></p>
        </div>
    )
}
export default function Gallery(){
    return(
        <div>
            <h2>갤러리</h2>
            <Item title="홍길동" imgUrl="./images/1.jpg" />
            <Item title="짱구" imgUrl="./images/2.jpg" />
            <Item title="흰둥이" imgUrl="./images/3.jpg" />
        </div>
    )
}
