import React from "react";
import "./Homescreen.css";
import Nav from "./Nav";
import Banner from "./Banner";

function Homescreen() {
    return <div className="homeScreen">
        {/* Nav */}
        <Nav />
        {/* Banner */}
        <Banner />
        {/* Row */}
    </div>;
}

export default Homescreen;
