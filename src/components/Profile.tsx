import { useState, useEffect } from "react";
import { getInstructorProfile } from "../services/instructorService";

const Profile = ({ userId }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await getInstructorProfile(userId);
            setProfile(profileData);
        };

        fetchProfile();
    }, [userId]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.name}</h1>
            <p>{profile.bio}</p>
            <p>Rating: {profile.rating}</p>
        </div>
    );
};

export default Profile;
