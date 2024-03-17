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
import JobDetails from "./pages/JobDetails";
import axios from "axios";
import { ref, onValue, child, get } from "firebase/database";
import { ToastAlert } from "./utils/toast";

function App() {
  const [uuid, setUuid] = useState(""); // Corrected variable name to setUuid

  const dataOfUuid = (dataOfuid) => {
    setUuid(dataOfuid); // Corrected function name to dataOfUuid
  };

  const [CurrUser, setCurrUser] = useState({});
  // const [userSignedOut, setuserSignedOut] = useState(false);
  const [userJobData, setuserJobData] = useState([]);

  useEffect(() => {
    const readData = () => {
      onValue(ref(db, `Jobs/`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const objectData = Object.values(data);
          setuserJobData(objectData);
          // console.log("user job data: ", objectData);
        }
      });
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrUser(user);
      } else {
        console.log("Signed Out");
      }
    });

    readData();
  }, [uuid, auth]); // Added auth as a dependency

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

  return (
    <>
      <Routes>
        <Route
          index
          element={<Home name={CurrUser.displayName} img={CurrUser.photoURL} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
              // companyName={companyName}
            />
          }
        >
          <Route path="jobDetails" element={<JobDetails />} />
        </Route>
        <Route
          path="/addjobs"
          element={
            <AddJobs
              onSubmit={dataOfUuid}
              name={CurrUser.displayName}
              id={CurrUser.uid}
              img={CurrUser.photoURL}
            />
          }
        />
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
