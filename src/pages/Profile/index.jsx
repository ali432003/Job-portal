import React from "react";
import { useState, useEffect } from "react";
import Nav from "../../Compoenets/Nav";
import { Box, Divider, Grid, Tooltip, Typography } from "@mui/material";

const Profile = (props) => {
  const [hoursAgo, setHoursAgo] = useState("");

  useEffect(() => {
    const givenTimestamp = new Date(props.lastSeen);
    const currentTimestamp = new Date();

    const timeDifference = Math.round(
      (currentTimestamp - givenTimestamp) / (1000 * 60 * 60)
    );
    setHoursAgo(`${timeDifference} hours ago`);
  }, [props.lastSeen]);
  return (
    <>
      <Nav name={props.name} img={props.img}/>
      <Box component={"div"}>
        <Typography variant="h2" color={"#475569"} sx={{m:5}}>
          Profile
        </Typography>
        <Divider />

        <div
          className={`lg:w-[50rem] lg:mx-auto mx-[2rem] 
         p-[1rem] md:p-[2rem] lg:p-[3rem] mt-[2rem] rounded-xl bg-slate-100`}
        >
          <div className="flex gap-x-[2rem] lg:gap-x-[3rem] md:gap-x-[3rem]">
            <div>
              <img
                src={props.img}
                className="border rounded-full w-[10rem] md:w-[8rem] lg:w-[10rem]"
              />
            </div>
            <div className=" flex flex-col w-full">
              <div className="flex flex-col md:flex-row lg:flex-row justify-between">
                <h1 className="lg:text-3xl text-2xl uppercase">{props.name}</h1>
                <div>
                  <h2 className={`text-slate-950 text-2xl`}>
                    {props.creatdate.slice(0, 16)}
                  </h2>
                  <h2 className="text-lg">last seen {hoursAgo}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-[2rem] mt-[1.3rem]">
            <p className="text-slate-900 text-lg">{props.email}</p>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Profile;
