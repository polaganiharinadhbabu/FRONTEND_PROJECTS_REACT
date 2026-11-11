import React from "react";

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <h2>REACT_LOGINFORM</h2>

      <button onClick={onLoginClick}>
        Login
      </button>
    </header>
  );
}

export default Header;