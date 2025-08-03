import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({movie: {title, poster_path, vote_average, release_date, id}}) => {
    return(
    <Link to={`/movie/${id}`} key={id}>
        <div className="bg-black-100 p-1 rounded-2xl shadow-inner shadow-light-100/10 ">
          <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title}  className="transition-transform duration-300 hover:scale-105 rounded-2xl h-[200px]"/>
        <div className="mt-4 text-white align-center justify-left flex mb-2">
          <h3>{title}</h3>
         </div>
         <div className="contents">
            <div className="rating">
                <img src="./star-2768.svg" alt="Star-Icon" className="mr-2 inline h-[10px] w-[10px]"/>
                <p className="inline text-white">{vote_average ? vote_average.toFixed(1):"N/A"}</p>
                <span className="year"> • </span>
                <p className="inline year">{release_date ? release_date.split('-')[0] : "N/A"}</p>
       
            </div>
         </div>
        </div>
    </Link>
    )
}


export default MovieCard;