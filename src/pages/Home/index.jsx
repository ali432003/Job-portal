import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Nav from "../../Compoenets/Nav";
import Container from "@mui/material/Container";
import Footer from "../../Compoenets/Footer";
import HomeMain from "../../Compoenets/LandingPage";
import About from "../About";
import Contribute from "../Contribute";
import Contact from "../Contact";


const Home = (props) => {
  const [loader, setLoader] = useState(false);

  return (
    <>
      <Nav name={props.name} img={props.img} />

      {
        <div>
          {props.name ? (
            <>
              {/* Home ka asal saman yhan ayega */}

              <Box>
                <HomeMain />
              </Box>
            </>
          ) : (
            <Box>
              <HomeMain signUpContent={"Sign up too Add Jobs"} />
            </Box>
          )}
        </div>
      }
      <About/>
      <Contribute/>
      <Contact/>
      <Footer />
    </>
  );
};

export default Home;
