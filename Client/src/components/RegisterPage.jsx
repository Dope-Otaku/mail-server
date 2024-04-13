import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gicon from "../assets/1.png";
import gimage from "../assets/google.png";
import "../css/login.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async () => {
    if (!email.includes("@") || password !== retypePassword) {
      setError("Please enter a valid email and matching passwords.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        { email, password, username, role },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 200) {
        navigate("/login"); // Navigate to "/" if status code is 200
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              Register With Us!
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
                <h2>New Membaer?</h2>
                <p>We are happy to have you!</p>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="input-group mb-1">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  placeholder="Re-Type Password"
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="dropdown mb-3">
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="society">Society</option>
                    <option value="admin">Admin</option>
                    <option value="resident">Resident</option>
                  </select>
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
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-light w-100 fs-6">
                  <img
                    src={gimage}
                    style={{ width: "20px" }}
                    className="me-2"
                    alt="Google Icon"
                  />
                  <small>Sign In with Google</small>
                </button>
              </div>
              <div className="row">
                <small>
                  {" "}
                  Already have an account! <a href="/login">Login</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h2>Register</h2>
      
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="society">Society</option>
        <option value="admin">Admin</option>
        <option value="resident">Resident</option>
      </select>
      <button onClick={handleRegister}>Register</button> */}
    </>
  );
};

export default RegisterPage;
