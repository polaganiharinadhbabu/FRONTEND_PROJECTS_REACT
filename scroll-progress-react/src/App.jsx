
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app">

      {/* Scroll Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <header>
        <h1>Scroll Progress Indicator</h1>
        <p>Scroll down to see your reading progress.</p>

        <h2>{Math.round(scrollProgress)}%</h2>
      </header>

      <main className="content">

        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to the Scroll Progress Indicator project.
            This application shows how much of a webpage you
            have scrolled.
          </p>
        </section>

        <section>
          <h2>What is React?</h2>
          <p>
            React is a JavaScript library used to build user
            interfaces. It allows developers to create reusable
            components and manage application data using state.
          </p>
          <p>
            React uses JSX to describe the UI. Components can
            receive props and maintain their own state.
          </p>
        </section>

        <section>
          <h2>Why use useState?</h2>
          <p>
            useState is a React Hook used to store and update
            values inside a component.
          </p>
          <p>
            When state changes, React automatically updates
            the related UI.
          </p>
        </section>

        <section>
          <h2>Why use useEffect?</h2>
          <p>
            useEffect is used to handle side effects such as
            event listeners, API calls and subscriptions.
          </p>
          <p>
            In this project, useEffect listens for the scroll
            event and updates the progress percentage.
          </p>
        </section>

        <section>
          <h2>How does scrolling work?</h2>
          <p>
            window.scrollY gives the number of pixels the page
            has moved vertically.
          </p>
          <p>
            document.documentElement.scrollHeight gives the
            total height of the page.
          </p>
          <p>
            window.innerHeight gives the visible browser
            window height.
          </p>
        </section>

        <section>
          <h2>Conclusion</h2>
          <p>
            You have completed the Scroll Progress Indicator
            project using React.
          </p>
          <p>
            Scroll to the bottom and check whether the progress
            reaches 100 percent.
          </p>
        </section>

      </main>

      <footer>
        <p>React Scroll Progress Project</p>
      </footer>

    </div>
  );
}

export default App;
