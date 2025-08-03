import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/search";
import MovieCard from "./components/movieCard";
import NavbarMain from "./components/NavbarDefault";
import Description from "./components/Description";
import { Link } from 'react-router-dom';
import WatchPage from "./components/WatchPage";
import {updateSearchCount, getTrendingMovies} from './appwrite'
import TvSeries from "./components/TvSeries";
import DescriptionForShows from "./components/DescriptionForShows";
import SeriesWatchPage from "./components/SeriesWatchPage";
import Loading from "./components/LoadingPage";
const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const TV_SERIES_API_BASE_URL = 'https://api.themoviedb.org/3/trending/tv/week?language=en-US';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M5MGNmN2FkNjJjMDFiZDMzNWRmOGI3MzFmMjI0NiIsIm5iZiI6MTc1MzQyMjU4My4zNDIwMDAyLCJzdWIiOiI2ODgzMWFmNzNjZjEwMDYwMGI1MmEyYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZjYway4Ke9u0ycZri1KiXy_TPoT-1xjFDak0dl0nLzc`,
  }
}
const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [tvSeriesList, setTvSeriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

useDebounce(()=>setDebouncedSearchTerm(searchTerm), 2000, [searchTerm])

 
const fetchShows = async(query)=>{
  try{
      setIsLoading(true);
      const tvEndpoint = query ?
       `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&sort_by=popularity.desc&language=en-US`
       : TV_SERIES_API_BASE_URL;

       const res = await fetch(tvEndpoint, API_OPTIONS);
       const data = await res.json()
 
    
      if (data.success === false || !data.results) {
        setErrorMessage(data.status_message || "Failed to load movies!");
        setTvSeriesList([])
       
      } else {
        
        setTvSeriesList(data.results);
           
        if(query && data.results.length >0){
          await updateSearchCount(query, data.results[0]);
        }
      }
    
  } catch (error) {
    console.log(error)
  } finally {
    setIsLoading (false)
  }
}

useEffect(()=>{
  fetchShows(debouncedSearchTerm)
}, [debouncedSearchTerm])

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
        if(query && data.results.length >0){
          await updateSearchCount(query, data.results[0]);
        }
      }
    } catch (err) {
      setErrorMessage("An error occurred while fetching movies.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies()
  }, [])
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={
          <main>
            <div className="wrapper">
              <header >
                <NavbarMain />
                <div className="relative w-screen justify-center items-center flex pt-[80px] mb-[50px]  h-[300px]" >
                  <img src="/two.jpg" alt="" className="inline-block  h-64 w-44 absolute z-0 top-0 left-[34%] transform -rotate-7 translate-y-8 rounded-xl" />
                  <img src="/one.jpg" alt="" className="inline-block h-72 w-50 absolute z-20 top-0 left-[42%] right-[47%] rounded-xl filter drop-shadow-lg" />
                  <img src="/three.jpg" alt="" className="inline-block h-64 w-44 absolute z-0 top-0 right-[37%] transform rotate-8 translate-y-8  rounded-xl" />
                </div>
                <h1 className="text-4xl font-semibold items-center text-center mt-10 text-white">
                  Find <span className="bg-gradient-to-r from-indigo-200 to-indigo-400 text-transparent bg-clip-text ">Movies</span> You Will Enjoy Without The Hassle!
                </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </header>

              <section className="section-two">
                <div>
                  
                    
                    {trendingMovies.length > 0 ? (
                      <div>
                    <h2 className="flex justify-center text-white text-3xl pb-12 pt-18">Trending</h2>
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 px-8">
  {trendingMovies.slice(0, 5).map((movie, index) => (
    <li key={movie.$id} className="relative flex items-end justify-center transition-transform duration-300 hover:scale-105">
      {/* Image */}
      <Link to={`/movie/${movie.movie_id}`}>
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="rounded-3xl w-[200px] h-[300px] object-cover z-10 shadow-2xl"
      />
      </Link>
      {/* Large number underneath the image */}
      <p className="absolute text-[120px] font-bold text-white z-0 top-10 right-50 ">
        {index + 1}
      </p>
    </li>
  ))}
</ul>
                      </div>
                     ): (
                    <h1>Oops!</h1>)}
                 <section id="Movies">
                  <h2 className="flex justify-center text-white text-3xl pb-12 pt-18">Popular</h2>

                  <div className="pl-[100px] pr-[100px] grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 p-4">
                    {isLoading ? (
                      <p className="text-white text-xl  text-center"><Loading/></p>
                    ) : errorMessage ? (
                      <p className="text-red-500 text-xl text-center">{errorMessage}</p>
                    ) : (
                     
                      moviesList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                        
                      ))
                    )}
                  </div>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  </section>
                  <section id="Tv-shows">
                    <h2 className="flex justify-center text-white text-3xl pb-12 pt-4">Latest Shows</h2>
                  <div className="pl-[100px] pr-[100px] grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 p-4">

                     {isLoading ? (
                      <p className="text-white text-xl  text-center"><Loading/></p>
                    ) : errorMessage ? (
                      <p className="text-red-500 text-xl text-center">{errorMessage}</p>
                    ) : (
                       tvSeriesList.map((show)=>(
                           
                              <TvSeries key={show.id} show={show} />
                
                       ))   
                     
                    )}
                    </div>
                           
                      
                  </section>
                </div>


                </section>
              
            </div>
          </main>
        } />

        {/* Description Route */}
        <Route path='/series/watch/:id' element={<SeriesWatchPage tvSeriesList={tvSeriesList}/>} />
        <Route path='/series/:id' element={<DescriptionForShows tvSeriesList={tvSeriesList}/>} />
        <Route path='/movie/:id'  element={<Description moviesList={moviesList} />}/>
        <Route path='/watch/:id'  element={<WatchPage moviesList={moviesList} />}/>

      </Routes>
    </Router>
  );
};

export default App;