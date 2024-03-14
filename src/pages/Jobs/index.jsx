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
  console.log(props.userData)
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
      <Grid
        
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        alignItems="center"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.load ? (
          <Stack sx={{ color: "grey.500" }} mt={10} spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          props.data.map((job, index) => {
            return (
              <>
                <Grid item xs={4} key={index}>
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
                  />
                </Grid>
                {/* {userJobs && (
                  <Grid>
                    <MainCard 
                      title={userJobs.title}
                      feas={userJobs.feas}
                      type={userJobs.type}
                      apply={userJobs.email}
                      // createAt={job.createdAt}
                      comp={userJobs.companyName}
                      pos={userJobs.position}
                      desc={userJobs.desc}
                      city={userJobs.city}
                      hash={userJobs.hashtags}
                      skill={userJobs.skills}
                      // views={job.views}
                      // main={job.desc}
                      load={props.load}
                    />
                  </Grid>
                )} */}
              </>
            );
          })
        )}
      </Grid>

      {/* <Outlet /> */}
      <Footer />
    </>
  );
};

export default index;
