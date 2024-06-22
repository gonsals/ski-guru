import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface Profile {
    name: string;
    bio: string;
    experience: string;
    certifications: string;
}

export const createInstructorProfile = async (
    uid: string,
    profile: Profile
) => {
    try {
        await setDoc(doc(db, "instructors", uid), profile);
        console.log("Perfil del instructor creado correctamente.");
    } catch (error) {
        console.error("Error al crear el perfil del instructor:", error);
    }
};

export const getInstructorProfile = async (uid: string) => {
    try {
        const docRef = doc(db, "instructors", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Profile;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el perfil del instructor:", error);
        return null;
    }
};
