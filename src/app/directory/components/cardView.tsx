import React from "react";
import Card from "./card";
import { CompanyData } from "../../(admin)/admin/dashboard/page";
import Link from "next/link";

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
