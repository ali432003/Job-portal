import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

const InputField = (props) => {
  const [eye, setEye] = useState(false);
  const inputType = eye ? "text" : props.type;
  return (
    <div className="flex flex-col mt-[1rem] gap-y-1 relative">
      <label className="block relative">
        <span className="text-xl font-medium text-slate-800">
          {props.label}
        </span>
        <input
          // variant="outlined"
          autoComplete="true"
          {...props}
          type={inputType}
          className="mt-1  block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        {props.type === "password" ? (
          eye ? (
            <VisibilityOff
              onClick={() => {
                setEye(!eye);
              }}
              className="absolute top-10 right-5"
            />
          ) : (
            <Visibility
              onClick={() => {
                setEye(!eye);
              }}
              className="absolute top-10 right-5"
            />
          )
        ) : (
          ""
        )}
      </label>
      <Box
        component={"div"}
        sx={{ position: "absolute", top: 5, right: 0,padding:"0.32rem",borderRadius:"4px" }}
      >
        {props.icon}
      </Box>
    </div>
  );
};

export default InputField;
