// In App.js

import React, { useState,  } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Clear isLoggedIn status from localStorage
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/HakeemProfile" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/HakeemProfile" 
        element={<HakeemProfile handleLogout={handleLogout} />} />

        {/* Protected Routes */}
        {isLoggedIn && (
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/Remedies" element={<Remedies />} />
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
        )}
      </Routes>
    </>
  );
}

export default App;
