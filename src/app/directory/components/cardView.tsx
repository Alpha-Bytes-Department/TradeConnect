import React from 'react'
import Card from './card'
import { CompanyData } from "../page";
import Link from "next/link";

interface CardView{
    companies:CompanyData[],
}

const cardView: React.FC<CardView> = ({ companies }) => {
  return (
    <div className='grid grid-cols-4 gap-6'>
          {companies.map((company,i)=>(<Card key={i} prop={company}/>))}
    </div>
    
  )
}

export default cardView