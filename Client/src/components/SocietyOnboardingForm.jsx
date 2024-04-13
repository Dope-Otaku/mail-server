import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocietyOnboardingForm = () => {
  const [name, setSocietyName] = useState("");
  const [address, setAddress] = useState("");
  const [num_buildings, setNumBuildings] = useState("");
  const [num_admins, setNumAdmins] = useState("");
  const [flats_per_building, setFlatsPerBuilding] = useState("");
  const [overall_flats, setOverallFlats] = useState("");
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
      !name ||
      !address ||
      !num_buildings ||
      !num_admins ||
      !flats_per_building ||
      !overall_flats
    ) {
      setError("Please fill in all the details. All fields are mandatory.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/society-onboarding",
        {
          name,
          address,
          num_buildings: num_buildings,
          num_admins: num_admins,
          flats_per_building: flats_per_building,
          overall_flats: overall_flats,
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
              value={name}
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
              value={num_buildings}
              onChange={(e) => setNumBuildings(e.target.value)}
              placeholder="Number of Buildings"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={num_admins}
              onChange={(e) => setNumAdmins(e.target.value)}
              placeholder="Number of Admins"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={flats_per_building}
              onChange={(e) => setFlatsPerBuilding(e.target.value)}
              placeholder="Flats Per Building"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg bg-light fs-6"
              value={overall_flats}
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
