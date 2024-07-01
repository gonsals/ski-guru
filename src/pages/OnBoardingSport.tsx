import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import { login, register } from "../services/authService";

const OnboardingSport: React.FC = () => {
    const { email, password, photo, role, setSport, error, sport } =
        useOnboarding();
    const navigate = useNavigate();

    const handleSportSelection = async (sportSelection: string) => {
        setSport(sportSelection);
        try {
            await register(email, password, role, sport, photo || undefined);
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error("Failed to complete onboarding and register:", err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Create your profile
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <p className="text-center mb-4">Your sport is...?</p>
                <div className="flex flex-col gap-4">
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded"
                        onClick={() => handleSportSelection("ski")}
                    >
                        Ski
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded"
                        onClick={() => handleSportSelection("snowboard")}
                    >
                        Snowboard
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded"
                        onClick={() => handleSportSelection("ski-snowboard")}
                    >
                        Ski & Snowboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingSport;
