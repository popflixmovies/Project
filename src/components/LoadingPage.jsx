import React from "react";

const Loading = () => {
 return (
    <div className="min-h-screen w-screen flex flex-col pr-[190px] justify-center items-center bg-transparent ">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-4">Loading...</p>
    </div>
  );

};



export default Loading;
