import { db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";

export const addRating = async (instructorId: string, rating: number) => {
    const ratingsRef = collection(db, "ratings");
    await addDoc(ratingsRef, { instructorId, rating });
    const q = query(ratingsRef, where("instructorId", "==", instructorId));
    const querySnapshot = await getDocs(q);
    let total = 0;
    querySnapshot.forEach((doc) => {
        total += doc.data().rating;
    });
    const averageRating = total / querySnapshot.size;
    await updateDoc(doc(db, "instructors", instructorId), {
        rating: averageRating,
    });
};
