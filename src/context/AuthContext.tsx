import React, { useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Profile_Base } from "../types/Profile";

interface AuthContextType {
    currentUser: User | null;
    userProfile: Profile_Base | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<Profile_Base | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                const userProfileRef = doc(db, "instructors", user.uid);
                const userProfileDoc = await getDoc(userProfileRef);
                if (userProfileDoc.exists()) {
                    const profileData = userProfileDoc.data() as Profile_Base;
                    console.log("Instructor Profile Data:", profileData);
                    setUserProfile(profileData);
                } else {
                    const clientProfileRef = doc(db, "clients", user.uid);
                    const clientProfileDoc = await getDoc(clientProfileRef);
                    if (clientProfileDoc.exists()) {
                        const profileData =
                            clientProfileDoc.data() as Profile_Base;
                        console.log("Client Profile Data:", profileData);
                        setUserProfile(profileData);
                    } else {
                        setUserProfile(null);
                    }
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, userProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
