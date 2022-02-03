import "./App.css";
import Bot from "./components/Bot";
import Header from "./components/Header/header";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "NFT-BOT";
  }, []);

  return (
    <>
      <Header />
      <div className="App">
        <Bot />
      </div>
    </>
  );
}

export default App;
