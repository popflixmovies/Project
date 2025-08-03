import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./LoadingPage";

const WatchPage = ({ moviesList }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(null)

  // Try to get from props first
  useEffect(() => {
    if (moviesList && moviesList.length > 0) {
      const localMovie = moviesList.find((movie) => movie.id === parseInt(id));
      if (localMovie) {
        setMovie(localMovie);
        return;
      }
    }

    // If not found in props, fetch from API
    const fetchMovie = async () => {
      try {
          const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    fetchMovie();
  }, [id, moviesList]);

  if (!movie) {
    return (
      <div className="text-black text-center justify-center text-3xl">
        Loading movie...
      </div>
    );
  }

  const { title } = movie;
  const embedURL = `https://vidsrc.icu/embed/movie/${id}`;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#948979] to-[#393E46] text-white overflow-x-hidden px-4">
      <h1 className="text-4xl font-bold text-center mb-10 pt-10">{title}</h1>

      <div className="flex flex-col items-center">
    {!iframeLoaded && (
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <Loading />
          </div>
        )}
        <iframe
          src={embedURL}
          scrolling="no"
          allowFullScreen
          className="rounded-xl w-full max-w-[1000px] h-[600px] mb-[100px]"
          onLoad={() => setIframeLoaded(true)}
        ></iframe>

        <Link to={`/`}>
          <button className="pt-3 pb-3 pl-9 pr-9 bg-gray-500 hover:bg-gray-700 rounded-xl mb-[100px]">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WatchPage;
