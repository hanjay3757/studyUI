import { Component } from "react";

class ComConditionClass10 extends Component {
    //변수선언
    constructor(props) {
        super(props);
        this.state = { isToggle: true }
    }
    //메서드
    handleTolggle() {
        this.setState(state => ({
            isToggle: !state.isToggle
        }))
    }
    //화면에 보여질 부분
    render() {
        return (
            <div>
                <button onClick={this.handleTolggle}>
                    {this.state.isToggle ? "ON" : "OFF"}
                </button>
            </div>
        )
    }

}
export default ComConditionClass10;