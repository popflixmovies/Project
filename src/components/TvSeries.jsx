import React from "react";
import { Link } from "react-router-dom";


const TvSeries = ({show: {name, poster_path, vote_average, first_air_date, id}}) => {
    return(
      <div className="bg-black-100 p-1 rounded-2xl shadow-inner shadow-light-100/10 drop-shadow-xl">
         <Link  to={`/series/${id}`}>
                 <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={name}  className="transition-transform duration-300 hover:scale-105 rounded-2xl h-[200px]"/>
         </Link>
               <div className="mt-4 text-white align-center  text-[18px] justify-left flex mb-2">
                 {name}
                </div>
                <div className="contents">
                   <div className="rating">
                       <img src="./public/star-2768.svg" alt="Star-Icon" className="mr-2 inline h-[10px] w-[10px]"/>
                       <p className="inline text-white">{vote_average ? vote_average.toFixed(1):"N/A"}</p>
                       <span className="year"> • </span>
                       <p className="inline year">{first_air_date ? first_air_date.split('-')[0] : "N/A"}</p>
                      
                   </div>
                </div>
               </div>
    )
}


export default TvSeries;