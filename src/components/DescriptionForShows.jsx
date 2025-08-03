import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./LoadingPage";
const DescriptionForShows = () => {

  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      try {
        const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`,
  headers: {accept: 'application/json'}
};

axios.request(options)
.then((res)=>{
    setShow(res.data)
})

      } catch (err) {
        console.error("Failed to fetch show:", err.message);
      }
    };

    fetchShow();

  }, [id]);

  if (!show) return <div><Loading/></div>
const {poster_path,name,vote_average, overview, last_air_date} =show
  return (
   <div className="w-screen min-h-screen bg-gradient-to-b from-[#948979] to-[#393E46] text-white overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center mb-6 pt-10 pb-10">{name}</h1>

      <div className="flex flex-col items-center gap-6">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={name}
          className="rounded-3xl w-[350px] h-[500px] shadow-lg"
        />

        <p className="text-lg text-center px-4 md:px-20 text-white">{overview}</p>

        <p className="text-sm text-gray-400 text-white">Release Date: {last_air_date}</p>

        <div className="flex items-center gap-2">
          <img src="/star-2768.svg" alt="Star Icon" className="h-4 w-4" />
          <p className="text-lg">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>
<Link to={`/series/watch/${id}`}>
        <button className="mt-4 mb-8 bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded-full">
          Watch Now
        </button>
        
</Link>
      </div>
    </div>
  );
};

export default DescriptionForShows;
