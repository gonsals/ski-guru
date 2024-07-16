import { Profile_Instructor_type } from "../types/Profile";
import { User } from "firebase/auth";
const InstructorProfile = (
    instructor: Profile_Instructor_type,
    currentUser: User | null,
    id: string | undefined
) => {
    return (
        <div className="max-w-4xl mx-auto mt-2 p-8 bg-white shadow-lg rounded-lg">
            <div className="flex">
                <div className="relative w-20 h-20">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={instructor.photoURL}
                        alt="Profile image"
                    />
                    <div className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                        <div className=" bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                            <button className="text-white text-xl mb-1">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className=" text-base font-semibold text-gray-900 mb-2">
                {instructor.name}
            </h1>
            <p className="text-gray-700 mb-6">{instructor.bio}</p>
            {currentUser?.uid === id && (
                <div className="flex justify-center mb-8 gap-2">
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full  w-full">
                        Edit Profile
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full  w-full">
                        Share Profile
                    </button>
                </div>
            )}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Experience
                </h2>
                {instructor.experience.map((exp, index) => (
                    <div className=" flex gap-4" key={index}>
                        <img
                            className=" w-12 h-12 mt-2"
                            src="/icons/pwa-192x192.png"
                            alt="prueba"
                        />
                        <div className="mb-6">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                <span className="font-semibold">
                                    {exp.title}
                                </span>{" "}
                                - {exp.company}
                                <br />
                                {exp.startDate} - {exp.endDate}
                                <br />
                                {exp.location}
                                <br />
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
                {currentUser?.uid === id && (
                    <div className="flex justify-center">
                        <button className=" border border-slate-600/opacity-20 py-2 px-4 rounded-full w-full">
                            Add Experience
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Recommendations
                </h2>
                <div className="flex border-b border-gray-300 mb-4">
                    <button className="inline-block text-blue-600 border-b-2 border-blue-600 pb-2">
                        Received
                    </button>
                    <button className="inline-block text-gray-600 pb-2 ml-4">
                        Given
                    </button>
                </div>

                {/* {instructor.recommendations.map((rec, index) => (
            <div key={index} className="flex mb-4">
                <img
                    className="w-12 h-12 object-cover rounded-full mr-4"
                    src={rec.photoURL}
                    alt={`${rec.name}'s profile`}
                />
                <div>
                    <p className="font-semibold">
                        {rec.name}{" "}
                        <span className="text-gray-600">
                            · Connected
                        </span>
                    </p>
                    <p className="text-gray-600">{rec.company}</p>
                    <p className="text-gray-700">{rec.text}</p>
                </div>
            </div>
        ))} */}
                {currentUser?.uid === id && (
                    <div className="flex justify-center">
                        <button className="border border-slate-600/opacity-20 py-2 px-4 rounded-full w-full">
                            Add Recommendation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorProfile;
