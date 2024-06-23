import React, { useState, useEffect } from "react";
import {
    getInstructorProfile,
    createInstructorProfile,
} from "../services/instructorService";
import { useAuth } from "../context/AuthContext";
import { Profile_type } from "../types/Profile";

const Profile: React.FC = () => {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState<Profile_type>({
        name: "",
        bio: "",
        experience: "",
        certifications: "",
        photoURL: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                try {
                    const profileData = await getInstructorProfile(
                        currentUser.uid
                    );
                    if (profileData) {
                        setProfile(profileData);
                    }
                    setLoading(false);
                } catch (err) {
                    setError("Failed to load profile");
                    setLoading(false);
                }
            }
        };
        fetchProfile();
    }, [currentUser]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (currentUser) {
                await createInstructorProfile(currentUser.uid, profile);
                alert("Profile updated successfully");
            }
        } catch (err) {
            setError("Failed to update profile");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="p-4 max-w-md w-full bg-white shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Instructor Profile</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-1">Bio:</label>
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows={4}
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1">Experience:</label>
                    <textarea
                        name="experience"
                        value={profile.experience}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows={4}
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1">Certifications:</label>
                    <textarea
                        name="certifications"
                        value={profile.certifications}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows={4}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
