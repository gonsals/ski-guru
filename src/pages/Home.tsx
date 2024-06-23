import React, { useEffect, useState } from "react";
import { getAllInstructors } from "../services/instructorService";

interface Profile {
    name: string;
    bio: string;
    experience: string;
    certifications: string;
    photoURL?: string;
    rating?: number;
}

const Home: React.FC = () => {
    const [instructors, setInstructors] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const instructorList = await getAllInstructors();
                setInstructors(instructorList);
            } catch (err) {
                setError("Failed to load instructors");
            } finally {
                setLoading(false);
            }
        };
        fetchInstructors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Instructors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.map((instructor, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-lg"
                    >
                        <img
                            className="w-full h-48 object-cover rounded-md mb-4"
                            src={instructor.photoURL}
                            alt={`${instructor.name}'s profile`}
                        />
                        <h2 className="text-2xl font-semibold mb-2">
                            {instructor.name}
                        </h2>
                        <p className="mb-2">{instructor.bio}</p>
                        <p className="mb-2">
                            Experience: {instructor.experience}
                        </p>
                        <p className="mb-2">
                            Certifications: {instructor.certifications}
                        </p>
                        {instructor.rating && (
                            <p>Rating: {instructor.rating}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
