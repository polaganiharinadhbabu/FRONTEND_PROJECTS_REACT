
import { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    setSuccess("Your message has been submitted successfully!");

    console.log("Submitted Data:", formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

  }

  return (
    <div className="contact-container">

      <div className="contact-form">

        <h1>Contact Us</h1>

        <p>We would love to hear from you!</p>

        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Subject</label>

          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <label>Message</label>

          <textarea
            name="message"
            placeholder="Write your message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
          />

          <button type="submit">
            Submit
          </button>

        </form>

        {success && (
          <p className="success-message">{success}</p>
        )}

      </div>

    </div>
  );
}

export default App;
