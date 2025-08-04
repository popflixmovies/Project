import React from "react";
const Search = ({searchTerm, setSearchTerm}) =>{
    return(
        <div className="Search p-0 ">
            <img src="/PopFlix/search.svg" alt="Search-icon" className="h-[25px] w-[20px] mr-[10px]"/>
            <input onChange={(e)=>{setSearchTerm(e.target.value)}} type="text" className="input text-white text-lg w-[700px]"  placeholder="Search through millions of movies..."/>
        </div>
    )
}

export default Search;