import React, { useEffect, useState } from "react";
import Netflix_Logo_RGB from "../src/image/Netflix_Logo_RGB.png"
import Netflix_Avatar from "../src/image/Netflix_Avatar.png"
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 10) {
      handleShow(true);
    }
    else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.addEventListener("scroll", transitionNavBar)
  }, []);

  return (<div className={`nav ${show && 'nav__black'}`}>
    <div className="nav__contents">
      <img className="nav__logo"
        onClick={() => {
          navigate("/")
        }}
        src={Netflix_Logo_RGB} alt="" />

      <img className="nav__avatar"
        onClick={() => {
          navigate("/profile")
        }}
        src={Netflix_Avatar} alt="" />

    </div>
  </div>
  )
}

export default Nav;
