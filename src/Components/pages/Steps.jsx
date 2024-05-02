import React, { useState } from 'react'
import CustomeNav from '../inc/CustomeNav';
import Custome_heading from '../inc/Custome_heading';
import { Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Steps = () => {
    const [steps , setSteps] = useState('');

    const navigate =useNavigate();
    const handleSteps= ()=>{
        console.log("Steps added");
    }
    
    const done= ()=>{
        alert("Remedy added")
        navigate("/HakeemProfile")
    }
  return (

    <div>
        <CustomeNav/>
        <Custome_heading
            title="Specify Steps"
        />
        <div className="add-Ing-container text-center"> {/* Apply the styling class */}
        <form>
          <div className="AddIngredient_form-group">
            <input
              type="text"
              placeholder="Add Steps"
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
            <button
              type="button"
              onClick={done}
              className='done_btn'
              style={{width:'30%'}}
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