// CategoryCarousel.jsx
import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const CategoryCarousel = ({ title, movies, linkTo }) => {
  return (
    <div className="mb-8">
      {/* Title Row */}
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <Link to={linkTo} className="text-sm text-red-500 hover:underline">
          See all &gt;
        </Link>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[150px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
