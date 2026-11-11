
import { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    // Simulating API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);

  }

  function handleReset() {

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    });

    setSubmitted(false);
    setLoading(false);

  }

  return (

    <main className="container">

      {/* LEFT SIDE */}

      <section className="info-section">

        <div className="info-content">

          <span className="badge">Contact</span>

          <h1>Let's work together</h1>

          <p>
            Have a project in mind? We'd love to hear
            from you. Send us a message and we'll
            respond as soon as possible.
          </p>

          <div className="contact-cards">

            <div className="contact-card">
              <div className="card-icon">✉</div>

              <div className="card-info">
                <span className="card-label">Email</span>
                <a href="mailto:hello@example.com">
                  hello@example.com
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-icon">☎</div>

              <div className="card-info">
                <span className="card-label">Phone</span>
                <a href="tel:+1234567890">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-icon">⌖</div>

              <div className="card-info">
                <span className="card-label">Office</span>
                <span>123 Street, San Francisco, CA</span>
              </div>
            </div>

          </div>

          <div className="socials">
            <a href="https://x.com" aria-label="Twitter">𝕏</a>
            <a href="https://linkedin.com" aria-label="LinkedIn">in</a>
            <a href="https://instagram.com" aria-label="Instagram">◎</a>
            <a href="https://github.com" aria-label="GitHub">⌘</a>
          </div>

        </div>

      </section>

      {/* RIGHT SIDE */}

      <section className="form-section">

        {!submitted ? (

          <form className="contact-form" onSubmit={handleSubmit}>

            <h2>Send a message</h2>

            <div className="form-row">

              <div className="form-group">
                <label>First name</label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last name</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales Question</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "⏳ Sending..." : "Send Message ➤"}
            </button>

          </form>

        ) : (

          <div className="success-state">

            <div className="success-icon">✓</div>

            <h2>Message sent!</h2>

            <p>
              Thanks for reaching out.
              We'll get back to you within 24 hours.
            </p>

            <button
              className="reset-btn"
              onClick={handleReset}
            >
              Send another message
            </button>

          </div>

        )}

      </section>

    </main>

  );
}

export default App;
