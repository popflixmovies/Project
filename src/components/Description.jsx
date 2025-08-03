import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; // or fetch
import Loading from "./LoadingPage";
const Description = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    fetchMovie();
  }, [id]);


  if (!movie) return <div className="text-black text-center justify-center text-3xl"><Loading/></div>;

  const { title, overview, poster_path, release_date, vote_average } = movie;




 

return (
    <div className="w-screen min-h-screen bg-[#393E46] text-white overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center mb-6 pt-10 pb-10">{title}</h1>

      <div className="flex flex-col items-center gap-6">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
          className="rounded-3xl w-[350px] h-[500px] shadow-lg"
        />

        <p className="text-lg text-center px-4 md:px-20 text-white">{overview}</p>

        <p className="text-sm text-gray-400 text-white">Release Date: {release_date}</p>

        <div className="flex items-center gap-2">
          <img src="/star-2768.svg" alt="Star Icon" className="h-4 w-4" />
          <p className="text-lg">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>
<Link to={`/watch/${id}`}>
        <button className="mt-4 mb-8 bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded-full">
          Watch Now
        </button>
        
</Link>
      </div>
    </div>
  )}
export default Description;