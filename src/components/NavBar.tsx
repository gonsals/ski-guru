import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const { currentUser, userProfile } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProfileClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white">
                    <Link to="/" className="mr-4">
                        Home
                    </Link>

                    {/* <button onClick={() => logout()}>Exit</button> */}
                </div>
                {currentUser ? (
                    <>
                        <Link
                            to={`profile/${userProfile?.role}/${currentUser.uid}`}
                        >
                            Profile
                        </Link>
                        <img
                            className="w-10 h-10 rounded-full cursor-pointer object-cover "
                            src={
                                userProfile
                                    ? userProfile.photoURL
                                    : "/images/default-profile.jpg"
                            }
                            alt="Profile"
                            onClick={handleProfileClick}
                        />
                        {isModalOpen && (
                            <ProfileModal onClose={handleCloseModal} />
                        )}
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
