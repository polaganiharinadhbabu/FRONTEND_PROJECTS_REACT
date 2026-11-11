
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const launchDate = new Date("2026-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({});
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  function handleSubscribe(e) {

    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email!");
      return;
    }

    setMessage("Thank you! You are subscribed.");
    setEmail("");
  }

  return (
    <div className="container">

      <div className="content">

        <h1>Coming Soon</h1>

        <p className="description">
          Something amazing is coming.
          Stay tuned for our launch!
        </p>

        <h2>Our Launch Countdown</h2>

        {timeLeft === null ? (
          <h2>We are live!</h2>
        ) : (
          <div className="countdown">

            <div className="time-box">
              <h2>{timeLeft.days ?? "--"}</h2>
              <p>Days</p>
            </div>

            <div className="time-box">
              <h2>{timeLeft.hours ?? "--"}</h2>
              <p>Hours</p>
            </div>

            <div className="time-box">
              <h2>{timeLeft.minutes ?? "--"}</h2>
              <p>Minutes</p>
            </div>

            <div className="time-box">
              <h2>{timeLeft.seconds ?? "--"}</h2>
              <p>Seconds</p>
            </div>

          </div>
        )}

        <form onSubmit={handleSubscribe}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">
            Notify Me
          </button>

        </form>

        <p className="message">{message}</p>

      </div>

    </div>
  );
}

export default App;
