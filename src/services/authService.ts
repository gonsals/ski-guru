import { auth, db, storage } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Profile_type } from "../types/Profile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const register = async (
    email: string,
    password: string,
    photoFile: File
) => {
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    // Subir imagen al Storage
    const storageRef = ref(
        storage,
        `profile_images/${user.uid}/${photoFile.name}`
    );
    await uploadBytes(storageRef, photoFile);

    const displayName = email.split("@")[0];
    const bio = "Me encanta esquiar.";
    const experience = "He trabajado dos temporadas en los Pirineos.";
    const certifications = "TD1";

    const photoURL = await getDownloadURL(storageRef);

    const profile: Profile_type = {
        name: displayName,
        bio,
        experience,
        certifications,
        photoURL,
    };

    // Guardar perfil en Firestore
    await setDoc(doc(db, "instructors", user.uid), profile);

    return user;
};

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};
