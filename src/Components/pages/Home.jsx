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

function Home({ isPatient, selectedDisease }) {
  const navigate = useNavigate();
  const [remediesAgainstDisease, setremediesAgainstDisease] = useState([]);
  const [checkPatient, setCheckPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Who is coming : ", isPatient.rol);
    handleTheRole();

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
          setremediesAgainstDisease(sortedData);
          console.log("Nuskhas Fetched:", sortedData);
        } else {
          console.log("No Nuskhas found");
        }
      } catch (error) {
        console.error("Error fetching Nuskhas:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };

    fetchNuskhas();
  }, [selectedDisease]);

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
    remedy.NuskhaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {checkPatient ? <Nav2_forPatient /> : <CustomeNav />}

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
            {/* <Col md={2}>
              <button style={{marginTop:'30px'}}>Logout</button>
            </Col> */}
          </Row>
          <Row md={12}>
            {filteredRemedies.map((remedy, index) => (
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
          </Row>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Home;
