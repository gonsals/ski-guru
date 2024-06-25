import { db } from "../firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { Profile_Instructor_type } from "../types/Profile";

const db_name = "instructors";

export const createInstructorProfile = async (
    uid: string,
    profile: Profile_Instructor_type
) => {
    const profileRef = doc(db, db_name, uid);
    await setDoc(profileRef, profile, { merge: true });
};

export const getInstructorProfile = async (uid: string) => {
    const profileRef = doc(db, db_name, uid);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
        return profileSnap.data() as Profile_Instructor_type;
    } else {
        throw new Error("No such profile!");
    }
};

export const getAllInstructors = async () => {
    const instructorsRef = collection(db, db_name);
    const querySnapshot = await getDocs(instructorsRef);
    const instructors: Profile_Instructor_type[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data() as Profile_Instructor_type;
        const uid = doc.id;
        const instructorWithUid: Profile_Instructor_type = {
            ...data,
            uid: uid,
        };
        instructors.push(instructorWithUid);
    });
    return instructors;
};
