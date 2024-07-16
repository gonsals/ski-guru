import React from "react";
import { Profile_Client_type } from "../types/Profile";

const ClientProfile = (client: Profile_Client_type): React.ReactNode => {
    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
            <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={client.photoURL}
                        alt="Profile image"
                    />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
                {client.name}'s Profile
            </h1>
            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold">Bio:</span> {client.bio}
                </p>
            </div>
            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold">Preferences:</span>{" "}
                    {client.preferences}
                </p>
            </div>
        </div>
    );
};

export default ClientProfile;
