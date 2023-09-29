import React from "react";
import "./Banner.css";

function Banner() {

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `URL("https://miro.medium.com/v2/resize:fit:1400/1*5lyavS59mazOFnb55Z6znQ.png")`,
                    backgroundPosition: "center center"
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner_title">
                        Movie Name
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner_button">Play</button>
                        <button className="banner_button">My List</button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(`This is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descr`, 150)}
                    </h1>
                </div>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>)
}

export default Banner;
