import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Profile_Instructor_type, Profile_Client_type } from "../types/Profile";

export const getProfile = async (
    uid: string,
    role: string
): Promise<Profile_Instructor_type | Profile_Client_type | null> => {
    try {
        const docRef = doc(
            db,
            role === "instructor" ? "instructors" : "clients",
            uid
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as
                | Profile_Instructor_type
                | Profile_Client_type;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching profile: ", error);
        throw error;
    }
};

export const updateProfile = async (
    uid: string,
    profile: Profile_Instructor_type | Profile_Client_type
): Promise<void> => {
    try {
        const docRef = doc(
            db,
            profile.role === "instructor" ? "instructors" : "clients",
            uid
        );
        await setDoc(docRef, profile);
    } catch (error) {
        console.error("Error updating profile: ", error);
        throw error;
    }
};
