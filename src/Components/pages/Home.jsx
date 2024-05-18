import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import CustomeNav from "../inc/CustomeNav";
import axios from "axios";

import Carousel from "react-bootstrap/Carousel";
import slider1 from "../images/slider3.jpg";
import slider2 from "../images/slider 4.jpg";
import "../StyleSheets/home.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
// import "../StyleSheets/Login.css";
import herbs from "../images/herbs.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import search from "../images/nounsearch.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import filter from "../images/filter.png";
// import Footer from "../inc/Footer";
import Home_remedyCard from "../inc/Home_remedyCard";
// import Nav2_forPatient from "../inc/Nav2_forPatient";
import { useLocation, useNavigate } from "react-router-dom";

function Home({ isPatient, selectedDisease }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [remediesAgainstDisease, setremediesAgainstDisease] = useState([]);

  // const [checkPat, setCheckPat] = useState(true);

  // const { response_Patient } = location.state || {};
  useEffect(() => {
    const fetchNuskhas = async () => {
      try {
        const ids = selectedDisease.map((item) => item.value);
        const idsString = ids.join(",");
        const response = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/SearchNushka?diseaseIds=${idsString}`
        );

        if (response.data && response.data !== "NO DATA") {
          const sortedData = response.data.sort(
            (a, b) => b.AverageRating - a.AverageRating
          );
          setremediesAgainstDisease(response.data);
          console.log("Nuskhas Fetched:", response.data);
        } else {
          console.log("No Nuskhas found");
        }
      } catch (error) {
        console.error("Error fetching Nuskhas:", error);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error message:", error.message);
        }
      }
    };

    fetchNuskhas();
  }, [selectedDisease]);

  // const [checkPatient , setCheckPatient] = useState(false);

  // useEffect(() => {
  //   // Check if the default response is 'patient'
  //   if (patient_coming === 'Patient') {
  //     console.log(checkPatient)
  //     setCheckPatient(true);

  //   }
  // }, [patient_coming]);

  const handleSeeRemedyClick = (index) => {
    const selectedRemedy = remediesAgainstDisease[index];
    navigate("/Home/Remedy_Disciption", { state: { remedy: selectedRemedy } });
  };
  return (
    <>
      {
        // checkPatient ?   (<Nav2_forPatient patientResponse={patient_coming} />) : ( <CustomeNav/>)
      }

      <CustomeNav isPatient={isPatient} />
      <div className="slider-container">
        <Carousel fade className="slider">
          <Carousel.Item>
            <img src={slider2} alt="" className="slider_img" />
            <Carousel.Caption>
              <h3 className="caption">Plantian Seeds </h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={slider1} alt="" className="slider_img" />
            <Carousel.Caption>
              <h3 className="caption">Skincare lotion</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      >
        <Container>
          <Row className="justify-con tent-md-center">
            <Col md={12}>
              <div className="search-container">
                <img src={search} alt="search icon" className="search-icon" />

                <input
                  type="text"
                  placeholder="Search Remedies"
                  className="search-input"
                />
              </div>
            </Col>
          </Row>
          <Row md={12}>
            {remediesAgainstDisease.map((remedy, index) => (
              <Col md={4} key={index}>
                <Home_remedyCard
                  remedyName={remedy.NuskhaName}
                  hakeemName={remedy.HakeemName}
                  rating={remedy.AverageRating}
                  diseaseName={remedy.DiseaseName}
                  onClick={() => handleSeeRemedyClick(index)}
                />
              </Col>
            ))}

            {/* </Link> */}
          </Row>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Home;
