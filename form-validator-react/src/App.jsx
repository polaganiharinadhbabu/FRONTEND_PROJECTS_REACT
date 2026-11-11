
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Update input values
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSuccess(false);
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (
      formData.username.trim().length < 3 ||
      formData.username.trim().length > 25
    ) {
      newErrors.username =
        "Username must be between 3 and 25 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Email is not valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 8 ||
      formData.password.length > 25
    ) {
      newErrors.password =
        "Password must be between 8 and 25 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setSuccess(false);
    }
  };

  // Reusable input field
  const renderField = (name, label, placeholder, type = "text") => (
    <div
      className={`form-group ${
        errors[name] ? "error" : ""
      }`}
      key={name}
    >
      <label htmlFor={name}>{label}</label>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
      />

      {errors[name] && <small>{errors[name]}</small>}
    </div>
  );

  return (
    <div className="container">
      <form onSubmit={handleSubmit} noValidate>
        <h1>Register</h1>

        {renderField(
          "username",
          "Username",
          "Enter username"
        )}

        {renderField(
          "email",
          "Email",
          "Enter email",
          "email"
        )}

        {renderField(
          "password",
          "Password",
          "Enter password",
          "password"
        )}

        {renderField(
          "confirmPassword",
          "Confirm Password",
          "Confirm password",
          "password"
        )}

        <button type="submit">Register</button>

        {success && (
          <p className="success-message">
            Registration successful!
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
