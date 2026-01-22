import React from "react";
import Card from "./card";

import Link from "next/link";

interface Service {
  id: string;
  title: string;
}

interface LocationData {
  id: string,
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
}
interface Award {
  id: string;
  name: string;
}
interface Activity {
  active: boolean;
  activeFor: number;
  lastUpdated: string;
}

interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface ContactInfo {
  office: {
    phone: string;
    email: string;
    website: string;
  };
  contacts: Contact[];
}

interface CompanyProfile {
  id: string,
      headerImage: string;
      flagIcon?: string;
      title: string;
      location: string;
      description: string;
      services: Service[];
      website: string;
      country: string;
      phone: string;
      joined: string;
      seenBy?: number;
}
interface CardView {
  companies: CompanyProfile[];
}

const cardView: React.FC<CardView> = ({ companies }) => {
  return (
    <div className="w-full flex flex-col">
      
      <div className=" grid grid-cols-4 gap-6 items-stretch">
        {companies.map((company, i) => (
          <Card key={company.id} prop={company} />
        ))}
      </div>
    </div>
  );
};

export default cardView;
