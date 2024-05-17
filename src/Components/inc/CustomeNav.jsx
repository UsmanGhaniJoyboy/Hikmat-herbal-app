import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo again.png";
import H_Profile from "../images/profile.png";
import "../inc/nav.css";
import logout from "../images/logout.png";

function CustomeNav({ isPatient }) {
  const [checkRole, setCheckRol] = useState(null);
  useEffect(() => {
    if (isPatient === "Patient") {
      setCheckRol(true);
      console.log(isPatient);
    }
  });

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        sticky="top"
        className="navBackground font active nav_height"
      >
        <Container className="main_container">
          <Navbar.Brand className="text-white" style={{ fontWeight: "bold" }}>
            <Link
              title="Home"
              to="/Home"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img src={logo} alt="oops" className="logo" />
              Hikmat App
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto pad">
              <NavLink title="Remedies" to="/Remedies" className="nav-link">
                Remedies
              </NavLink>
              <NavLink title="About" to="/About" className="nav-link ">
                About
              </NavLink>
              <NavLink title="Cart" to="/Cart" className="nav-link ">
                Cart
              </NavLink>
              {/* <NavLink title="Show">
                {name}
              </NavLink> */}
              {checkRole ? null : (
                <NavLink
                  title="Profile"
                  to="/HakeemProfile"
                  className="nav-link link"
                >
                  <img src={H_Profile} alt="oops" className="profile" />
                </NavLink>
              ) }
              {/* <NavLink
                title="Profile"
                to="/HakeemProfile"
                className="nav-link link"
              >
                <img src={H_Profile} alt="oops" className="profile" />
              </NavLink> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default CustomeNav;
