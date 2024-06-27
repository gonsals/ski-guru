import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile_Instructor_type } from "../types/Profile";
import { getInstructorProfile } from "../services/instructorService";

const InstructorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [instructor, setInstructor] =
        useState<Profile_Instructor_type | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorProfile = async () => {
            try {
                if (id) {
                    const instructorProfile = await getInstructorProfile(id);
                    setInstructor(instructorProfile);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching instructor profile:", error);
                setLoading(false);
            }
        };

        fetchInstructorProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    if (!instructor) {
        return (
            <div className="flex items-center justify-center h-screen">
                Instructor not found
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
            <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={instructor.photoURL}
                        alt="Profile image"
                    />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
                {instructor.name}'s Profile
            </h1>
            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold">Bio:</span> {instructor.bio}
                </p>
            </div>
            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold">Experience:</span>{" "}
                    {instructor.experience}
                </p>
            </div>
            <div className="text-center mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold">Certifications:</span>{" "}
                    {instructor.certifications}
                </p>
            </div>
        </div>
    );
};

export default InstructorProfile;
