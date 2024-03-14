import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { auth, app, db } from "../../firebase";
import { ref, set } from "firebase/database";
import { ToastAlert } from "../../utils/toast";
import Nav from "../../Compoenets/Nav";
import Footer from "../../Compoenets/Footer";

const index = (props) => {
  const [data, setData] = useState({
    title: "",
    position: "",
    companyName: "",
    type: "",
    location: "",
    city: "",
    desc: "",
    skills: "",
    email: "",
    feas: "",
    hash: "",
    exp: "",
  });

  const [load, setLoad] = useState(false);

  function writeUserData() {
    set(ref(db, "Jobs/" + props.id), {
      id: props.id,
      username: props.name,
      email: data.email,
      title: data.title,
      position: data.position,
      companyName: data.companyName,
      type: data.type,
      location: data.location,
      city: data.city,
      desc: data.desc,
      skills: data.skills,
      feas: data.feas,
      hashtags: data.hash,
      experience: data.exp,
    })
      .then(() => {
        console.log("data is saved");
        ToastAlert("Job saved", "success");
        setLoad(false);
      })
      .catch((error) => {
        ToastAlert(error.message, "error");
      });
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    setLoad(true);

    if (
      !data.title ||
      !data.companyName ||
      !data.type ||
      !data.location ||
      !data.desc ||
      !data.skills ||
      !data.feas ||
      !data.position ||
      !data.city ||
      !data.hash ||
      !data.exp
    ) {
      ToastAlert("Fill All Fields", "warning");
      setLoad(false);
      return;
    }
    props.onSubmit(data.companyName)
    writeUserData();
    setLoad(false);
  };

  return (
    <>
      <Nav name={props.name} img={props.img} />
      <Typography
        variant="h2"
        className="text-slate-500"
        marginX={"1rem"}
        marginY={"2rem"}
      >
        Post Job
      </Typography>
      <Box className="bg-slate-100">
        <Box className="lg:w-[50rem] lg:mx-auto mx-[2rem] flex flex-col gap-y-5  p-4">
          <Box className="flex gap-5">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              color="secondary"
              fullWidth
              autoFocus
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.position}
                label="Position"
                color="secondary"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }));
                }}
              >
                <MenuItem value={"Senior"}>Senior</MenuItem>
                <MenuItem value={"Mid Level"}>Mid Level</MenuItem>
                <MenuItem value={"Junior"}>Junior</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="flex gap-5">
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              color="secondary"
              fullWidth
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }));
              }}
            />
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.type}
                  label="Job Type"
                  color="secondary"
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }));
                  }}
                >
                  <MenuItem value={"Full Time"}>Full Time</MenuItem>
                  <MenuItem value={"Part Time"}>Part Time</MenuItem>
                  <MenuItem value={"Internship"}>Internship</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="flex gap-5">
            <TextField
              id="outlined-basic"
              label="location"
              variant="outlined"
              fullWidth
              color="secondary"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="City Name"
              variant="outlined"
              fullWidth
              color="secondary"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }));
              }}
            />
          </Box>
          <Box className="flex gap-5">
            <TextField
              label="Description"
              multiline
              rows={6}
              fullWidth
              color="secondary"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  desc: e.target.value,
                }));
              }}
            />
          </Box>
          <Box className="flex gap-5">
            <TextField
              label="Skill Set"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  skills: e.target.value,
                }));
              }}
              fullWidth
              color="secondary"
            />
            <TextField
              type="email"
              label="Email For Application"
              fullWidth
              color="secondary"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </Box>
          <Box className="flex gap-5">
            <TextField
              type="number"
              label="Required Experience (yrs)"
              fullWidth
              color="secondary"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  exp: e.target.value,
                }));
              }}
            />
            <TextField
              label="Hashtags*"
              fullWidth
              color="secondary"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  hash: e.target.value,
                }));
              }}
            />
          </Box>

          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="feasibility"
              color="secondary"
              name="feasibility"
              value={data.feas} // Set the selected value
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  feas: e.target.value,
                }));
              }}
            >
              <FormControlLabel
                value="Onsite"
                color="secondary"
                control={<Radio />}
                label="Onsite"
              />
              <FormControlLabel
                value="Hybrid"
                control={<Radio />}
                color="secondary"
                label="Hybrid"
              />
              <FormControlLabel
                value="Remote"
                control={<Radio />}
                label="Remote"
              />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={handleSumbit}
            fullWidth
            color={`${load ? "primary" : "secondary"}`}
            variant="contained"
            disableRipple
          >
            {load ? <CircularProgress color="secondary" /> : "Post a Job"}
          </Button>
        </Box>
      </Box>
      <Divider />
      <Footer />
    </>
  );
};

export default index;
