import logo from './logo.svg';
import './App.css';
import FetchExample from './components/FetchExample';
import AxiosExample from './components/AxiosExample';
import Weather from './components/Weather';
import Movie from './components/Movie';
import FakeStore from './components/FakeStore';
import CounterState from './components/CounterState';
import CounterZus from './components/CounterZus';
import CounterRcoil from './components/CounterRcoil';

function App() {
  return (
    <div className="App">
      {/* <FetchExample />
      <AxiosExample /> */}
      {/* <Weather /> */}
      {/* <Movie /> */}
      {/* <FakeStore /> */}
      <h1>counter</h1>
      <h2>useState, useContext</h2>
      {/* <CounterState /> */}
      <hr />

      <h2>zustand</h2>
      <CounterZus />

      <hr />

      <h2>recoil</h2>
      <CounterRcoil />
      <hr />
    </div>
  );
}

export default App;
