import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";


function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log(movie);
    }, [movie]);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `URL("https://image.tmdb.org/3/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner_title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner_button__play"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>Play</button>
                        <button className="banner_button__more"><svg className="svg-icon" style={{ width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M512 469.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v170.666667a42.666667 42.666667 0 0 0 85.333334 0v-170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z m16.213333-167.253333a42.666667 42.666667 0 0 0-32.426666 0 42.666667 42.666667 0 0 0-14.08 8.96 49.066667 49.066667 0 0 0-8.96 14.08A35.84 35.84 0 0 0 469.333333 341.333333a42.666667 42.666667 0 0 0 12.373334 30.293334 49.066667 49.066667 0 0 0 14.08 8.96A42.666667 42.666667 0 0 0 554.666667 341.333333a44.8 44.8 0 0 0-12.373334-30.293333 42.666667 42.666667 0 0 0-14.08-8.96zM512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 768a341.333333 341.333333 0 1 1 341.333333-341.333333 341.333333 341.333333 0 0 1-341.333333 341.333333z" />
                        </svg>
                            More info</button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                </div>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>)
}

export default Banner;
