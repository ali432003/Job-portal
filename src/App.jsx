import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { auth, app, db } from "./firebase";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import AddJobs from "./pages/AddJobs";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import JobDetails from "./pages/JobDetails";
import axios from "axios";
import { ref, onValue, child, get } from "firebase/database";
import { ToastAlert } from "./utils/toast";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";
import { CircularProgress } from "@mui/material";

function App() {
  const [uuid, setUuid] = useState("");
  const dataOfUuid = (dataOfuid) => {
    setUuid(dataOfuid); // child to parent prop passing method
  };

  const [CurrUser, setCurrUser] = useState({});
  const [userSigned, setuserSigned] = useState(false);
  const [userJobData, setuserJobData] = useState([]);
  const [authStateLoaded, setAuthStateLoaded] = useState(false);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const readData = () => {
      try {
        onValue(ref(db, `Jobs/`), (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const objectData = Object.values(data);
            setuserJobData(objectData);
            // console.log("user job data: ", objectData);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    readData(); // jobs data

    const readDataFromDB = () => {
      try {
        onValue(ref(db, `users/${CurrUser.uid}`), (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const objectData = Object.values(data);
            setuserData(objectData);
            // console.log("user job data: ", objectData);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    readDataFromDB() // user credendials data

    
  }, [uuid, auth]); // Added auth as a dependency

  useEffect(() => {
    const  unsubscribe =  auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // Access the user's photoURL here
        setCurrUser(user);
        setuserSigned(true);
        // console.log(user.photoURL);
        // You can perform further actions with the photoURL
      } else {
        setCurrUser("");
        setuserSigned(false);
      }
      setAuthStateLoaded(true);
    });
  
    // Clean up the listener
    return () => unsubscribe();
  }, []);

  //   if (authStateLoaded) {
  //     return <LoadingSpinner />; // Replace LoadingSpinner with your loading indicator
  // }

  const [ApiData, setApiData] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchJobsApi = () => {
    setLoad(true);
    axios
      .get(
        "https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=12&pageNo=1&keyWord=&category="
      )

      .then((response) => {
        // Once the promise is resolved, the response is logged
        // console.log(response.data.data);
        setApiData(response.data.data);
        // console.log(data);
        setLoad(false);
      })
      .catch((error) => {
        // If an error occurs, it's caught and logged here
        console.log(error);
        setLoad(false);
      });
  };
  useEffect(() => {
    fetchJobsApi();
  }, []);

  if (!authStateLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Home
              name={CurrUser.displayName}
              sign={userSigned}
              img={CurrUser.photoURL}
            />
          }
        ></Route>

        {/* usage of AuthRoute route */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp setCurrUser={setCurrUser}/>} />
        </Route>
        <Route
          path="/jobs"
          element={
            <Jobs
              name={CurrUser.displayName}
              id={CurrUser.uid}
              img={CurrUser.photoURL}
              data={ApiData}
              userData={userJobData}
              load={load}
              sign={userSigned}
              // companyName={companyName}
            />
          }
        >
          <Route path="jobDetails" element={<JobDetails />} />
        </Route>

        <Route
          path="/contact"
          element={
            <Contact
              name={CurrUser.displayName}
              img={CurrUser.photoURL}
              sign={userSigned}
            />
          }
        />

        {/* usage of private route */}

        <Route element={<PrivateRoute sign={userSigned} />}>
          <Route
            path="/profile"
            element={
              <Profile
                sign={userSigned}
                name={CurrUser.displayName}
                email={CurrUser.email}
                creatdate={CurrUser.metadata?.creationTime}
                lastSeen={CurrUser.metadata?.lastSignInTime}
                img={CurrUser.photoURL}
                id={CurrUser.uid}
              />
            }
          />
          <Route
            path="/addjobs"
            element={
              <AddJobs
                onSubmit={dataOfUuid}
                name={CurrUser.displayName}
                id={CurrUser.uid}
                img={CurrUser.photoURL}
                sign={userSigned}
              />
            }
          />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
