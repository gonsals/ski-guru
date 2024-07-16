import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile_Instructor_type, Profile_Client_type } from "../types/Profile";
import { getInstructorProfile } from "../services/instructorService";
import { getClientProfile } from "../services/clientService";
import { useAuth } from "../context/AuthContext";
import InstructorProfile from "../components/InstructorProfile";
import ClientProfile from "../components/ClientProfile";

const Profile: React.FC = () => {
    const { currentUser } = useAuth();
    const { userType, id } = useParams<{ id: string; userType: string }>();
    const [instructor, setInstructor] =
        useState<Profile_Instructor_type | null>(null);
    const [client, setClient] = useState<Profile_Client_type | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (id) {
                    if (userType === "client") {
                        const clientProfile = await getClientProfile(id);
                        setClient(clientProfile);
                    } else {
                        const instructorProfile = await getInstructorProfile(
                            id
                        );
                        setInstructor(instructorProfile);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Error fetching profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id, userType]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                {error}
            </div>
        );
    }

    if (userType === "instructor" && instructor) {
        return InstructorProfile(instructor, currentUser, id);
    }

    if (userType === "client" && client) {
        return ClientProfile(client);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            Profile not found
        </div>
    );
};

export default Profile;
