import logo from './logo.svg';
import './App.css';
import JotaiIndex from "./jotai/JotaiIndex";
import StompIndex from "./stompjs/StompIndex";

function App() {
  return (
      <JotaiIndex></JotaiIndex>

      // <StompIndex></StompIndex>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
