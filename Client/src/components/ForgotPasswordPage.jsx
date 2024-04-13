import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Password reset link sent to your email.");
      }
    } catch (error) {
      console.error("error", error);
      setMessage("Error sending password reset link.");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleForgotPassword}>
        Send Reset Link
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
