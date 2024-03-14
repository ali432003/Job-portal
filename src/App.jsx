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

function App() {
  const [CurrUser, setCurrUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log("User is signed in :", user);
        setCurrUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        // ...
      } else {
        console.log("Signed Out");
        // User is signed out
        // ...
      }
    });
  }, [auth]);
  const [data, setdata] = useState([]);
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
        setdata(response.data.data);
        // console.log(data);
        setLoad(false);
      })
      .catch((error) => {
        // If an error occurs, it's caught and logged here
        console.log(error);
        setLoad(false);
      });
  };
  const [userJobs, setUserJobs] = useState();
  useEffect(() => {
    fetchJobsApi();

    const starCountRef = ref(db, "jobs/" + CurrUser.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });
  }, []);

  const [companyName, setcompanyName] = useState("");
  const dataOfCompanyName = (data) => {
    // console.log(data)
    setcompanyName(data);
  };

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
              data={data}
              userData={userJobs}
              load={load}
              companyName={companyName}
            />
          }
        >
          <Route path="jobDetails" element={<JobDetails />} />
        </Route>
        <Route
          path="/addjobs"
          element={
            <AddJobs
              onSubmit={dataOfCompanyName}
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
