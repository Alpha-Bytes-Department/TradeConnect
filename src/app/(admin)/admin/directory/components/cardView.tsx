import React from "react";
import Card from "./card";

import Link from "next/link";


export interface CompanyData {
  headerImage?: string;
  flagIcon?: string;
  title?: string;
  location?: string;
  description?: string;
  services?: string[];
  website?: string;
  country?: string;
  phone?: string;
}

interface CardView {
  companies: CompanyData[];
}

const cardView: React.FC<CardView> = ({ companies }) => {
  return (
    <div className="flex flex-col">
      
      <div className="grid grid-cols-4 gap-6">
        {companies.map((company, i) => (
          <Card key={i} prop={company} />
        ))}
      </div>
    </div>
  );
};

export default cardView;
