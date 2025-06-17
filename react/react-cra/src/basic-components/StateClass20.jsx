// 버튼을 클릭하면 숫자 1씩 증가

import { Component } from "react";

class StateClass20 extends Component {
    //상태변수
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    //메서드
    handlePlus = () => {
        const { num } = this.state;
        this.setState({
            num: num + 1
        })
    }
    //화면에 보여질 영역
    render() {
        return (
            <div>
                <h2>class counter</h2>
                <div>값 : {this.state.num}</div>
                <button onClick={this.handlePlus}>+</button>
            </div>
        )
    }
}
export default StateClass20;