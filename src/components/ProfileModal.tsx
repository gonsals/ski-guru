import React, { useEffect, useState } from "react";
import { Profile_Client_type, Profile_Instructor_type } from "../types/Profile";
import { getInstructorProfile } from "../services/instructorService";
import { useAuth } from "../context/AuthContext";
import { getClientProfile } from "../services/clientService";
import { logout } from "../services/authService";

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { currentUser, userProfile } = useAuth();
    const [profile, setProfile] = useState<
        Profile_Instructor_type | Profile_Client_type | null | undefined
    >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (currentUser?.uid) {
                    let fetchedProfile;
                    if (userProfile?.role === "instructor") {
                        fetchedProfile = await getInstructorProfile(
                            currentUser.uid
                        );
                    } else if (userProfile?.role === "client") {
                        fetchedProfile = await getClientProfile(
                            currentUser.uid
                        );
                    }
                    setProfile(fetchedProfile);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser, userProfile?.role]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-lg w-full">
                    <div className="flex justify-center items-center h-64">
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-lg w-full">
                    <button
                        className="absolute top-2 right-2 text-gray-600 text-2xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <div className="flex justify-center items-center h-64">
                        No profile found.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-lg w-full">
                <button
                    className="absolute top-2 right-2 text-gray-600 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <button
                    className="absolute top-2 left-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                    onClick={async () => {
                        try {
                            await logout();
                            onClose(); // Close modal after logout
                        } catch (error) {
                            console.error("Logout error:", error);
                        }
                    }}
                >
                    Logout
                </button>
                <div className="flex justify-center mb-8">
                    <img
                        className="max-h-40 object-contain rounded-full"
                        src={profile.photoURL}
                        alt="Profile"
                    />
                </div>
                <h1 className="text-3xl font-bold mb-4">
                    {profile.name}'s Profile
                </h1>
                <div className="mb-4">
                    <p>
                        <span className="font-semibold">Bio:</span>{" "}
                        {profile.bio}
                    </p>
                </div>
                {profile.role === "instructor" && (
                    <>
                        <div className="mb-4">
                            <p>
                                <span className="font-semibold">
                                    Experience:
                                </span>{" "}
                                {
                                    (profile as Profile_Instructor_type)
                                        .experience
                                }
                            </p>
                        </div>
                        <div className="mb-4">
                            <p>
                                <span className="font-semibold">
                                    Certifications:
                                </span>{" "}
                                {
                                    (profile as Profile_Instructor_type)
                                        .certifications
                                }
                            </p>
                        </div>
                    </>
                )}
                {profile.role === "client" && (
                    <div className="mb-4">
                        <p>
                            <span className="font-semibold">Preferences:</span>{" "}
                            {(profile as Profile_Client_type).preferences}
                        </p>
                    </div>
                )}
                <div className="mb-4">
                    <p>
                        <span className="font-semibold">Role:</span>{" "}
                        {profile.role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
