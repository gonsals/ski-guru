import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";

const db = getFirestore();

export const createInstructorProfile = async (uid, profile) => {
    await setDoc(doc(db, "instructors", uid), profile);
};

export const getInstructorProfile = async (uid) => {
    const docRef = doc(db, "instructors", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};
