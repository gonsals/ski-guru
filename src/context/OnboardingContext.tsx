import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextType {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    photo: File | null;
    setPhoto: (photo: File | null) => void;
    role: string;
    setRole: (role: string) => void;
    sport: string;
    setSport: (sport: string) => void;
    error: string;
    setError: (sport: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
    undefined
);

export const useOnboarding = (): OnboardingContextType => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error(
            "useOnboarding must be used within an OnboardingProvider"
        );
    }
    return context;
};

interface OnboardingProviderProps {
    children: ReactNode;
}

export const OnboardingProvider = ({
    children,
}: OnboardingProviderProps): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [role, setRole] = useState<string>("");
    const [sport, setSport] = useState<string>("");
    const [error, setError] = useState<string>("");


    return (
        <OnboardingContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                photo,
                setPhoto,
                role,
                setRole,
                sport,
                setSport,
                error,
                setError,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};
