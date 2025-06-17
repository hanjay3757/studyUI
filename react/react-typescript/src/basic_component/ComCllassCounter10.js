import React, { Component } from 'react';

class ComCllassCounter10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }


  //함수 실행시 number값이 1 증가
  handleIncrease = () => {
    const { number } = this.state;
    //this.setState는 state의 값을 변경할 때 사용 하는 함수

    this.setState({
      number: number + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Class Counter</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
      </div>

    );
  }
}

export default ComCllassCounter10;