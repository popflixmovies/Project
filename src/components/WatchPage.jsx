import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const WatchPage = ({ moviesList })=>{
    const { id } = useParams();
    const movie = moviesList.find((movie) => movie.id === parseInt(id));
    
    if (!movie) return <div className="text-black text-center justify-center text-3xl">Movie not found</div>;
    
    const { title, overview, poster_path, release_date, vote_average} = movie;
    const embedURL = `https://vidsrc.icu/embed/movie/${id}`

    return(
        <div className="w-screen min-h-screen bg-gradient-to-b from-[#948979] to-[#393E46] text-white overflow-x-hidden px-4">
  <h1 className="text-4xl font-bold text-center mb-10 pt-10">{title}</h1>

  <div className="flex flex-col items-center">
    <iframe
      src={embedURL}
      scrolling="no"
      allowFullScreen
      className="rounded-xl w-full max-w-[1000px] h-[600px] mb-[100px]"
    ></iframe> 
<Link to={`/`}>
    <button className="pt-3 pb-3 pl-9 pr-9  bg-gray-500 hover:bg-gray-700 rounded-xl  mb-[100px]">
      Home
    </button>
</Link>
  </div>
</div>

    )
}

export default WatchPage;