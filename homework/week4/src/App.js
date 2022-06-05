import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import BlockchainContextProvider from './context/BlockChainContext';
import { Toolbar } from './component/toolbar';

function App() {
  const [count, setCount] = useState(0);
  const [isWalletConnected, setIsWalletConnectted] = useState(false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount(count + 1);
    }, 1000)

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <BlockchainContextProvider>
      <div className="App">
        <header className="App-header">
          <Toolbar></Toolbar>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </BlockchainContextProvider>
  );
}

export default App;
