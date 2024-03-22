import React, { useEffect, useState } from "react";
import Nav from "../../Compoenets/Nav";
import Footer from "../../Compoenets/Footer";
import MainCard from "../../Compoenets/MainCard";
import { Box, Divider, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import InputField from "../../Compoenets/InputField";
import SearchIcon from '@mui/icons-material/Search';

const Index = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // Search function for API fetched jobs
  const searchApiJobs = (term) => {
    const filteredApiJobs = props.data.filter(job =>
      job.category.name.toLowerCase().includes(term.toLowerCase())
    );
    return filteredApiJobs;
  };

  // Search function for user-added jobs
  const searchUserJobs = (term) => {
    const filteredUserJobs = props.userData.filter(job =>
      job.title.toLowerCase().includes(term.toLowerCase())
    );
    return filteredUserJobs;
  };

  useEffect(() => {
    if (searchTerm) {
      
      const apiResults = searchApiJobs(searchTerm);
      
      const userResults = searchUserJobs(searchTerm);
      
      const combinedResults = [...apiResults, ...userResults];
      setSearchResults(combinedResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, props.data, props.userData]);

  return (
    <>
      <Nav name={props.name} sign={props.sign} img={props.img} />
      <Box component={"div"} className="flex lg:flex-row flex-col justify-between my-[2rem] mx-[2rem]">
        <Typography
          variant="h2"
          className="text-slate-500 lg:text-xl  text-lg"
        >
          Find a Suitable Job
        </Typography>
        <InputField 
          type={"text"} 
          placeholder={"Find a Job"} 
          style={{border:"1px solid #64748b"}} 
          onChange={(e)=>{setSearchTerm(e.target.value)}}
          icon={<SearchIcon/>}
        />
      </Box>
      <Divider />

      {searchTerm && (
        <Box component={"h6"} className="mx-[4rem] lg:my-[2rem] text-[#475569] flex gap-2" >
          Search Results for <Box className="text-purple-500 font-bold italic">{searchTerm}</Box>
        </Box>
      )}

      {searchResults.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 5, md: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          {searchResults.map((job, index) => (
            <Grid item sm={6} md={4} lg={4} key={index}>
              <MainCard
                title={job.title || job.category?.name} // Use API title or user title
                feas={job.jobFeseability || job.feas} // Adjust for different field names
                type={job.jobType || job.type} // Adjust for different field names
                apply={job.applyEmail || job.email} // Adjust for different field names
                comp={job.companyName}
                pos={job.position}
                desc={job?.Userdesc || job.category?.description} // Adjust for different field names
                city={job.city}
                hash={job.hashTags || job.hashtags} // Adjust for different field names
                skill={job.skills}
                views={job.views}
                main={job.desc} // Assuming this is the main description
                location = {job?.location}
                exp={job?.experience}
                load={props.load}
                cardkey={index}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
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
            </Grid>))}
        </Grid>
      )}

      <Footer />
    </>
  );
};

export default Index;
