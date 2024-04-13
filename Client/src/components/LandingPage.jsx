// LandingPage.js

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Our Society Management System</h1>
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
      </button>
    </div>
  );
};

export default LandingPage;
