import React from 'react';
// Replace with your actual image import
import ContactImage from '/img/contact.jpg';

const index = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-4">
            <div className="md:w-1/2">
                <img src={ContactImage} alt="Contact Us" className="max-w-sm mx-auto" />
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2 max-w-lg mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your message here" rows="3"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default index;
