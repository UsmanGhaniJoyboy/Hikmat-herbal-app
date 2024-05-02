import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import CustomeNav from "../inc/CustomeNav";
import profile from "../images/hakeem profile.jpg";
import logout from "../images/logout.png";
import herbal from "../images/herbal-2835137.png";
import shoping from "../images/shopping.png";
import sales from "../images/sales again.png";
import "../StyleSheets/Hikmat.css";

function HakeemProfile() {
  const navigate = useNavigate();
  const handleAddRemediesClick = () => {
    navigate("/HakeemProfile/Add_Remedies");
  };


  const handleViewRemediesClick = () => {
    navigate("/HakeemProfile/Hakeem_Remedies");
  };
  const handleSales = () => {
    navigate("/Hakeem_sale");
  };

  const buy = () => {
    navigate("/Home");
  };
  const [hakeemName, setHakeemName] = useState("Suleman");
  // const [hakeemAge, setHakeemAge] = useState(30);
  // const [hakeemExp, setHakeemExp] = useState("3 years");
  
  return (
    <>
      <CustomeNav />
      <div className="main">
        <div className="heading_profile">
          <h2>Hakeem Profile</h2>
          <div className="logout">
            <Link className="logout_link" to="/">Logout <img src={logout} className="logout_img" alt="logout" /></Link>
          </div>
        </div>
        <div className="card_container">
          <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
          >
            <div className="side_profile">
              {/* <div className="img_profile">
                <Image src={profile} rounded className="profile_pic" />
              </div> */}
              <div className="hakeem_info">
                <span>Name : {hakeemName} </span><br />
                {/* <span>Age : {hakeemAge} </span><br />
                <span>Experience : {hakeemExp} </span> */}
              </div>
            </div>

                
            {/* Add remedy card */}
            <div className="cards">
              <Card style={{ width: "13rem" }} className="inside-cards">
                <Card.Img
                  variant="top"
                  src={herbal}
                  className="cards_width"
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Button onClick={handleAddRemediesClick} className="card_title" variant="primary">
                    Add Remedies
                  </Button>
                </Card.Body>
              </Card>
              {/* View Remedy Detail card */}
              <Card style={{ width: "13rem" }} className="inside-cards">
                <Card.Img
                  variant="top"
                  src={herbal}
                  className="cards_width"
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Button onClick={handleViewRemediesClick} className="card_title" variant="primary">
                    View Remedies
                  </Button>
                </Card.Body>
              </Card>
                {/* Go to home page */}
              <Card style={{ width: "13rem" }} className="inside-cards">
                <Card.Img
                  variant="top"
                  src={shoping}
                  className="cards_width"
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Button onClick={buy} className="card_title" variant="primary">
                    Buy Something
                  </Button>
                </Card.Body>
              </Card>
              {/* See sales card */}
              <Card style={{ width: "13rem" }} className="inside-cards">
                <Card.Img
                  variant="top"
                  src={sales}
                  className="cards_width"
                  style={{ height: "200px" }}
                />
                <Card.Body>
                  <Button onClick={handleSales} className="card_title" variant="primary">
                    See Sales
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default HakeemProfile;
