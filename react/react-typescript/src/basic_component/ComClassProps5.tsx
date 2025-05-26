import { Component } from "react";

class ComClassProps5 extends Component<{ city: string; hour: number }> {
    render() {
        return (
            <>
                <h2>클래스 컴포넌트 - 자식요소에 속성 전달</h2>
                <p>부모로부터 데이 전달받기</p>
                <p>{this.props.city}은 아직 멀었어요 {this.props.hour}분 더 걸립니다</p>
            </>
        )
    }
}


// interface Props {
//   city: string;
//   hour: number;
// }

// class ComClassProps5 extends Component<Props> {
//   render() {
//     return (
//       <>
//         <h2>클래스 컴포넌트 - 자식요소에 속성 전달</h2>
//         <p>부모로부터 데이터 전달받기</p>
//         <p>{this.props.city}은 아직 멀었어요 {this.props.hour}분 더 걸립니다</p>
//       </>
//     );
//   }
// }

export default ComClassProps5;