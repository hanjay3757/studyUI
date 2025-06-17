function ComCondition11({ isTrue, colorPink, colorSky }) {
    return (
        <div className="background">
            <h2 className={isTrue ? colorSky : colorPink}>조건부 렌더링</h2>
            <p>참이면 배경을 하늘색, 거짓이면 배경을 핑크로</p>
        </div>
    )
}
export default ComCondition11;