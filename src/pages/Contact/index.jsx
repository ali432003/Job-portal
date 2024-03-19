import React from "react";
import { useState } from "react";
// Replace with your actual image import
import ContactImage from "/img/contact.jpg";
import InputField from "../../Compoenets/InputField";
import Nav from "../../Compoenets/Nav";

const index = (props) => {
  return (
    <>
      <Nav name={props.name} img={props.img} />
      {props.sign ? (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-4">
          <div className="md:w-1/2">
            <img
              src={ContactImage}
              alt="Contact Us"
              className="max-w-sm mx-auto"
            />
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2 max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Submit Your Reviews
            </h2>
            <form
              action="https://formsubmit.co/alifarhaan800@gmail.com"
              method="POST"
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <InputField
                  autoFocus={true}
                  required
                  name="name"
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <InputField
                  required
                  name="email"
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  className="mt-1  block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  id="message"
                  placeholder="Your message here"
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-purple-500 hover:bg-blue-700 text-white mt-none font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <img src="/img/Tan 2_0.gif" className="flex mx-auto lg:w-1/2" />
          <p className="flex text-xl text-slate-500 font-bold  justify-center mt-2">
            You have to sign up first
          </p>
        </>
      )}
    </>
  );
};

export default index;
