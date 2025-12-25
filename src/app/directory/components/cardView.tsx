import React from 'react'
import Card from './card'
import { CompanyData } from "../page";
import Link from "next/link";

interface CardView{
    companies:CompanyData[],
}

const cardView: React.FC<CardView> = ({ companies }) => {
  return (
    <div className='grid grid-cols-5 gap-4'>
          {companies.map((company,i)=>(<Card prop={company}/>))}
    </div>
    
  )
}

export default cardView