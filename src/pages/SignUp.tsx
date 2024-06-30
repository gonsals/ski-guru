import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [handleType, setHandleType] = useState<boolean>(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [role, setRole] = useState("client");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(email, password, role, photo || undefined);
            navigate("/");
        } catch (err) {
            setError("Failed to sign up");
        }
    };

    const handleTypeAndRol = (instructor: boolean) => {
        console.log("this is instructor", instructor);
        if (instructor) {
            setHandleType(true);
            setRole("instructor");
        } else {
            setHandleType(false);
            setRole("client");
        }
    };

    return (
        <>
            {handleType ? (
                <div className="flex justify-center items-center h-screen">
                    <form
                        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                        onSubmit={handleSubmit}
                    >
                        <nav className=" border p-3 mb-4">
                            <ul className=" flex gap-5 justify-around">
                                <li
                                    className=" cursor-pointer border-b-2 border-b-black hover:border-b-blue-500"
                                    onClick={() => handleTypeAndRol(false)}
                                >
                                    Client
                                </li>
                                <li
                                    className={
                                        (handleType
                                            ? "border-b-blue-500"
                                            : "border-b-black") +
                                        " cursor-pointer border-b-2 border-b-black hover:border-b-blue-500"
                                    }
                                    onClick={() => handleTypeAndRol(true)}
                                >
                                    Instructor
                                </li>
                            </ul>
                        </nav>
                        <h2 className="text-2xl font-bold mb-0 text-center sm:mb-4">
                            Sign Up
                        </h2>
                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 p-2 border rounded w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 p-2 border rounded w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                className="mt-1 p-2 border rounded w-full"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Title photo
                            </label>
                            <input
                                type="file"
                                className="mt-1 p-2 border rounded w-full"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <form
                        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                        onSubmit={handleSubmit}
                    >
                        <nav className=" border p-3 mb-4">
                            <ul className=" flex gap-5 justify-around">
                                <li
                                    className={
                                        (handleType
                                            ? "border-b-black"
                                            : "border-b-blue-500") +
                                        " cursor-pointer border-b-2 border-b-black hover:border-b-blue-500"
                                    }
                                    onClick={() => handleTypeAndRol(false)}
                                >
                                    Client
                                </li>
                                <li
                                    className=" cursor-pointer border-b-2 border-b-black hover:border-b-blue-500"
                                    onClick={() => handleTypeAndRol(true)}
                                >
                                    Instructor
                                </li>
                            </ul>
                        </nav>
                        <h2 className="text-2xl font-bold mb-0 text-center sm:mb-4">
                            Sign Up
                        </h2>
                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 p-2 border rounded w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 p-2 border rounded w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                className="mt-1 p-2 border rounded w-full"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default SignUp;
