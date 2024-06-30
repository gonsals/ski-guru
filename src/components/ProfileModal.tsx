import React, { useEffect, useState } from "react";
import { Profile_Instructor_type } from "../types/Profile";
import { getInstructorProfile } from "../services/instructorService";
import { useAuth } from "../context/AuthContext";

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [instructor, setInstructor] =
        useState<Profile_Instructor_type | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorProfile = async () => {
            try {
                if (currentUser?.uid) {
                    const instructorProfile = await getInstructorProfile(
                        currentUser.uid
                    );
                    setInstructor(instructorProfile);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching instructor profile:", error);
                setLoading(false);
            }
        };

        fetchInstructorProfile();
    }, [currentUser]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-lg w-full">
                <button
                    className="absolute top-2 right-2 text-gray-600 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        Loading...
                    </div>
                ) : (
                    instructor && (
                        <div>
                            <div className="flex justify-center mb-8">
                                <img
                                    className="max-h-40 object-contain rounded-full"
                                    src={instructor.photoURL}
                                    alt="Profile image"
                                />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">
                                {instructor.name}'s Profile
                            </h1>
                            <div className="mb-4">
                                <p>
                                    <span className="font-semibold">Bio:</span>{" "}
                                    {instructor.bio}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p>
                                    <span className="font-semibold">
                                        Experience:
                                    </span>{" "}
                                    {instructor.experience}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p>
                                    <span className="font-semibold">
                                        Certifications:
                                    </span>{" "}
                                    {instructor.certifications}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p>
                                    <span className="font-semibold">Role:</span>{" "}
                                    {instructor.role}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
