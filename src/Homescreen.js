import React from "react";
import "./Homescreen.css";
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import requests from "./Requests";


function Homescreen() {
    return <div className="homeScreen">

        <Nav />


        <Banner />

        <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />

        <>
            <h5 className="disclaimer" style={{ display: 'flex', justifyContent: 'center' }}>
                This website is for educational purposes and the clone of the real website. If you wish to visit the real website and want to watch the content, please go to&nbsp;
                <a href="https://www.netflix.com/browse" target="_blank" rel="noopener noreferrer">Netflix</a>
            </h5>
        </>
    </div>
}

export default Homescreen;
