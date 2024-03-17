import React, { useEffect, useState } from "react";
import Nav from "../../Compoenets/Nav";
import Footer from "../../Compoenets/Footer";
import MainCard from "../../Compoenets/MainCard";
import { Box, Divider, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "../../firebase";

const index = (props) => {
  const [Show, setShow] = useState(false);
  // console.log(props.userData);
  return (
    <>
      <Nav name={props.name} img={props.img} />

      <Typography
        variant="h2"
        className="text-slate-500"
        marginX={"1rem"}
        marginY={"2rem"}
      >
        Find a Suitable Job
      </Typography>
      <Divider />

      {props.load ? (
        <Stack
          sx={{ color: "grey.500", display: "flex", justifyContent: "center" }}
          mt={10}
          spacing={2}
          direction="row"
        >
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <Grid
          // key={null}
          container
          spacing={{ xs: 5, md: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          {props.data.map((job, index) => (
            <Grid item sm={6} md={4} lg={4} key={index}>
              <MainCard
                title={job.category.name}
                feas={job.jobFeseability}
                type={job.jobType}
                apply={job.applyEmail}
                createAt={job.createdAt}
                comp={job.companyName}
                pos={job.position}
                desc={job.category.description}
                city={job.city}
                hash={job.hashTags}
                skill={job.skills}
                views={job.views}
                main={job.desc}
                load={props.load}
                cardkey={index}
              />
            </Grid>
          ))}
          {props.userData.map((userJob, index) => (
            <Grid item sm={6} md={4} lg={4} key={index}>
              <MainCard
                uuid = {userJob.uuid}
                title={userJob.title}
                feas={userJob.feas}
                type={userJob.type}
                apply={userJob.email}
                // createAt={userJob.createdAt}
                comp={userJob.companyName}
                pos={userJob.position}
                desc={userJob.desc}
                city={userJob.city}
                hash={userJob.hashtags}
                skill={userJob.skills}
                location = {userJob.location}
                exp={userJob.experience}
                // views={userJob.views}
                // main={userJob.desc}
                load={props.load}
                cardkey={userJob.id}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* <Outlet /> */}
      <Footer />
    </>
  );
};

export default index;
