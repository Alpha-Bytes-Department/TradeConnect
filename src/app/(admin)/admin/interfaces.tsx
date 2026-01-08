export interface Service {
    name: string;
}

export interface LocationData {
    id: string,
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}


export interface Award {
    id: string;
    name: string;
}

export interface Activity {
    active: boolean;
    activeFor: number;
    lastUpdated: string;
}

export interface Contact {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    isPrimary: boolean;
}

export interface ContactInfo {
    office: {
        phone: string;
        email: string;
        website: string;
    };
    contacts: Contact[];
}

export interface CompanyProfile {
    name: string;
    address: string;
    country: string;
    about: string;
    contact: ContactInfo;
    services: Service[];
    awards: Award[];
    location: LocationData[];
    banner: string,
    gallery: string[],
}