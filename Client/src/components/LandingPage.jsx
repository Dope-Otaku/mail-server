// LandingPage.js
import logoUrl from "../assets/Logo.svg";
import "../css/LandingPage.css";

const LandingPage = () => {
  return (
    // Brand Section

    <>
      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src={logoUrl}
              alt="tirukamal logo"
              height="auto"
              width="100px"
            />
          </a>
          <button
            className="navbar-toggler shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bx bx-menu"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <a className="nav-link active" aria-current="page" href="#">
                Product
              </a>
              <a className="nav-link" href="#">
                Features
              </a>
              <a className="nav-link" href="#">
                About
              </a>
              <a className="nav-link " href="#">
                Contact Us
              </a>
            </div>
            <a href="#" className="btn btn-primary shadow-none">
              Get Started!
            </a>
          </div>
        </div>
      </nav>

      {/* // Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="copy">
                <div className="text-label">Changes How You Pay Your Rent!</div>
              </div>
              <div className="text-hero-bold">Hassle Free Payment Window!</div>
              <div className="text-hero-regular">
                This is a random text and thie web app is under 24x7 Active
                Support Line!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

{
  /* <h1>Welcome to Our Society Management System</h1>
      <p>Please login or register to continue.</p>
      <button
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          window.location.href = "/register";
        }}
      >
        register
      </button> */
}
