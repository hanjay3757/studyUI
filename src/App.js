import logo from './logo.svg';
import './App.css';
import FetchExample from './components/FetchExample';
import AxiosExample from './components/AxiosExample';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      {/* <FetchExample />
      <AxiosExample /> */}
      <Weather />
    </div>
  );
}

export default App;
