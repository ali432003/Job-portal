import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { ToastAlert } from "../utils/toast";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Nav = (props) => {
  const navigate = useNavigate();

  //mui

  const [anchorEl, setAnchorEl] = useState(null);
  const [loader, setLoader] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setLoader(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        ToastAlert("Sign-out successful", "success");
        handleClose();
        setLoader(false);
        navigate("/");
        // console.log("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        ToastAlert(error.message, "error");
        setLoader(false);
        console.log("Error occured", error);
      });
  };
  return (
    <div className="flex  w-full justify-between text-xl py-1 shadow-md px-3 sticky top-0 z-10 bg-white">
      {props.name ? (
        <>
          <Tooltip title={`${props.name.toUpperCase()}`} arrow={false}>
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}>
              <Avatar
                alt={props.name}
                src={props.img ? props.img : "/img/default.png"}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                bgcolor: "white",
                "& .MuiAvatar-root": {
                  width: 30,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "white",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
            <MenuItem onClick={handleClose}>
              <Avatar src={props.img ? props.img : "/img/default.png"} />{" "}
              {props.name}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Box component={"div"} className="flex gap-2 py-2 w-full justify-end">
            <Button variant="outlined">
              <Link to={"/"}>Home </Link>
            </Button>
            <Button variant="outlined">
              <Link to={"/jobs"}>Find Jobs</Link>
            </Button>

            <Button variant="outlined">
              <Link to={"/addjobs"}>
                Add Job <AddShoppingCartIcon />
              </Link>
            </Button>
          </Box>
        </>
      ) : (
        <div className="flex gap-3 py-2 w-full">
          <Box component={"div"} className="flex gap-2 py-2 w-full justify-end">
            <Button variant="outlined">
              <Link to={"/"}>Home </Link>
            </Button>
            <Button variant="outlined">
              <Link to={"/jobs"}>Find Jobs</Link>
            </Button>
            <Button variant="outlined">
              <Link to={"/signup"}>
                Sign Up <ExitToAppIcon />
              </Link>
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Nav;
