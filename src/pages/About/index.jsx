import React from 'react';
// Replace the import path with your actual image path
import about from '/img/about.jpg';
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <div className=" flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex mt-[4rem]">
                <div className="bg-cover bg-center md:w-1/2" style={{ backgroundImage: `url(${about})` }}>
                    {/* Image will go here, you can change it later */}
                </div>
                <div className="p-4 md:p-8 md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="mb-4">
                        We are a team passionate about delivering quality products and services. Our journey began in [year], with the mission to [mission]. Our team is composed of talented individuals from diverse backgrounds, all united by a common goal: [common goal].
                    </p>
                    <p>
                        Over the years, we have achieved [achievement] and have been recognized for [recognition]. We are committed to continuing our quest for excellence, always pushing the boundaries of innovation.
                    </p>
                    <div className="mt-4">
                        <Link to="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
