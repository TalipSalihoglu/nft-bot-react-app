import './App.css';
import Bot from './components/Bot'
import React,{useEffect,useState} from 'react';

function App() {
  
  useEffect(() => {
    document.title = "NFT-BOT";
  }, []);

  return (
    <div className="App">
      <Bot />
    </div>
  );
}

export default App;
