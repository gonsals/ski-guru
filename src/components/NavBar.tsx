import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService"; // Asegúrate de importar correctamente tu función de logout

const Navbar: React.FC = () => {
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logout(); // Llama a la función de logout
        } catch (error) {
            console.error("Failed to log out", error);
            // Puedes manejar errores de logout aquí si es necesario
        }
    };

    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="max-w-2xl mx-auto flex justify-between items-center">
                <div>
                    <Link
                        to="/"
                        className="text-white mr-4 hover:text-gray-200"
                    >
                        Home
                    </Link>
                    <Link
                        to="/profile"
                        className={`${
                            currentUser
                                ? "text-white mr-4 hover:text-gray-200"
                                : "hidden"
                        }`}
                    >
                        Profile
                    </Link>
                </div>
                <div className="flex items-center">
                    {currentUser ? (
                        <div className="flex items-center">
                            <span className="text-white mr-4">
                                {currentUser.email?.split("@")[0].slice(0, 10)}
                                {/* Mostrar solo los primeros 10 caracteres del nombre de usuario */}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white mr-4 hover:text-gray-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white hover:text-gray-200"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
