import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocietyOnboardingForm = () => {
  const [societyName, setSocietyName] = useState("");
  const [address, setAddress] = useState("");
  const [numBuildings, setNumBuildings] = useState("");
  const [numAdmins, setNumAdmins] = useState("");
  const [flatsPerBuilding, setFlatsPerBuilding] = useState("");
  const [overallFlats, setOverallFlats] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/401"); // Redirect to 401 Unauthorized page if token is missing
    }
  }, []);

  const handleOnboarding = async () => {
    if (
      !societyName ||
      !address ||
      !numBuildings ||
      !numAdmins ||
      !flatsPerBuilding ||
      !overallFlats
    ) {
      setError("Please fill in all the details. All fields are mandatory.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/society-onboarding",
        {
          societyName,
          address,
          numBuildings,
          numAdmins,
          flatsPerBuilding,
          overallFlats,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        const userRole = response.data.role;

        switch (userRole) {
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
      console.error(error);
      setError("Failed to onboard society. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-12">
          <h2>Society Onboarding Form</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg bg-light fs-6"
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
              placeholder="Society Name"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg bg-light fs-6"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={numBuildings}
              onChange={(e) => setNumBuildings(e.target.value)}
              placeholder="Number of Buildings"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={numAdmins}
              onChange={(e) => setNumAdmins(e.target.value)}
              placeholder="Number of Admins"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={flatsPerBuilding}
              onChange={(e) => setFlatsPerBuilding(e.target.value)}
              placeholder="Flats Per Building"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={overallFlats}
              onChange={(e) => setOverallFlats(e.target.value)}
              placeholder="Overall Flats"
            />
          </div>
          {/* Display error message */}
          {error && (
            <div className="alert alert-danger mt-3 text-center" role="alert">
              {error}
            </div>
          )}
          <div className="input-group mb-3 align-center">
            <button
              className="btn btn-lg btn-primary w-100 fs-6"
              onClick={handleOnboarding}
            >
              Onboard Society
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyOnboardingForm;
