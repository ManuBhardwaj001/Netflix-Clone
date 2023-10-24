import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";

function Row({ title, fetchURL, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchURL])

    console.log(movies)

    return (
        <div className={`row ${isLargeRow ? 'first-row' : ''}`}>
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((movie.poster_path) || (movie.backdrop_path)) && (
                            <img
                                className={`row__poster ${"row__posterLarge"}`}
                                key={movie.id}
                                src={`${base_url}${movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        )
                )}

            </div>
        </div>
    )
}

export default Row;
