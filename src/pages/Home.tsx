import React from "react";

const Home: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    Welcome to SkiGuru!
                </h1>
                <p className="text-lg text-gray-600">
                    Your ultimate guide to skiing adventures.
                </p>
            </div>
        </div>
    );
};

export default Home;
