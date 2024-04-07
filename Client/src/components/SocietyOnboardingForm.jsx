// SocietyOnboardingForm.js
import { useState } from "react";
import axios from "axios";

const SocietyOnboardingForm = () => {
  const [societyName, setSocietyName] = useState("");
  const [address, setAddress] = useState("");
  const [numBuildings, setNumBuildings] = useState(0);
  const [numAdmins, setNumAdmins] = useState(0);
  const [flatsPerBuilding, setFlatsPerBuilding] = useState(0);
  const [overallFlats, setOverallFlats] = useState(0);

  const handleOnboarding = async () => {
    try {
      const response = await axios.post("/society-onboarding", {
        societyName,
        address,
        numBuildings,
        numAdmins,
        flatsPerBuilding,
        overallFlats,
      });
      console.log(response.data); // Handle onboarding success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Society Onboarding Form</h2>
      <input
        type="text"
        value={societyName}
        onChange={(e) => setSocietyName(e.target.value)}
        placeholder="Society Name"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        type="number"
        value={numBuildings}
        onChange={(e) => setNumBuildings(e.target.value)}
        placeholder="Number of Buildings"
      />
      <input
        type="number"
        value={numAdmins}
        onChange={(e) => setNumAdmins(e.target.value)}
        placeholder="Number of Admins"
      />
      <input
        type="number"
        value={flatsPerBuilding}
        onChange={(e) => setFlatsPerBuilding(e.target.value)}
        placeholder="Flats Per Building"
      />
      <input
        type="number"
        value={overallFlats}
        onChange={(e) => setOverallFlats(e.target.value)}
        placeholder="Overall Flats"
      />
      <button onClick={handleOnboarding}>Onboard Society</button>
    </div>
  );
};

export default SocietyOnboardingForm;
