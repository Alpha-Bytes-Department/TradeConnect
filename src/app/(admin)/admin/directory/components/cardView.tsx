import React from "react";
import Card from "./card";

import Link from "next/link";

export interface Service {
  id: string,
  title: string,
}


export interface CompanyData {
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
  companies: CompanyData[];
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
