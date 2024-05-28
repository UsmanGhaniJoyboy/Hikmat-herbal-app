import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import search from "../images/nounsearch.png";
import "../StyleSheets/Hakeem_remedies.css";
import Remedy_card from "../inc/Remedy_card";

function Hakeem_Remedies() {
  // Define state for the search input value
  const [searchValue, setSearchValue] = useState("");

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <CustomeNav />
      <Custome_heading title="Your " />

      <Container>
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
          <Row>
            <Col xs={6} md={4}>
              <Remedy_card
                title="Hairfall Remedy"
                description="Make your hair strong and healthy"
                Comment="Comment & Reply"
                Add_product="Add Product"
                Rating="Rating *****"
                link="/HakeemProfile/Hakeem_Remedies/Add_product"
              />
            </Col>
            
            <Col xs={6} md={4}>
              <Remedy_card
                title="Hairfall Remedy"
                description="Make your hair strong and healthy"
                Comment="Comment & Reply"
                Add_product="Add Product"
                Rating="Rating *****"
                link="/HakeemProfile/Hakeem_Remedies/Add_product"
              />
            </Col>
            
            <Col xs={6} md={4}>
              <Remedy_card
                title="Hairfall Remedy"
                description="Make your hair strong and healthy"
                Comment="Comment & Reply"
                Add_product="Add Product"
                Rating="Rating *****"
                link="/HakeemProfile/Hakeem_Remedies/Add_product"
              />
            </Col>
            
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Hakeem_Remedies;
