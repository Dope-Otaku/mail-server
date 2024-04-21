import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocietyDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("access_token");
      console.log("Token:", token);

      if (!token) {
        // Redirect to login if no token is found
        navigate("/401");
      }

      // Optionally, you can validate the token here using an API call
      // For example:
      // axios.post('/validate-token', { token })
      //   .then(response => {
      //     if (response.status !== 200) {
      //       navigate('/login');
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error validating token:', error);
      //     navigate('/login');
      //   });
    };

    checkToken();
  }, [navigate]);

  return (
    <div>
      <h2>Society Dashboard</h2>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default SocietyDashboard;
