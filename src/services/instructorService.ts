import { db } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { Profile_type } from "../types/Profile";

export const createInstructorProfile = async (
    uid: string,
    profile: Profile_type
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
            return docSnap.data() as Profile_type;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el perfil del instructor:", error);
        return null;
    }
};

export const getAllInstructors = async () => {
    const instructorsRef = collection(db, "instructors");
    const querySnapshot = await getDocs(instructorsRef);
    const instructors: Profile_type[] = [];
    querySnapshot.forEach((doc) => {
        instructors.push(doc.data() as Profile_type);
    });
    return instructors;
};
