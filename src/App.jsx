import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/search";
import MovieCard from "./components/movieCard";
import NavbarMain from "./components/NavbarDefault";
import Description from "./components/Description";
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M5MGNmN2FkNjJjMDFiZDMzNWRmOGI3MzFmMjI0NiIsIm5iZiI6MTc1MzQyMjU4My4zNDIwMDAyLCJzdWIiOiI2ODgzMWFmNzNjZjEwMDYwMGI1MmEyYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZjYway4Ke9u0ycZri1KiXy_TPoT-1xjFDak0dl0nLzc`,
  }
}
const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async (query) => {
    try {
      setIsLoading(true);
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
        : API_BASE_URL;
      const res = await fetch(endpoint, API_OPTIONS);
      const data = await res.json();

      if (data.success === false || !data.results) {
        setErrorMessage(data.status_message || "Failed to load movies!");
        setMoviesList([]);
      } else {
        setMoviesList(data.results);
      }
    } catch (err) {
      setErrorMessage("An error occurred while fetching movies.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={
          <main>
            <div className="wrapper">
              <header>
                <NavbarMain />
                <div className="relative w-screen justify-center items-center flex pt-[80px] mb-[50px]  h-[300px]" >
                  <img src="../two.jpg" alt="" className="inline-block  h-64 w-44 absolute z-0 top-0 left-[34%] transform -rotate-7 translate-y-8 rounded-xl" />
                  <img src="../one.jpg" alt="" className="inline-block h-72 w-50 absolute z-20 top-0 left-[42%] right-[47%] rounded-xl filter drop-shadow-lg" />
                  <img src="../three.jpg" alt="" className="inline-block h-64 w-44 absolute z-0 top-0 right-[37%] transform rotate-8 translate-y-8  rounded-xl" />
                </div>
                <h1 className="text-4xl font-semibold items-center text-center mt-10 text-white">
                  Find <span className="bg-gradient-to-r from-indigo-200 to-indigo-400 text-transparent bg-clip-text ">Movies</span> You Will Enjoy Without The Hassle!
                </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </header>

              <section className="section-two">
                <div>
                  <h2 className="flex justify-center text-white text-3xl pb-12 pt-18">Trending Movies</h2>

                  <div className="pl-[100px] pr-[100px] grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 p-4">
                    {isLoading ? (
                      <p className="text-white text-xl  text-center">Loading...</p>
                    ) : errorMessage ? (
                      <p className="text-red-500 text-xl text-center">{errorMessage}</p>
                    ) : (
                      moviesList.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <MovieCard key={movie.id} movie={movie} />
                        </Link>
                      ))
                    )}
                  </div>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
              </section>
            </div>
          </main>
        } />

        {/* Description Route */}
        
        <Route path='/movie/:id'  element={<Description moviesList={moviesList} />}/>
      </Routes>
    </Router>
  );
};

export default App;