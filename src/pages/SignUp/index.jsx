import React from "react";
import { useState, useEffect } from "react";
import { auth, app, db, imgDB } from "../../firebase";
import InputField from "../../Compoenets/InputField";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastAlert } from "../../utils/toast";
import { ref, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const SignUp = (props) => {
  const navigate = useNavigate();
  const [values, setvalue] = useState({
    fname: "",
    email: "",
    pass: "",
    img: "",
  });
  const [loader, setLoader] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      ToastAlert("No Image is choosen", "error");
      setLoader(false);
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      ToastAlert("file not supported", "error");
      return;
    }

    setvalue((prev) => ({ ...prev, img: file }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const storage = imgDB;
    const storageReference = storageRef(storage, `profile_images/${file.name}`);
    await uploadBytes(storageReference, file);
    return getDownloadURL(storageReference);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (!values.fname || !values.email || !values.pass) {
      ToastAlert("Fill All Fields", "warning");
      setLoader(false);
      return;
    }

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (userCredential) => {
        ToastAlert("Successfully Signed In", "success");

        const user = userCredential.user;
        // Upload image and get URL
        const imageUrl = await uploadImage(values.img);
        await updateProfile(user, {
          displayName: values.fname,
          photoURL: imageUrl,
        });
        // Now write user data with image URL
        writeUserData(
          user.uid,
          values.fname,
          values.email,
          values.pass,
          imageUrl
        );
        setLoader(false);
        navigate("/login");
      })
      .catch((error) => {
        ToastAlert(error.message, "error");
        setLoader(false);
        console.log("error", error);
      });
  };

  function writeUserData(userId, name, email, password, imageUrl) {
    set(ref(db, "users/" + name), {
      id: userId,
      username: name,
      email: email,
      password: password,
      profile_picture: imageUrl || "",
    })
      .then(() => {
        console.log("data is saved");
      })
      .catch((error) => {
        ToastAlert(error.message, "error");
      });
  }

  return (
    <div className="bg-purple-300 min-h-[100vh] flex place-items-center justify-center">
      <div className="flex flex-col bg-white p-[2rem] border text-start rounded-lg md:w-[50rem] md:mx-[2rem] lg:w-[50rem] lg:mx-auto w-[20rem]">
        <h1 className="text-center text-4xl font-bold text-slate-800">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            autoFocus={true}
            label={"Full Name"}
            placeholder={"Enter Your Full Name"}
            type={"name"}
            onChange={(e) => {
              setvalue((prev) => ({ ...prev, fname: e.target.value }));
            }}
          />
          <InputField
            label={"Email"}
            placeholder={"Enter Email"}
            type={"email"}
            onChange={(e) => {
              setvalue((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter Password"}
            type={"password"}
            onChange={(e) => {
              setvalue((prev) => ({ ...prev, pass: e.target.value }));
            }}
          />
          <Button
            sx={{mt:3}}
            component="label"
            role={undefined}
            variant="contained"
            color="secondary"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload a Profile Picture
            <VisuallyHiddenInput onChange={handleFileChange}  type="file" />
          </Button>
          <button
            type="submit"
            disabled={""}
            className="my-4 w-full py-2 tracking-wider font-bold text-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white"
          >
            {loader ? <CircularProgress sx={{ color: "white" }} /> : "Sign up"}
          </button>
        </form>
        <footer>
          Already have an Account{" "}
          <Link to={"/login"} className="font-bold text-violet-700">
            Login
          </Link>{" "}
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
