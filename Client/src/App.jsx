import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ErrorPage from "./components/ErrorPages/401/errorPage";
import RegisterPage from "./components/RegisterPage";
import SocietyOnboardingForm from "./components/SocietyOnboardingForm";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/401" element={<ErrorPage />} />
        <Route path="/society-onboarding" element={<SocietyOnboardingForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
