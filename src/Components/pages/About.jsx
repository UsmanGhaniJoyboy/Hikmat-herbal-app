import React,{useState,useEffect} from "react";
import CustomeNav from "../inc/CustomeNav";
import "../StyleSheets/About.css";
import { Link } from "react-router-dom";
import Nav2_forPatient from "../inc/Nav2_forPatient";


function About({ handleUserRole }) {
  const [checkPatient, setCheckPatient] = useState(null);

  useEffect(() => {
    console.log(handleUserRole)
    handleTheRole();
  }, [handleUserRole]);

  const handleTheRole = () => {
    if (handleUserRole.rol === "Patient") {
      setCheckPatient(true);
    } else {
      setCheckPatient(false);
    }
  };

  return (
    <>
      {/* <CustomeNav/>
       */}
      {checkPatient ? <CustomeNav /> : <Nav2_forPatient />}

      <div className="portfolio-container">
        <div className="main-content">
          <div className="heading">
            <h2>About Us</h2>
          </div>
          <div className="content">
            <p>
              Hikmat App is dedicated to providing natural and herbal remedies
              to promote health and wellness. Our mission is to empower
              individuals to take control of their health using traditional and
              time-tested herbal solutions.
            </p>
            <p>
              Our team of experts curates a wide range of herbal products and
              remedies, ensuring that each item meets the highest quality
              standards. Whether you're looking for supplements, skincare
              products, or remedies for common ailments, Hikmat App has you
              covered.
            </p>
            <p>
              We believe in the power of nature to heal and rejuvenate, and we
              strive to make herbal remedies accessible to everyone. Join us on
              our journey to a healthier, happier life with Hikmat App.
            </p>
            <p>
              For more information about our products and services, feel free to
              contact us or explore our website.
            </p>
          </div>
        </div>
        <div className="sidebar">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Remedies">Remedies</Link>
            </li>
            <li>
              <a href="#faq">FAQs</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
