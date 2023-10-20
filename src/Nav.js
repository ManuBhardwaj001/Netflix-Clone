import React, { useEffect, useState } from "react";
// import Netflix_Logo_RGB from "../public/images/Netflix_Logo_RGB.png"
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 50) {
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
        onClick={()=>{
          navigate("/")
        }}
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />

      <img className="nav__avatar"
        onClick={() => {
          navigate("/profile")
        }}
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />

    </div>
  </div>
  )
}

export default Nav;
