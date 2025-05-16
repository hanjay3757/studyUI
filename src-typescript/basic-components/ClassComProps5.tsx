import { Component } from "react";

class ClassComProps5 extends Component<{day:string,num:number}>{
    render(){
        return(
            <div>
              <h2>클래스 컴포넌트 -자식요소에 속성전달</h2>
              <p>내일은 {this.props.day}  {this.props.num}일 지나면 토요일</p>
            </div>
        )
    }
}
export default ClassComProps5;