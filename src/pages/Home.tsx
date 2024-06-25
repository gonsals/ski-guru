import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { getAllInstructors } from "../services/instructorService";
import { Profile_Instructor_type } from "../types/Profile";

const Home: React.FC = () => {
    const [instructors, setInstructors] = useState<Profile_Instructor_type[]>(
        []
    );

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const fetchedInstructors = await getAllInstructors();
                setInstructors(fetchedInstructors);
            } catch (error) {
                console.error("Failed to fetch instructors:", error);
            }
        };

        fetchInstructors();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
                <Link
                    key={instructor.uid}
                    to={`/instructors/${instructor.uid}`}
                >
                    <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer">
                        <img
                            className="w-full h-48 object-cover rounded-md mb-4"
                            src={instructor.photoURL}
                            alt={`${instructor.name}'s profile`}
                        />
                        <h2 className="text-2xl font-semibold mb-2">
                            {instructor.name}
                        </h2>
                        <p className="mb-2">{instructor.bio}</p>
                        {instructor.role === "instructor" && (
                            <>
                                <p className="mb-2">
                                    Experience: {instructor.experience}
                                </p>
                                <p className="mb-2">
                                    Certifications: {instructor.certifications}
                                </p>
                            </>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Home;
