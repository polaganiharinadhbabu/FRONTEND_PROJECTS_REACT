import React, { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import "./App.css";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  function handleLoginClick() {
    setShowLogin(!showLogin);
  }

  return (
    <div>

      <Header onLoginClick={handleLoginClick} />

      {showLogin && <Login />}

    </div>
  );
}

export default App;