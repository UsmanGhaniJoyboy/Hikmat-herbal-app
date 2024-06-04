import CustomeNav from "../inc/CustomeNav";
import React, { useEffect, useState } from "react";
import "../StyleSheets/Add_Rem.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Custome_heading from "../inc/Custome_heading";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Select from "react-select";

function Add_Remedies() {
  const navigate = useNavigate();
  const location = useLocation();
  const { HakeemId } = location.state;
  const [hakeemdata, setHakeemdata] = useState("");
  const [diseases, setDiseases] = useState([]);
  //This state is for seting the selected disease
  const [selectedDisease, setSelectedDisease] = useState([]);
  //for nuskha id
  const [nuskhaId, setNuskhaId] = useState("");
  const [remedyName, setRemedyName] = useState("");
  const [addDisease, setAddDisease] = useState("");

  //for publicand private
  const [Remedy_privacy, setRemedy_privacy] = useState("");

  useEffect(() => {
    // setHakeemdata(HakeemId);
    console.log("Hakeem data is coming on Add remedy Page ", HakeemId);
    console.log("Hakeem's id is coming on Add Remedy page ", HakeemId.id);

    const addRemedy = async () => {
      try {
        const responseDiseases = await axios
          .get("http://localhost/Hakeemhikmat/api/Addnushka/showAllDisease")
          .then((responseDiseases) => {
            // Check if the response contains data
            if (responseDiseases.data && responseDiseases.data !== "NO DATA") {
              console.log("Diseases:", responseDiseases.data);
              // setDiseases(response.data);
              setDiseases(
                responseDiseases.data.map((disease) => ({
                  id: disease.id,
                  label: disease.name,
                }))
              );
              // handleDisease(setDiseases);
              console.log(diseases);
            } else {
              console.log("No diseases found");
            }
          })
          .catch((error) => {
            console.error("Error fetching diseases:", error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    addRemedy();
  }, [HakeemId.id]);

  // const handleDiseaseChange = (selectedOptions) => {
  //   setSelectedDiseases(selectedOptions.map((option) => option.value));
  // };

  const gotoIngredient = () => {
    console.log(`selected disease id ${selectedDisease}`);
    console.log(`Name ${remedyName}`);
    console.log(`Publicity ${Remedy_privacy}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("h_id", HakeemId.id);
    formData.append("name", remedyName);
    formData.append("publicity", Remedy_privacy);

    try {
      // First API call to add the remedy and get the NuskhaId
      const response = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/AddRemedy",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      var nuskhaid = response.data;
      // setNuskhaId(nuskhaid);
      console.log("Data submitted successfully:", nuskhaid);

      // Prepare form data for the second API call
      const formData2 = new FormData();
      formData2.append("n_id", nuskhaid);
      formData2.append("d_id", selectedDisease.id);

      // Second API call to add the nuskha data against the disease
      const responseDisaseNuskha = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/AddNushkaData",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Nuskha data added successfully:", responseDisaseNuskha.data);

      // Handle success (e.g., navigate to next step, show success message)
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error (e.g., show error message)a
    }
    // navigate("/HakeemProfile/Add_Remedies/Add_ingredient",{state:{Nuskha_Id:nuskhaid}});
    navigate("/HakeemProfile/Add_Remedies/Add_ingredient", {
      state: { Nuskha_Id: nuskhaid },
    });
  };

  const handleDisease = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", addDisease);

    try {
      // First API call to add the remedy and get the NuskhaId
      const response = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/PostDisease",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Disease Added:", response.data.name);

      // Handle success (e.g., navigate to next step, show success message)
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error (e.g., show error message)a
    }
  };

  // Define options here

  return (
    <>
      <CustomeNav />
      <Custome_heading title="Add " />
      <div className="add-remedies-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="disease">Diseases</label>
            <Select
              options={diseases}
              value={selectedDisease}
              onChange={(selectedOption) => {
                setSelectedDisease(selectedOption);
                console.log("Selected disease:", selectedOption);
              }}
            />
            <br />
            <div className="form-group">
              <label htmlFor="remedyName">Add Disease(Optional):</label>
              <input
                type="text"
                id="remedyName"
                value={addDisease}
                onChange={(e) => setAddDisease(e.target.value)}
                placeholder="Add new Disease if not in Disease section"
                required
              />
            </div>
            <button onClick={handleDisease} type="submit">
              Add Disease
            </button>

            {/* <div>Disease Selected: {selectedDiseases}</div> */}
          </div>

          <div className="form-group">
            <label htmlFor="remedyName">Name of Remedy:</label>
            <input
              type="text"
              id="remedyName"
              value={remedyName}
              onChange={(e) => setRemedyName(e.target.value)}
              placeholder="Enter Name of Remedy"
              required
            />
          </div>
          {/* Radion button */}
          <div className="form-group">
            <label>Remedy Should be:</label>
            <div className="radio-group">
              <label htmlFor="Public">
                <input
                  type="radio"
                  id="Public"
                  name="Remedy_privacy"
                  value="Public"
                  checked={Remedy_privacy === "Public"}
                  onChange={(e) => setRemedy_privacy(e.target.value)}
                />
                Public
              </label>
              <label htmlFor="Private">
                <input
                  type="radio"
                  id="Private"
                  name="Remedy_privacy"
                  value="Private"
                  checked={Remedy_privacy === "Private"}
                  onChange={(e) => setRemedy_privacy(e.target.value)}
                />
                Private
              </label>
            </div>
          </div>
          <button onClick={handleSubmit} type="submit">
            Move to next step
          </button>
        </form>
      </div>
    </>
  );
}
export default Add_Remedies;
