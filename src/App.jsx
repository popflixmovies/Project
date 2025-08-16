import UncontrolledExample from "./components/carousel"
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/search";
import MovieCard from "./components/movieCard";
import NavbarMain from "./components/NavbarDefault";
import Description from "./components/Description";
import { Link } from 'react-router-dom';
import About from "./components/aboutUs"
import WatchPage from "./components/WatchPage";
// import {updateSearchCount, getTrendingMovies} from './appwrite'
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
           
        // if(query && data.results.length >0){
        //   await updateSearchCount(query, data.results[0]);
        // }
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
        // if(query && data.results.length >0){
        //   await updateSearchCount(query, data.results[0]);
        // }
      }
    } catch (err) {
      setErrorMessage("An error occurred while fetching movies.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // const loadTrendingMovies = async () => {
  //   try{
  //     const movies = await getTrendingMovies();
  //     setTrendingMovies(movies)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

const [trending, setTrending] = useState([]);
const [topRated, setTopRated] = useState([]);
const [popularTv, setPopularTv] = useState([]);
const [newReleases, setNewReleases] = useState([]);
const [actionMovies, setActionMovies] = useState([]);
const [comedyMovies, setComedyMovies] = useState([]);
const [dramaMovies, setDramaMovies] = useState([]);
const [horrorMovies, setHorrorMovies] = useState([]);
const [romanceMovies, setRomanceMovies] = useState([]);
const [scifiMovies, setScifiMovies] = useState([]);
const [mysteryMovies, setMysteryMovies] = useState([]);
const [familyMovies, setFamilyMovies] = useState([]);
const [documentaries, setDocumentaries] = useState([]);
const [animeMovies, setAnimeMovies] = useState([]);
const [topRatedTv, setTopRatedTv] = useState([]);
const [trendingTv, setTrendingTv] = useState([]);
const [comedyTv, setComedyTv] = useState([]);
const [dramaTv, setDramaTv] = useState([]);
const [scifiTv, setScifiTv] = useState([]);

const fetchCategory = async (url, setter) => {
  try {
    const res = await fetch(url, API_OPTIONS);
    const data = await res.json();
    setter(data.results || []);
  } catch (err) {
    console.error(err);
  }
};


useEffect(() => {
  fetchCategory(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, setTopRatedTv);
fetchCategory(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, setTrendingTv);
fetchCategory(`https://api.themoviedb.org/3/discover/tv?with_genres=35&language=en-US&page=1`, setComedyTv);
fetchCategory(`https://api.themoviedb.org/3/discover/tv?with_genres=18&language=en-US&page=1`, setDramaTv);
fetchCategory(`https://api.themoviedb.org/3/discover/tv?with_genres=10765&language=en-US&page=1`, setScifiTv);
  fetchCategory(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, setTrending);
  fetchCategory(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, setTopRated);
  fetchCategory(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, setPopularTv);
  fetchCategory(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, setNewReleases);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US&page=1`, setActionMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=35&language=en-US&page=1`, setComedyMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=18&language=en-US&page=1`, setDramaMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&page=1`, setHorrorMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=10749&language=en-US&page=1`, setRomanceMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=878&language=en-US&page=1`, setScifiMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=9648&language=en-US&page=1`, setMysteryMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=16&language=en-US&page=1`, setFamilyMovies);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=99&language=en-US&page=1`, setDocumentaries);
  fetchCategory(`https://api.themoviedb.org/3/discover/movie?with_genres=16&with_original_language=ja&language=en-US&page=1`, setAnimeMovies);
}, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

const RenderCarousel = ({ title, items, type }) => {
  return (
    <section className="mb-8">
      <h2 className="text-white text-xl font-serif font-bold px-4 mb-3">{title}</h2>
      <div className="flex sm:gap-1 md:gap-2 lg:gap-4 overflow-x-auto scrollbar-hide px-4">
        {items.map((item) =>
          type === "movie" ? (
            <div key={item.id} className="flex-shrink-0 w-[150px]">
              <MovieCard movie={item} />
            </div>
          ) : (
            <div key={item.id} className="flex-shrink-0 w-[150px]">
              <TvSeries show={item} />
            </div>
          )
        )}
      </div>
    </section>
  );
};

  // useEffect(()=>{
  //   loadTrendingMovies()
  // }, [])
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={
          <main>
            <div className="wrapper">
              <header className="pt-[0px]relative z-0">
                <NavbarMain />

 
  <section >
              <UncontrolledExample />
            </section>
                {/* <div className="relative w-screen justify-center items-center flex pt-[80px] mb-[50px]  h-[300px]" >
                  <img src="/PopFlix/two.jpg" alt="" className="inline-block  h-64 w-44 absolute z-0 top-0 left-[34%] transform -rotate-7 translate-y-8 rounded-xl" />
                  <img src="/PopFlix/one.jpg" alt="" className="inline-block h-72 w-50 absolute z-20 top-0 left-[42%] right-[47%] rounded-xl filter drop-shadow-lg" />
                  <img src="/PopFlix/three.jpg" alt="" className="inline-block h-64 w-44 absolute z-0 top-0 right-[37%] transform rotate-8 translate-y-8  rounded-xl" />
                </div>
                <h1 className="text-4xl font-semibold items-center text-center mt-10 text-white">
                  Find <span className="bg-gradient-to-r from-indigo-200 to-indigo-400 text-transparent bg-clip-text ">Movies</span> You Will Enjoy Without The Hassle!
                </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
              </header>

                <div>
                  <section className="section-two pt-4">


<RenderCarousel title="Trending Now" items={trending} type="movie" />
<RenderCarousel title="Top Rated TV Shows" items={topRatedTv} type="tv" />
<RenderCarousel title="Popular TV Shows" items={popularTv} type="tv" />
<RenderCarousel title="New Releases" items={newReleases} type="movie" />
<RenderCarousel title="Action & Adventure" items={actionMovies} type="movie" />
<RenderCarousel title="Comedy" items={comedyMovies} type="movie" />
<RenderCarousel title="Drama" items={dramaMovies} type="movie" />
<RenderCarousel title="Comedy TV Shows" items={comedyTv} type="tv" />
<RenderCarousel title="Horror & Thriller" items={horrorMovies} type="movie" />
<RenderCarousel title="Romance" items={romanceMovies} type="movie" />
<RenderCarousel title="Sci-Fi & Fantasy TV Shows" items={scifiTv} type="tv" />
<RenderCarousel title="Science Fiction & Fantasy" items={scifiMovies} type="movie" />
<RenderCarousel title="Mystery & Crime" items={mysteryMovies} type="movie" />
<RenderCarousel title="Drama TV Shows" items={dramaTv} type="tv" />
<RenderCarousel title="Family & Animation" items={familyMovies} type="movie" />
<RenderCarousel title="Documentaries" items={documentaries} type="movie" />
<RenderCarousel title="Trending TV Shows" items={trendingTv} type="tv" />
<RenderCarousel title="Anime" items={animeMovies} type="movie" />

{/* You can also fetch trending TV shows the same way and do: */}
{/* <RenderCarousel title="Latest Shows" items={tvSeriesList} type="tv" /> */}

                  
                  {/* <div>
                    {trendingMovies.length > 0 ? (
                      <div>
                    <h2 className="flex justify-center text-white text-3xl pb-12 pt-18">Trending</h2>
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 px-8">
  {trendingMovies.slice(0, 5).map((movie, index) => (
    <li key={movie.$id} className="relative flex items-end justify-center transition-transform duration-300 hover:scale-105">
      {/* Image */}


      {/* <Link to={`/movie/${movie.movie_id}`}>
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="rounded-3xl w-[200px] h-[300px] object-cover z-10 shadow-2xl"
      />
      </Link>
      {/* Large number underneath the image */}
      {/* <p className="absolute text-[120px] font-bold text-white z-0 top-10 right-50 ">
        {index + 1}
      </p> */}
    {/* </li>
  ))}
</ul>
                      </div> */}
                     {/* ): (
                    <h1>Oops!</h1>)}
                    
                    </div>  */}
                 {/* <section id="Movies">
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
                    </section>
                  <section id="Tv-shows">
                    <div className="flex justify-center text-[#EEEEEE] pb-12 pt-4 font-[roboto] text-[36px]">Latest Shows</div>
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
                           
                      */}

                  </section>            
                  </div>


              
            </div>
          </main>
        } />

        {/* Description Route */}
        <Route path='/series/watch/:id' element={<SeriesWatchPage tvSeriesList={tvSeriesList}/>} />
        <Route path='/series/:id' element={<DescriptionForShows tvSeriesList={tvSeriesList}/>} />
        <Route path='/movie/:id'  element={<Description moviesList={moviesList} />}/>
        <Route path='/watch/:id'  element={<WatchPage moviesList={moviesList} />}/>
        <Route path="/about-us/" element={<About />}/>
        

      </Routes>
    </Router>
  );
};

export default App;