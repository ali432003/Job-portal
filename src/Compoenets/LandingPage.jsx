import React from "react";
import bg from "/img/about.webp"

import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <div
      className=" pb-[2rem] text-purple-800 flex justify-center flex-col"
      style={{backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url(${bg})`,height:"100vh" }}
    >
      <div className="text-start pt-10 md:pt-20 mx-[2rem]">
        <h1 className="text-4xl md:text-6xl my-3 font-bold">
          Dig. Apply, <br />
          Prepare Your Future.
        </h1>
        <p className="text-xl my-2 font-bold md:text-2xl text-slate-950 text-ellipsis overflow-hidden">
          Find the job that fits your lifestyle
        </p>
          <span className="text-purple-800 font-bold text-3xl">{" "+ props.signUpContent?props.signUpContent:" "}</span>
      </div>

      <div className=" mx-[2rem] mt-4">
        <Link to="/jobs">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Explore Opportunities
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
