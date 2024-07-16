export interface Experience {
    title: string;
    company: string;
    startDate: string;
    endDate: string | undefined;
    location: string;
    description: string;
}

export interface Profile_Base {
    uid?: string;
    name: string;
    bio: string;
    photoURL: string;
    role: string;
    sport: string;
}

export interface Profile_Instructor_type extends Profile_Base {
    experience: Array<Experience>;
    certifications: string;
}

export interface Profile_Client_type extends Profile_Base {
    preferences: string;
}
