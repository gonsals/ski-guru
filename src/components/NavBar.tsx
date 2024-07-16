import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";

const Navbar: React.FC = () => {
    const { currentUser, userProfile } = useAuth();

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white">
                    <Link to="/" className="mr-4">
                        Home
                    </Link>
                    {currentUser && (
                        <button onClick={() => logout()}>Exit</button>
                    )}
                </div>
                {currentUser ? (
                    <>
                        <Link
                            to={`profile/${userProfile?.role}/${currentUser.uid}`}
                        >
                            Profile
                        </Link>
                    </>
                ) : (
                    <div className="text-white">
                        <Link to="/login" className="mr-4">
                            Login
                        </Link>
                        <Link to="/signup" className="mr-4">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
