import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { button } from "@material-tailwind/react";
import Loading from "./LoadingPage";
const SeriesWatchPage = ()=>{

const {id} = useParams();
const [show, setShow] = useState(null)
const [selectedSeason, setSelectedSeason] = useState(null);
const [episodes, setEpisodes] = useState([]);
const [selectedEpisode, setSelectedEpisode] = useState(null);


useEffect(() => {
  const fetchEpisodes = async () => {
    if (!selectedSeason) return;

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${apiKey}&language=en-US`
      );
      setEpisodes(response.data.episodes);
      console.log("Episodes for Season", selectedSeason, response.data.episodes);
    } catch (err) {
      console.error("Failed to fetch episodes:", err);
      console.log("Fetching episodes for season:", selectedSeason);

    }
  };

  fetchEpisodes();
}, [selectedSeason, id]);


useEffect(()=>{
const fetchData = async () => {
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
})}
catch(err) {
        console.log(`an error occured: ${err}`)
    }
}

  fetchData();
}, [id])
if (!show) return <div><Loading/></div>;


    return(
<div>

          <div className="bg-gradient-to-b from-[#948979] to-[#393E46] justify-center align-center items-center height-screen width-screen">
            <h1 className="text-4xl font-bold text-center mb-6 pt-20 pb-20">{show.name}</h1> 
         
{selectedEpisode && (
  <div className="w-full aspect-video mb-6 justify-center">
    <iframe
      src={`https://vidsrc.net/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`}
      allowFullScreen
      className="w-[70%] h-[70%] rounded-md border border-gray-500"
    ></iframe>
  </div>
)}

{show.seasons
  .filter((season) => season.season_number > 0)
  .map((season) => {
    const isActive = selectedSeason === season.season_number;

    return (
      <div>
      <button
         key={season.id}    
         onClick={() => {
          setSelectedSeason(season.season_number);
          setSelectedEpisode(null); // Reset episode on season change
        }}
      className={`px-6 py-2 m-2 rounded-xl justify-center items-center 
  ${isActive ? "bg- text-white" : "bg-gray-600 text-white"}
`}
      >
        Season {season.season_number}
      </button>
      </div>
    );
  })}

             {episodes.map((ep) => {
                 const isActive = selectedEpisode === ep.episode_number;
                return(
                
  <button
    key={ep.id}div
    onClick={() => setSelectedEpisode(ep.episode_number)}
     className={`block w-full text-left p-2 border-b border-gray-300 
        ${isActive ? "bg-indigo-100 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"}
        `}
  >
    Episode {ep.episode_number}: {ep.name}
  </button>
)})}

        </div>
        </div>
    )
}

export default SeriesWatchPage;