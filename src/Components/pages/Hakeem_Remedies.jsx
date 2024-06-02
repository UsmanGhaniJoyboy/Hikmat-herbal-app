import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import search from "../images/nounsearch.png";
import "../StyleSheets/Hakeem_remedies.css";
import Remedy_card from "../inc/Remedy_card";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Hakeem_Remedies() {
  const location = useLocation();
  const { RemedyData } = location.state;
  const [remedies, setRemedies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchHakeemNuskhas = async () => {
      try {
        const response = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetAllRemedyAgainstHakeem?id=${RemedyData.id}`
        );

        if (response.data && Array.isArray(response.data)) {
          setRemedies(response.data);
          console.log("View Remedy data is  :", response.data);
        } else {
          alert(response.data);
          console.log("Data isn't coming");
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

    fetchHakeemNuskhas();
  }, [RemedyData]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const filteredRemedies = remedies.filter((remedy) =>
    remedy.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <CustomeNav />
      <Custome_heading title="View " />
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <div className="search-container-rem">
              <img src={search} alt="search icon" className="search-icon" />
              <input
                type="text"
                placeholder="Search Remedies"
                className="search-input"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </Col>
        </Row>
        <div className="rem_container">
          <Row md={12}>
            {filteredRemedies.map((remedy, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <Remedy_card
                  title={remedy.name}
                  Rating={remedy.AverageRating}
                  Comment="Comment & Reply"
                  link="/HakeemProfile/Hakeem_Remedies/Add_product"
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Hakeem_Remedies;
