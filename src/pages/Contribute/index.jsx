import React from 'react';
import lappy from "/img/bg.webp"

const index = () => {
    return (
        <div className="min-h-screen flex lg:flex-row flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white  rounded-lg p-8 max-w-2xl w-full">
                <h2 className="text-3xl font-bold mb-4 text-center">Contribute to Our Project</h2>
                <p className="mb-4">
                    Our project thrives on contributions from our community. Whether you're a developer, designer, content creator, or just someone with great ideas, there's a place for you to help.
                </p>
                
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">How You Can Help</h3>
                    <ul className="list-disc pl-5">
                        <li>Code Contributions - Help us improve the project by adding new features or fixing bugs.</li>
                        <li>Documentation - Assist in creating or improving project documentation for better user understanding.</li>
                        <li>Design - Share your design skills to enhance UI/UX aspects of the project.</li>
                        <li>Feedback - Provide feedback or ideas that can help shape the project's future direction.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                    <p className="mb-4">
                        To start contributing, please visit our GitHub repository or contact us directly for more information on how you can get involved.
                    </p>
                    <div className="flex justify-center">
                        <a href="https://github.com/ali432003/Job-portal" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Visit Our GitHub
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <img src={lappy}  />
            </div>
        </div>
    );
};

export default index;
