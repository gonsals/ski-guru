export interface Profile_Base {
    uid?: string;
    name: string;
    bio: string;
    photoURL: string;
    role: string;
}

export interface Profile_Instructor_type extends Profile_Base {
    experience: string;
    certifications: string;
}

export interface Profile_Client_type extends Profile_Base {
    preferences: string;
}
