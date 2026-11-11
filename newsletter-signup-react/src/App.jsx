
import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    // Check whether email is empty
    if (!trimmedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Subscription success
    setIsSubscribed(true);
    setMessage("Thank you! You have successfully subscribed.");
    setEmail("");
  };

  return (
    <div className="page">
      <div className="newsletter-card">
        <div className="icon">✉</div>

        {!isSubscribed ? (
          <>
            <h1>Subscribe to our Newsletter</h1>

            <p className="description">
              Get the latest updates, news and special offers
              delivered directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
              />

              <button type="submit">Subscribe</button>
            </form>

            {message && <p className="message error">{message}</p>}

            <p className="privacy">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="success-section">
            <div className="success-icon">✓</div>

            <h1>You're Subscribed!</h1>

            <p className="message success">{message}</p>

            <button
              type="button"
              onClick={() => {
                setIsSubscribed(false);
                setMessage("");
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
