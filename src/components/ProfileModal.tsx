import React, { useState, useEffect } from "react";
import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getProfile } from "../services/getProfileService";
import { createInstructorProfile } from "../services/instructorService";
import { createClientProfile } from "../services/clientService";
import { Profile_Client_type, Profile_Instructor_type } from "../types/Profile";

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { currentUser, userProfile } = useAuth();
    const [profile, setProfile] = useState<
        (Profile_Instructor_type | Profile_Client_type) & { photoFile?: File }
    >({
        name: "",
        bio: "",
        photoURL: "",
        role: "",
        experience: "",
        certifications: "",
        preferences: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser && userProfile) {
                try {
                    const profileData = await getProfile(
                        currentUser.uid,
                        userProfile.role
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
    }, [currentUser, userProfile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setProfile((prevProfile) => ({
                ...prevProfile,
                photoFile: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (currentUser) {
                let photoURL = profile.photoURL;
                if (profile.photoFile) {
                    const storageRef = ref(
                        storage,
                        `profile_images/${currentUser.uid}/${profile.photoFile.name}`
                    );
                    await uploadBytes(storageRef, profile.photoFile);
                    photoURL = await getDownloadURL(storageRef);
                }

                const updatedProfile = {
                    ...profile,
                    photoURL,
                };

                if (userProfile?.role === "instructor") {
                    await createInstructorProfile(
                        currentUser.uid,
                        updatedProfile as Profile_Instructor_type
                    );
                } else if (userProfile?.role === "client") {
                    await createClientProfile(
                        currentUser.uid,
                        updatedProfile as Profile_Client_type
                    );
                }

                alert("Profile updated successfully");
                onClose();
            }
        } catch (err) {
            setError("Failed to update profile");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            onClose();
        } catch (err) {
            setError("Failed to log out");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <span
                    className="close text-right text-2xl cursor-pointer"
                    onClick={onClose}
                >
                    &times;
                </span>
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 p-2 border rounded w-full"
                            value={profile.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Bio:
                        </label>
                        <textarea
                            name="bio"
                            className="mt-1 p-2 border rounded w-full"
                            value={profile.bio}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {userProfile?.role === "instructor" && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    Experience:
                                </label>
                                <textarea
                                    name="experience"
                                    className="mt-1 p-2 border rounded w-full"
                                    value={
                                        (profile as Profile_Instructor_type)
                                            .experience
                                    }
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    Certifications:
                                </label>
                                <textarea
                                    name="certifications"
                                    className="mt-1 p-2 border rounded w-full"
                                    value={
                                        (profile as Profile_Instructor_type)
                                            .certifications
                                    }
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </>
                    )}
                    {userProfile?.role === "client" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Preferences:
                            </label>
                            <textarea
                                name="preferences"
                                className="mt-1 p-2 border rounded w-full"
                                value={
                                    (profile as Profile_Client_type).preferences
                                }
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Upload Photo:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded"
                    >
                        Update Profile
                    </button>
                </form>
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default ProfileModal;
