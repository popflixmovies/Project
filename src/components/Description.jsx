import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
const Description = () => {


//   const navigate = useNavigate();

//   const handleWatch = () => {
//     navigate(`/watch/${id}`);
//   }
    return(
    <div className="header">
        <h1 className="text-black text-center justify-center flex text-3xl p-5">title</h1>
       {/* <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title}  className="rounded-2xl p-10 mx-auto"/>
       <p className="text-white text-center justify-center flex text-lg p-5">{overview}</p>
       <p className="text-white text-center justify-center flex text-lg p-5 inline">{release_date}</p>
     <img src="./star-2768.svg" alt="Star-Icon" className="mr-2 inline h-[10px] w-[10px]"/>
     <p className="inline text-white">{vote_average ? vote_average.toFixed(1):"N/A"}</p> */}
 <button  >Watch Now</button>
    </div>
)
}

export default Description;