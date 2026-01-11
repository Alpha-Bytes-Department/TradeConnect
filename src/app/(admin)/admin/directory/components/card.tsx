import React from "react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

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

interface CardProps {
    prop: CompanyData;
}
const Card: React.FC<CardProps> = ({ prop }) => {

    const router=useRouter()
    // Display first 3 services, and show "+N" for remaining
    const {
        headerImage,
        flagIcon,
        title,
        location,
        description,
        services,
        website,
    } = prop;
    const displayedServices = services?.slice(0, 3);
    const remainingCount = services ? services.length - 3 : 0;

    return (
        <div className="flex flex-col h-full col-span-4 md:col-span-1 w-full bg-white rounded-2xl shadow-lg overflow-hidden border ">
            {/* Header Image */}
            <div className="relative w-full h-[143px]">
                <Image
                    src={headerImage ? headerImage : "/image.png"}
                    alt="Header"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 ">
                {/* Title Section */}
                <div className="fc items-start gap-4 mb-4">
                    
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-400">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span className="text-md md:text-md">{location}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="max-h-20 overflow-y-auto custom-scrollbar mb-2">
                    <p className="text-gray-700 text-md leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Services */}
                {services.length >0 && (<div className="mb-4 ">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Services:</h3>
                    <div className="flex flex-wrap gap-3">
                        {displayedServices?.map((service) => (
                            <span
                                key={service.id}
                                className="px-3 py-1 bg-blue-100 text-blue-900 text-base rounded-full shadow-md shadow-blue-200"
                            >
                                {service.title}
                            </span>
                        ))}
                        {remainingCount > 0 && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-900 text-base rounded-full shadow-md shadow-blue-200">
                                {remainingCount}+
                            </span>
                        )}
                    </div>
                </div>)}

                {/* Action Buttons */}
                <div className="mt-auto flex items-center gap-3">
                    <Button
                        onClick={()=>router.push('/accounts')}
                        className="fc flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-1 rounded-xl transition-colors"
                    >
                        View Profile
                    </Button>

                    <Link
                        href="/accounts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-2 border-gray-300 hover:border-blue-600 rounded-xl flex items-center justify-center transition-colors group"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
