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
            <div className="  flex justify-center mt-6 mb-4 mx-2">
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
            <div className=" p-4 bg-slate-200 rounded-[32px] mx-3">
                <p className="text-stone-900 text-2xl font-extrabold font-mono leading-loose text-center mb-4">
                    Instructors
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {filteredInstructors.map((instructor) => (
                        <Link
                            key={instructor.uid}
                            to={`/instructors/${instructor.uid}`}
                        >
                            <div className="p-4 bg-white rounded-[32px] shadow-lg cursor-pointer font-mono">
                                <div>
                                    <img
                                        className="w-full h-32 md:h-48 object-cover rounded-2xl mb-4"
                                        src={instructor.photoURL}
                                        alt={`${instructor.name}'s profile`}
                                    />
                                </div>
                                <div className=" flex justify-between">
                                    <div>
                                        <h2 className=" text-base md:text-2xl font-semibold mb-2">
                                            {instructor.name}
                                        </h2>
                                        <p className="mb-2">
                                            {instructor.certifications}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <button className=" text-slate-100 text-base font-normal font-['Outfit'] leading-none px-6 py-3 bg-slate-600 rounded-full">
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
