// In App.js

import React, { useState,useEffect  } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Components/pages/Home";
import Remedies from "./Components/pages/Remedies";
import About from "./Components/pages/About";
import Cart from "./Components/pages/Cart";
import Login from "./Components/pages/Login";
import Add_Remedies from "./Components/pages/Add_Remedies";
import Hakeem_sale from "./Components/pages/Hakeem_sale";
import Signup from "./Components/pages/Signup";
import Filter from "./Components/pages/Filter_disease";
import RemediesDetails from "./Components/pages/RemediesDetails";
import Add_ingredient from "./Components/pages/Add_ingredient";
import Steps from "./Components/pages/Steps";
import HakeemProfile from "./Components/pages/HakeemProfile";
import Hakeem_Remedies from "./Components/pages/Hakeem_Remedies";
import Add_product from "./Components/pages/Add_product";
import Remedy_Disciption from "./Components/pages/Remedy_Disciption";
import Comment_Reply from "./Components/pages/Comment_Reply";
import SettingUpPatient from "./Components/pages/SettingUpPatient";
import { useLocation } from "react-router-dom";

function App() {
  // const logout = useLocation();
  // const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState('');
  const [name, setName ] = useState('');
  const [selectedDisease, setSelectedDisease] = useState([]);
  

  const handleSelectedDisease = (selectedOptions) => {
    setSelectedDisease(selectedOptions);
    console.log("Selected diseases in App.js:", selectedOptions); // <--- Add console.log here
  };
  
  
  const handleUserRole = (role) => {
      setIsPatient(role);
    console.log(role);
  };



  const sendName=(name)=>{
    setName(name);
  }

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedOut, setIsLoggedOut] = useState(false); 
  // Function to handle logout
  // useEffect(() => {
  //   // Check local storage or wherever you store login state
  //   const userLoggedIn = localStorage.getItem("isLoggedIn");
  //   setIsLoggedIn(userLoggedIn === "true");
  // }, []);
  
  
  // const handleLogout = () => {
  //   // Clear user login status
  //   localStorage.setItem("isLoggedIn", "false");
  //   setIsLoggedIn(false);

  // };


  

  return (
      <Routes>
        {/* <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        /> */}
        {/* <Route path="/" 
        element={<Login handleLogout={handleLogout} />} /> */}
       
        
          <>
            
            <Route path="/" element={<Login handleUserRole={handleUserRole} sendName={sendName} />} />
            <Route path="/Home" element={<Home isPatient={isPatient} selectedDisease={selectedDisease}/>} />
            <Route path="/SettingUpPatient" element={<SettingUpPatient handleSelectedDisease={handleSelectedDisease}/>} />
            <Route path="/HakeemProfile" element={<HakeemProfile sendName={name} />} />
            
            
            <Route path="/Remedies" element={<Remedies/>} />
            <Route path="/About" element={<About />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/HakeemProfile/Add_Remedies" element={<Add_Remedies />} />
            <Route path="/Hakeem_Sale" element={<Hakeem_sale />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home/Filter" element={<Filter />} />
            <Route path="/Remedies/RemediesDetails" element={<RemediesDetails />} />
            <Route path="/HakeemProfile/Add_Remedies/Add_ingredient" element={<Add_ingredient />} />
            <Route path="/HakeemProfile/Add_Remedies/Add_ingredient/Steps" element={<Steps />} />
            <Route path="/HakeemProfile/Hakeem_Remedies" element={<Hakeem_Remedies />} />
            <Route path="/HakeemProfile/Hakeem_Remedies/Add_product" element={<Add_product />} />
            <Route path="/Home/Remedy_Disciption" element={<Remedy_Disciption />} />
            <Route path="/Home/Remedy_Disciption/Comment_Reply" element={<Comment_Reply />} />
          </>
    </Routes>
  );
}

export default App;
