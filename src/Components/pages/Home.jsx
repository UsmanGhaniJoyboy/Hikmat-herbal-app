import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomeNav from "../inc/CustomeNav";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../images/slider3.jpg";
import slider2 from "../images/slider 4.jpg";
import "../StyleSheets/home.css";
// import "../StyleSheets/Login.css";
import herbs from "../images/herbs.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import search from "../images/nounsearch.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import shampoo from "../images/HerbalShampoo.jpg";
import qabz from "../images/qabz.jpg";
import kidney from "../images/kidney stone.jpg";
import safi from "../images/safi.jpg";
import filter from "../images/filter.png";
import Footer from "../inc/Footer";
import Home_remedyCard from "../inc/Home_remedyCard";

function Home({routeName}) {
  return (
    <>
      <CustomeNav name={routeName}/>
      <h3 className="caption">{routeName}</h3>
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
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <div className="search-container">
              <img src={search} alt="search icon" className="search-icon" />

              <input
                type="text"
                placeholder="Search Remedies"
                className="search-input"
                value="Having hairfall"
              />
              <Link to="/Home/Filter" title="Filter disease">
                <img src={filter} alt="oops" className="filter-icon" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid="md">
        <Row className="justify-content-md-center rem-row">
         
          <Col md={3}>
          <Link style={{textDecoration:"none"}}  title="Hair fall Remedy" to="/Home/Remedy_Disciption">
            <Home_remedyCard
              remHeader="Hair fall Remedy"
              cardText="For hair treatements / for make your hair long and strong"
              remRating="Rating * * * * *"
              />
              </Link>
            {/* <Link className="border_shadow">
          <Card className="border_shadow" >
              <Card.Img variant="top" src={safi}/>
              <Card.Body>
                <Card.Title>Safi</Card.Title>
                <Card.Text>
                 This syrup is best for Stomach and Face pimpuls
                </Card.Text>
                <h3>Rs.300</h3>
                <Button variant="primary">Buy</Button>
              </Card.Body>
            </Card>
          </Link> */}
          </Col>
          <Col md={3}>
          <Home_remedyCard
              remHeader="Stomach Acidity Remedy"
              cardText="Take control of acidity with our trusted remedy"
              remRating="Rating * * * * "
            />
            {/* <Link className="border_shadow" >
          
          <Card className="border_shadow">
              <Card.Img variant="top" src={kidney}/>
              <Card.Body>
                <Card.Title>Kidney Stone Breaker</Card.Title>
                <Card.Text>
                 It give relief from pain/ use it for stone breaker
                </Card.Text>
                <h3>Rs.230</h3>
                <Button variant="primary">Buy</Button>
              </Card.Body>
            </Card>
          </Link> */}
          </Col>
          <Col md={3}>
          <Home_remedyCard
              remHeader="Heart Disease Remedy"
              cardText="Good For blood pressure / heart related diseases"
              remRating="Rating * * * "
            />
            {/* <Link className="border_shadow" > 
          <Card className="border_shadow" >
              <Card.Img variant="top" src={qabz}/>
              <Card.Body>
                <Card.Title>Majoon . Qabz relief Syrup</Card.Title>
                <Card.Text style={{marginBottom:"40px"}} >
                 best for belly pain and qabz relief
                </Card.Text>
                <h3>Rs.400</h3>
                <Button variant="primary">Buy</Button>
              </Card.Body>
            </Card>
          </Link> */}
          </Col>
          <Col md={3}>
          <Home_remedyCard
              remHeader="Remedy for Body weakness"
              cardText="Having weakness in body , feeling Fatigue"
              remRating="Rating * * "
            />
            {/* <Link className="border_shadow" >
          <Card className="border_shadow" >
              <Card.Img variant="top" src={shampoo}/>
              <Card.Body>
                <Card.Title>Herbal Valley Shampoo</Card.Title>
                <Card.Text style={{marginBottom:"40px"}}>
                 Try it to grow long hair
                </Card.Text>
                <h3>Rs.500</h3>
                <Button variant="primary">Buy</Button>
              </Card.Body>
            </Card>
          </Link> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
