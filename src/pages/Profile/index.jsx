import React from "react";
import { useState, useEffect } from "react";
import Nav from "../../Compoenets/Nav";
import { Box, Divider, Grid, Tooltip, Typography } from "@mui/material";
import defaultImg from "/img/default.png"
import InputField from "../../Compoenets/InputField";
import { ToastAlert } from "../../utils/toast";
import { db } from "../../firebase";
import { ref, onValue, child, get } from "firebase/database";


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


  const [userData,setuserData] = useState({})
  useEffect(() => {
    const readData = async () => {
      try {
        // console.log("Reading data for user ID:", props.id);
        const userRef = ref(db, `users/${props.id}`);
        const snapshot = await get(userRef); // Using get() to retrieve the data once
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("User data:", userData);
          // Assuming userData is an object, set it directly
          setuserData(userData);
        } else {
          console.log("No data found for user ID:", props.id);
        }
      } catch (error) {
        console.log("Error reading data:", error);
        ToastAlert(error.code || error.message, "error");
      }
    };
  
    readData();
  }, [props.id]);
  

  console.log(userData)
  return (
    <>
      <Nav name={props.name} sign={props.sign} img={props.img}/>
      <Box component={"div"}>
        <Typography variant="h2" color={"#475569"} sx={{m:5}}>
          Profile
        </Typography>
        <Divider />

        <div
          className={`lg:w-[50rem] lg:mx-auto mx-[2rem] 
         p-[1rem] md:p-[2rem] lg:p-[2rem] mt-[2rem] rounded-xl bg-slate-100`}
        >
          <p className="text-slate-500 text-lg mb-5">ID : {props.id}</p>
          <div className="flex gap-x-[2rem] lg:gap-x-[3rem] md:gap-x-[3rem]">
            <div>
              <img
                src={props.img ? props.img : defaultImg}
                className="border rounded-full w-[10rem] md:w-[8rem] lg:w-[10rem]"
              />
            </div>
            <div className=" flex flex-col w-full">
              <div className="flex flex-col md:flex-row lg:flex-row justify-between">
                <InputField value={props.name} disabled className="lg:text-3xl text-2xl uppercase"></InputField>
                <div>
                  <h2 className={`text-slate-950 text-2xl`}>
                    {props.creatdate.slice(0, 16)}
                  </h2>
                  <h2 className="text-lg">last seen {hoursAgo}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-[2rem] mt-[1.3rem] w-1/2">
            <InputField className="text-slate-900 text-lg" value={props.email} disabled></InputField>
            
            
          </div>
        </div>
      </Box>
    </>
  );
};

export default Profile;
