import React, { useState, useEffect } from "react";
import CustomeNav from "../inc/CustomeNav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import search from "../images/nounsearch.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import hairfal from "../images/Hairfall oil.jpg";
import kidneystone from "../images/bhrigranj powder kidney stone.jpeg";
import H_kidney from "../images/Human Kidney.jpeg";
import diabatease from "../images/diabatease.jpg";
import { Link } from "react-router-dom";
import "../StyleSheets/home.css";
import { useNavigate } from "react-router-dom";
import acidity from "../images/acitiy.png";
import filter from "../images/filter.png";
import Home_remedyCard from "../inc/Home_remedyCard";
import Nav2_forPatient from "../inc/Nav2_forPatient";
// import { useLocation } from "react-router-dom";

function Remedies({sendName}) {
  // const location = useLocation();
  // Extract response from location state
  // const response = location.state?.response || null;
  const navigate = useNavigate();
  const [checkPatient, setCheckPatient] = useState(null);
    // const { response_Patient } = location.state || {};
   
  // const [checkP,setCheckP] =useState(false);

  useEffect(() => {
    handleTheRole();
  }, [sendName]);

  const handleTheRole = () => {
    if (sendName.rol === "Patient") {
      setCheckPatient(true);
    } else {
      setCheckPatient(false);
    }
  };

  const gotoRemediesDetail = () => {
    navigate("/Remedies/RemediesDetails");
  };
  return (
    <>
      {/* <CustomeNav /> */}

      {checkPatient ? <CustomeNav />: <Nav2_forPatient /> }


      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
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
      </Container>
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home/Remedy_Disciption"
              title="Hair fall Remedy"
            >
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
          <Col md={8}>
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
          <Col md={8}>
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
          <Col md={8}>
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

export default Remedies;
