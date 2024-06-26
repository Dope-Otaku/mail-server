import "../css/auth.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gicon from "../assets/1.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data);
      if (response.status === 200) {
        const { access_token } = response.data; // Extract the access_token
        localStorage.setItem("access_token", access_token); // Store the access_token if needed

        switch (
          response.data.role // Access the role directly from the response data
        ) {
          case "society":
            navigate("/society-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "resident":
            navigate("/resident-dashboard");
            break;
          default:
            navigate("/");
            break;
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect credentials"); // Display error message for 401 status code
        setEmail(""); // Reset email
        setPassword(""); // Reset password
      } else {
        console.error("error", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleRememberMe = (isChecked) => {
    if (isChecked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  // Check if "Remember Me" is checked and populate email and password fields
  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    if (rememberMe) {
      const storedEmail = localStorage.getItem("email") || "";
      const storedPassword = localStorage.getItem("password") || "";
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          {/* Left Box */}
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#103cbe" }}
          >
            <div className="featured-image mb-3">
              <img
                src={gicon}
                className="img-fluid"
                style={{ width: "250px" }}
                alt="Logo"
              />
            </div>
            <p
              className="text-white fs-2"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 600,
              }}
            >
              Be Verified
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              Join hassle-free and seamless onboarding!
            </small>
          </div>
          {/* Right Box */}
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Hello, Again</h2>
                <p>We are happy to have you back.</p>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    onChange={(e) => handleRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" className="form-check-label">
                    Remember Me
                  </label>
                </div>
                <div className="mb-3">
                  <a href="#">Forgot Password?</a>
                  {/*use thus instead - /forgot-password*/}
                </div>
              </div>
              {/* Display error message */}
              {error && (
                <div
                  className="alert alert-danger mt-3 text-center"
                  role="alert"
                >
                  {error}
                </div>
              )}
              <div className="input-group mb-3 align-center">
                <button
                  className="btn btn-lg btn-primary w-100 fs-6"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="input-group mb-3">
                <button
                  className="btn btn-lg btn-light w-100 fs-6"
                  onClick={() => navigate("/")}
                >
                  <i
                    className="bx bx-home me-2"
                    style={{ width: "20px" }}
                    alt="Home Icon"
                  ></i>
                  <small>Back to Home!</small>
                </button>
              </div>
              <div className="row">
                <small>
                  {" "}
                  Don&apos;t have an account? <a href="/register">Sign Up</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
