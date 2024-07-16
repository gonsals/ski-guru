import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllInstructors } from "../services/instructorService";
import { Profile_Instructor_type } from "../types/Profile";
import { FaSearch } from "react-icons/fa";

const Home: React.FC = () => {
    const [instructors, setInstructors] = useState<Profile_Instructor_type[]>(
        []
    );
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredInstructors = instructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="flex justify-center mt-6 mb-4">
                <div className="relative w-full max-w-md bg-slate-200 py-4 px-5 rounded-3xl">
                    <input
                        type="text"
                        className="w-full py-2 pl-4 pr-10 rounded-2xl shadow-md focus:outline-none"
                        placeholder="Search for an instructor or a resort"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-cyan-900 text-white rounded-full p-3">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className=" p-4">
                <p className="text-stone-900 text-2xl font-extrabold font-mono leading-loose text-center mb-4">
                    Instructors
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {filteredInstructors.map((instructor) => (
                        <Link
                            key={instructor.uid}
                            to={`profile/${instructor.role}/${instructor.uid}`}
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
                                        {/* <p className="mb-2">
                                            Experience: {instructor.experience}
                                        </p> */}
                                        <p className="mb-2">
                                            Certifications:{" "}
                                            {instructor.certifications}
                                        </p>
                                    </>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
