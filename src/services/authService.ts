import { auth, db, storage } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Profile_Instructor_type, Profile_Client_type } from "../types/Profile";

export const register = async (
    email: string,
    password: string,
    role: string,
    sport: string,
    photoFile?: File
) => {
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    let photoURL =
        "https://firebasestorage.googleapis.com/v0/b/skiguru-ce4a4.appspot.com/o/profile_images%2Fdefault%2Fdefault-profile.jpg?alt=media&token=792f8ff0-2918-496c-a926-d055200262ab";

    if (photoFile) {
        const storageRef = ref(
            storage,
            `profile_images/${user.uid}/${photoFile.name}`
        );
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
    }

    const displayName = email.split("@")[0];

    if (role === "instructor") {
        const bio = "Me encanta esquiar.";
        const experience = "He trabajado dos temporadas en los Pirineos.";
        const certifications = "TD1";

        const profile: Profile_Instructor_type = {
            name: displayName,
            bio,
            photoURL,
            role,
            experience,
            certifications,
            sport,
        };

        await setDoc(doc(db, "instructors", user.uid), profile);
    } else if (role === "client") {
        const bio = "Soy cliente";
        const preferences = "Preferencias del cliente";

        const profile: Profile_Client_type = {
            name: displayName,
            bio,
            photoURL,
            role,
            preferences,
            sport,
        };

        await setDoc(doc(db, "clients", user.uid), profile);
    }
    console.log("service sport :", sport);
    return user;
};

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};
