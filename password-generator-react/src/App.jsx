
import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);

  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const [message, setMessage] = useState("");

  // Update checkbox options
  const handleOptionChange = (event) => {
    const { name, checked } = event.target;

    setOptions((previousOptions) => ({
      ...previousOptions,
      [name]: checked,
    }));
  };

  // Generate a random password
  const generatePassword = () => {
    let characters = "";

    if (options.uppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (options.lowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (options.numbers) {
      characters += "0123456789";
    }

    if (options.symbols) {
      characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if (!characters) {
      setMessage("Please select at least one option.");
      setPassword("");
      return;
    }

    // Use browser cryptographic randomness
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      newPassword += characters[
        randomValues[i] % characters.length
      ];
    }

    setPassword(newPassword);
    setMessage("");
  };

  // Copy password to clipboard
  const copyPassword = async () => {
    if (!password) {
      setMessage("Generate a password first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setMessage("Password copied successfully!");
    } catch {
      setMessage("Unable to copy. Please copy manually.");
    }
  };

  // Calculate basic password strength
  const selectedOptions = Object.values(options).filter(Boolean).length;

  const getStrength = () => {
    if (!password) return "Not Generated";
    if (length >= 14 && selectedOptions >= 3) return "Strong";
    if (length >= 10 && selectedOptions >= 2) return "Medium";
    return "Weak";
  };

  return (
    <div className="container">
      <div className="password-card">
        <h1>Password Generator</h1>

        <p className="subtitle">
          Create a strong and secure password
        </p>

        <div className="password-output">
          <input
            type="text"
            value={password}
            placeholder="Your password will appear here"
            readOnly
          />

          <button
            type="button"
            className="copy-btn"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="length-section">
          <div className="section-heading">
            <label htmlFor="length">Password Length</label>
            <span>{length}</span>
          </div>

          <input
            type="range"
            id="length"
            min="4"
            max="32"
            value={length}
            onChange={(event) => {
              setLength(Number(event.target.value));
            }}
          />
        </div>

        <div className="options-section">
          <h3>Include Characters</h3>

          <label className="option">
            <input
              type="checkbox"
              name="uppercase"
              checked={options.uppercase}
              onChange={handleOptionChange}
            />
            Uppercase Letters (A-Z)
          </label>

          <label className="option">
            <input
              type="checkbox"
              name="lowercase"
              checked={options.lowercase}
              onChange={handleOptionChange}
            />
            Lowercase Letters (a-z)
          </label>

          <label className="option">
            <input
              type="checkbox"
              name="numbers"
              checked={options.numbers}
              onChange={handleOptionChange}
            />
            Numbers (0-9)
          </label>

          <label className="option">
            <input
              type="checkbox"
              name="symbols"
              checked={options.symbols}
              onChange={handleOptionChange}
            />
            Symbols (!@#$)
          </label>
        </div>

        <div className="strength">
          <span>Password Strength</span>
          <strong className={getStrength().toLowerCase()}>
            {getStrength()}
          </strong>
        </div>

        <button
          type="button"
          className="generate-btn"
          onClick={generatePassword}
        >
          Generate Password
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
