import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../images/slider3.jpg";
import slider2 from "../images/slider 4.jpg";
import "../StyleSheets/home.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import search from "../images/nounsearch.png";
import Home_remedyCard from "../inc/Home_remedyCard";
import Nav2_forPatient from "../inc/Nav2_forPatient";
import CustomeNav from "../inc/CustomeNav";
import { useLocation } from "react-router-dom";

function Home({ isPatient,handleUserRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [remediesAgainstDisease, setRemediesAgainstDisease] = useState([]);
  const [checkPatient, setCheckPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract disease IDs from location state
  const { diseaseIds } = location.state || {};

  useEffect(() => {
    handleTheRole();
    console.log("Disease IDs from previous page", diseaseIds);
    console.log("Patient data coming from App.js to home page ", handleUserRole);

    const fetchNuskhas = async () => {
      try {
        if (diseaseIds && diseaseIds.length > 0) {
          const idsString = diseaseIds.join(",");
          const response = await axios.get(
            `http://localhost/Hakeemhikmat/api/Addnushka/SearchNushka?diseaseIds=${idsString}`
          );

          if (response.data && response.data.length > 0) {
            const sortedData = response.data.sort(
              (a, b) => b.AverageRating - a.AverageRating
            );
            setRemediesAgainstDisease(sortedData);
            console.log("Nuskhas Fetched:", sortedData);
          } else {
            console.log("No Nuskhas found");
          }
        } else {
          console.log("No disease IDs provided");
          // Handle case where no disease IDs are provided (optional)
        }
      } catch (error) {
        console.error("Error fetching Nuskhas:", error);
      }
    };

    fetchNuskhas();
  }, [diseaseIds]);
  // Other component logic

  const handleSeeRemedyClick = (index) => {
    const selectedRemedy = remediesAgainstDisease[index];
    navigate("/Home/Remedy_Disciption", {
      state: { remedy: selectedRemedy, patientComing: isPatient },
    });
  };

  const handleTheRole = () => {
    if (isPatient.rol === "Patient") {
      setCheckPatient(true);
    } else {
      setCheckPatient(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRemedies = remediesAgainstDisease.filter((remedy) =>
    remedy.NuskhaName.toLowerCase()(searchQuery.toLowerCase())
  );

  return (
    <>
      {checkPatient ? <Nav2_forPatient /> : <CustomeNav />}

      <div className="slider-container">
        <Carousel fade className="slider">
          <Carousel.Item>
            <img src={slider2} alt="" className="slider_img" />
            <Carousel.Caption>
              <h3 className="caption">Plantain Seeds</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={slider1} alt="" className="slider_img" />
            <Carousel.Caption>
              <h3 className="caption">Skincare Lotion</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <div className="search-container">
                <img src={search} alt="search icon" className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Remedies"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </Col>
          </Row>
          <Row md={12}>
            {filteredRemedies.map((remedy, index) => (
              <Col md={4} key={index}>
                <Home_remedyCard
                  remedyName={remedy.NuskhaName}
                  hakeemName={remedy.HakeemName}
                  perhaiz = {remedy.perhaizid}
                  rating={remedy.AverageRating}
                  diseaseName={remedy.DiseaseName}
                  onClick={() => handleSeeRemedyClick(index)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Home;
