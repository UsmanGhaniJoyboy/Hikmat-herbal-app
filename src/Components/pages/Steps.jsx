import React, { useState,useEffect } from 'react'
import CustomeNav from '../inc/CustomeNav';
import Custome_heading from '../inc/Custome_heading';
import { Alert } from 'react-bootstrap';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';

const Steps = () => {
    const [steps , setSteps] = useState('');
    const [usages,setUsages] = useState('');
    const location = useLocation();

    const { RemedyId } = location.state || {};


    useEffect(() => {
      console.log("Remedy ID is: ", RemedyId);
    }, [RemedyId]);

    const navigate =useNavigate();
    
    const handleSteps= async()=>{
      const formData = new FormData();
      formData.append("r_id", RemedyId);
      formData.append("steps", steps);

      try {
        const responseAddSteps = await axios.post(
          "http://localhost/Hakeemhikmat/api/Addnushka/AddSteps",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (responseAddSteps.data && responseAddSteps.data !== "NO DATA") {
          const chekcStpes = responseAddSteps.data;
          setSteps(chekcStpes);
          console.log("steps id in Add Step page ", steps);
          } 
        }
        catch(error){
          console.error("Error during Api calling ",error)
          if(error.responseAddSteps){
            console.error("Response data",error.responseAddSteps.data)
            console.error("Reponse status",error.responseAddSteps.status);
          }
          else if (error.request) {
            console.error("Request data:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
        }
    

    }



    const handleUsages = async ()=>{

      const formData2= new FormData();
      formData2.append("r_id", RemedyId);
      formData2.append("usage", usages);

      try{
        const handleUsagesApi = await axios.post(
          "http://localhost/Hakeemhikmat/api/Addnushka/AddUsage",
          formData2,{
            headers:{
              "Content-Type":"multipart/form-data"
            },
          }
        );
        
        if (handleUsagesApi.data && handleUsagesApi.data !== "NO DATA") {
          const checkUsagesdata = handleUsagesApi.data;
          setUsages(checkUsagesdata);
          console.log("usages data coming on Add steps page: ", usages);
        }
          
      }
      catch(error){
        console.error("Error calling api ",error);
      }
      

    }
    
    const done= ()=>{
        alert("Remedy added")
        navigate("/HakeemProfile")
    }

  return (

    <div>
        <CustomeNav/>
        <Custome_heading
            title="Specify Steps of"
        />
        <div className="add-Ing-container text-center"> {/* Apply the styling class */}
        <form>
          <div className="AddIngredient_form-group">
            <input
              type="text"
              value={steps}
              placeholder="Add Steps"
              onChange={(e)=>setSteps(e.target.value)}
              className="form-control" // Apply the styling class
            />
            <button
              type="button"
              onClick={handleSteps}
               // Apply the styling class and add margin-right
            >
                Add Steps
            </button>
            <br />
            <br />
            <input
              type="text"
              placeholder="Add Usages"
              value={usages}
              onChange={(e)=>setUsages(e.target.value)}
              className="form-control" // Apply the styling class
            />
            <button
              type="button"
              onClick={handleUsages}
               // Apply the styling class and add margin-right
            >
                Add Usages
            </button>
            <br />
            <span style={{marginTop:'1.2rem'}}><b>Note : </b><u>You need to add Steps and Usages one by one</u></span>
            <br />
            <button
              type="button"
              onClick={done}
              className='done_btn'
              style={{width:'30%',marginTop:'1.2rem'}}
               // Apply the styling class and add margin-right
            >
                Done
            </button>
          </div>
          </form>
          </div>

    </div>
  )
}
export default Steps;