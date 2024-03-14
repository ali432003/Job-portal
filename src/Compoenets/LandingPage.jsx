import React from "react";
// Assuming you have these images stored in your project's 'assets' folder
import TeamworkImage from "/img/img1.jpg";
import JobSearchImage from "/img/img2.jpg";
import HandshakeImage from "/img/img3.jpg";
import bg from "/img/bg.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className=" pb-[2rem] text-purple-800"
      style={{ backgroundColor: `black` }}
    >
      <div className="text-start pt-10 md:pt-20 mx-[2rem]">
        <h1 className="text-4xl md:text-6xl font-bold">
          Dig. Apply, <br />
          Prepare Your Future.
        </h1>
        <p className="text-xl font-bold md:text-2xl mt-8 text-slate-50 rounded-xl text-ellipsis overflow-hidden">
          Hiring Mine connects employer and job seekers, where employers are the
          source of the resources and the job seeker can find and apply for
          their targeted job.
        </p>
      </div>

      <div className="text-center mt-[2rem] md:mt-20">
        <Link to="/jobs">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Explore Opportunities
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
