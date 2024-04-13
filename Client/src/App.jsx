import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ErrorPage from "./components/ErrorPages/401/errorPage";
import RegisterPage from "./components/RegisterPage";
import SocietyOnboardingForm from "./components/SocietyOnboardingForm";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import SocietyDashboard from "./components/Dashboard/SocietyDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ResidentDashboard from "./components/Dashboard/ResidentDashboard";

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
        <Route path="/society-dashboard" element={<SocietyDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/resident-dashboard" element={<ResidentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
