import React from 'react'
import CardView from './components/cardView'

export interface CompanyData {
    headerImage?: string;
    flagIcon?: string;
    title?: string;
    location?: string;
    description?: string;
    services?: string[];
    website?:string,
}

const page = () => {

    const data=[{
        headerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
                title: "TradeConnect Logistics",
                    location: "New York, NY",
                        description: "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
                            services: [
                                "International Shipping",
                                "Warehouse Management",
                                "Last-mile Delivery",
                                "Customs Brokerage"
                            ]
    },
        {
            headerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "New York, NY",
            description: "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "International Shipping",
                "Warehouse Management",
                "Last-mile Delivery",
                "Customs Brokerage"
            ]
        },
        {
            headerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "New York, NY",
            description: "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "International Shipping",
                "Warehouse Management",
                "Last-mile Delivery",
                "Customs Brokerage"
            ]
        },
        {
            headerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "New York, NY",
            description: "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "International Shipping",
                "Warehouse Management",
                "Last-mile Delivery",
                "Customs Brokerage"
            ]
        },
        {
            headerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "New York, NY",
            description: "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "International Shipping",
                "Warehouse Management",
                "Last-mile Delivery",
                "Customs Brokerage"
            ]
        },
        {
            headerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "New York, NY",
            description: "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "International Shipping",
                "Warehouse Management",
                "Last-mile Delivery",
                "Customs Brokerage"
            ]
        },


]

  return (
    <div className="fc">
        <CardView companies={data}/>
    </div>
  )
}

export default page