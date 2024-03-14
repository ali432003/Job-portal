import React from "react";

const InputField = (props) => {
  return (
    <div className="flex flex-col mt-[1rem] gap-y-1">
      <label className="block">
        <span className="text-xl font-medium text-slate-800">
          {props.label}
        </span>
        <input
          autoComplete="true"  
          {...props}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
      </label>
    </div>
  );
};

export default InputField;
