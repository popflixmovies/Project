import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function UncontrolledExample() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, [API_URL]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading movies...</p>;
  }

  return (
    <Carousel className="w-screen h-screen">
      {movies.slice(0, 5).map((movie) => {
        const originalUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
        return (
          <Carousel.Item key={movie.id} active>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={originalUrl}
                srcSet={`
                  https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
                  https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w,
                  ${originalUrl} 1920w
                `}
                sizes="100vw"
                alt={movie.title}
                className="w-screen h-screen object-cover"
              />
            <Carousel.Caption className="rounded-xl p-3 text-left">
  <h1 className="font-serif text-[080503]/70">
    {movie.title}
  </h1>
 
            </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel> 
 );
}

export default UncontrolledExample;
