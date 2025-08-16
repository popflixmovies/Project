import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; // or fetch
import Loading from "./LoadingPage";
const Description = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [casts, setcasts] = useState(null);

  useEffect(() => {

  
    
    
    const fetchMovie = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${apiKey}`);
        setcasts(castResponse.data.cast)
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
    <div className="w-screen min-h-screen text-white flex flex-col items-center overflow-x-hidden pb-[40px]">

        <div className="w-screen h-screen aspect-video sm:aspect-video md:aspect-video lg:aspect-video xl:aspect-video 2xl:aspect-video
                              xs:aspect-[9/16] sm:aspect-[9/16] md:aspect-[16/9] lg:aspect-[16/9] overflow-hidden relative inset-0 ">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              : "/no-movie.png"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
         <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
       </div>
       <div className="absolute z-10 flex flex-col items-center gap-6 pt-[10%]">
      <h1 className="font-bold text-center mb-6 pt-10 pb-10 text-white">{title}</h1>
        <p className="text-lg text-center px-4 md:px-20 text-white">{overview}</p>

        <p className="text-sm text-gray-400 text-white">Release Date: {release_date}</p>

        <div className="flex items-left justify-center gap-2">
          <img src="/PopFlix/star-2768.svg" alt="Star Icon" className="pt-1 h-6 w-6" />
          <p className="text-lg p-0">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>
        </div>

  <section className="bg-[#050301]">
  <h2 className="font-serif display-inline-block justify-center flex py-4" >Casts</h2>
<div className="mx-auto w-screen grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
  {casts?.map((cast) => (
    <div key={cast.id} className="flex flex-col items-center text-center">
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
            : "/no-image.png"
        }
        alt={cast.name}
        className="w-[150px] h-[200px] object-cover rounded shadow-lg"
      />
      <h3 className="text-white font-serif mt-2 text-lg">{cast.name}</h3>
    </div>
  ))}
</div>

        <div className="flex items-left justify-center gap-2">
<Link to={`/watch/${id}`}>
       <button  style={{ borderRadius: '1rem',paddingBottom: '20px' }} className="mt-4 mb-8 bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded-3xl shadow-lg">
  Watch Now
</button>
        
</Link></div>
  </section>


      </div>
  )}
export default Description;