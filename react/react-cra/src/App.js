import logo from './logo.svg';
import './App.css';
import FucCom1 from './basic-components/FucCom1';
import FucComImg2 from './basic-components/FucComImg2';
import ClassCom3 from './basic-components/ClassCom3';
import FunComProps4 from './basic-components/FunComProps4';
import ClassFunProps5 from './basic-components/ClassFunProps5';
import FunComProps6 from './basic-components/FunComProps6';
import ComCombine7 from './basic-components/ComCombine7';
import Gallery from './basic-components/Gallery';
import ComCondition9 from './basic-components/ComCodition9';
import ComConditionClass10 from './basic-components/ComConditionClass10';
import ComCondition11 from './basic-components/ComCodition11';
import PackingList12 from './basic-components/PackingList12';
import List13 from './basic-components/List13';
import FrontSkills from './basic-components/FrontSkills';
import List15 from './basic-components/List15';
import Event16 from './basic-components/Event16';
import EventChild17 from './basic-components/EventChild17';
import EventBubble18 from './basic-components/EventBubble18';
import EventMulti19 from './basic-components/EventMulti19';
import StateClass20 from './basic-components/StateClass20';
import StateFunCounter21 from './basic-components/StateFunCounter21';
import StateDark22 from './basic-components/StateDark22';

const user = {
  name: "김철수",
  age: 30,
  imageUrl: "./images/411.png",
  imageSize: 90
}

function App() {
  const age = 20;

  return (
    <div className="App">
      <h1>컴포넌트 종류</h1>
      {/* <FucCom1 />
      <FucComImg2 />
      <ClassCom3 /> */}

      <h1>props전달</h1>
      {/* <FunComProps4 name="홍길동" userAge={age} />
      <ClassFunProps5 day="목요일" hours={100} /> */}

      {/* <FunComProps6
        name={user.name}
        imgUrl={user.imageUrl}
        imgSize={user.imageSize} /> */}

      <h1>컴포넌트 합성</h1>
      {/* <ComCombine7 /> */}
      {/* <Gallery /> */}

      <h1>조건문 렌더링</h1>
      {/* 함수 */}
      {/* <ComCondition9 /> */}
      {/* 클래스 */}
      {/* <ComConditionClass10 /> */}
      {/* <ComCondition11 isTrue={false} colorPink="pink" colorSky="skyblue"/>
      <PackingList12 /> */}

      <h1>리스트 렌더링</h1>
      {/* <List13 /> */}
      {/* <FrontSkills /> */}
      {/* <List15 /> */}

      <h1>이벤트</h1>
      {/* <Event16 />
      <EventChild17 />
      <EventBubble18 /> */}
      {/* <EventMulti19 /> */}
      
      <h1>State</h1>
      {/* <StateClass20 /> */}
      {/* <StateFunCounter21 /> */}
      <StateDark22 />
    </div>
  );
}

export default App;
