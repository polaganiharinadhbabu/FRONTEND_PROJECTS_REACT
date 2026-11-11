
import { useState, useEffect } from "react";
import "./App.css";

function generateColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
}

function App() {
  const [colors, setColors] = useState(
    Array.from({ length: 5 }, () => ({
      hex: generateColor(),
      locked: false,
    }))
  );

  const [copiedColor, setCopiedColor] = useState("");

  const generatePalette = () => {
    setColors((previousColors) =>
      previousColors.map((color) =>
        color.locked
          ? color
          : { hex: generateColor(), locked: false }
      )
    );
  };

  const toggleLock = (index) => {
    setColors((previousColors) =>
      previousColors.map((color, i) =>
        i === index
          ? { ...color, locked: !color.locked }
          : color
      )
    );
  };

  const copyColor = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(hex);

      setTimeout(() => {
        setCopiedColor("");
      }, 1500);
    } catch {
      alert("Unable to copy color. Please copy manually: " + hex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && event.target.tagName !== "BUTTON") {
        event.preventDefault();
        generatePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Color Palette Generator</h1>
        <p>Generate beautiful colors for your next project.</p>
      </header>

      <main>
        <div className="palette">
          {colors.map((color, index) => (
            <div className="color-card" key={index}>
              <div
                className="color-box"
                style={{ backgroundColor: color.hex }}
              >
                <button
                  className="lock-btn"
                  onClick={() => toggleLock(index)}
                  title="Lock or unlock color"
                >
                  {color.locked ? "🔒" : "🔓"}
                </button>
              </div>

              <div className="color-info">
                <h3>{color.hex}</h3>

                <button
                  className="copy-btn"
                  onClick={() => copyColor(color.hex)}
                >
                  {copiedColor === color.hex ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="generate-btn" onClick={generatePalette}>
          Generate Palette
        </button>

        <p className="hint">
          Press the SPACEBAR to generate new colors
        </p>
      </main>
    </div>
  );
}

export default App;
