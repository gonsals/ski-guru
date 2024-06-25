import { db } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { Profile_Client_type } from "../types/Profile";

const db_name = "clients";

export const createClientProfile = async (
    uid: string,
    profile: Profile_Client_type
) => {
    const profileRef = doc(db, db_name, uid);
    await setDoc(profileRef, profile, { merge: true });
};

export const getClientProfile = async (uid: string) => {
    const profileRef = doc(db, db_name, uid);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
        return profileSnap.data() as Profile_Client_type;
    } else {
        throw new Error("No such profile!");
    }
};

export const getAllClients = async () => {
    const instructorsRef = collection(db, db_name);
    const querySnapshot = await getDocs(instructorsRef);
    const instructors: Profile_Client_type[] = [];
    querySnapshot.forEach((doc) => {
        instructors.push(doc.data() as Profile_Client_type);
    });
    return instructors;
};
