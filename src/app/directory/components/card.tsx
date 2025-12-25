import React from "react";
import Image from "next/image";
import { CompanyData } from "../page";
import Link from "next/link";

interface CardProps {
    prop: CompanyData;
}
const Card: React.FC<CardProps> = ({ prop }) => {
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
        <div className="col-span-3 md:col-span-1 max-w-[632px] bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Image */}
            <div className="relative w-full h-[240px]">
                <Image
                    src={headerImage ? headerImage : "/image.png"}
                    alt="Header"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-8">
                {/* Title Section */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-[90px] h-[90px] rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                        <Image
                            src={flagIcon ? flagIcon : "/image.png"}
                            alt={`${location} flag`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 pt-2">
                        <h2 className="text-4xl font-semibold text-gray-800 mb-3">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-500">
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
                            <span className="text-xl">{location}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {description}
                </p>

                {/* Services */}
                <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-3">Services:</h3>
                    <div className="flex flex-wrap gap-3">
                        {displayedServices?.map((service, index) => (
                            <span
                                key={index}
                                className="px-6 py-3 bg-blue-100 text-gray-700 text-base rounded-full"
                            >
                                {service}
                            </span>
                        ))}
                        {remainingCount > 0 && (
                            <span className="px-6 py-3 bg-blue-100 text-gray-700 text-base rounded-full">
                                {remainingCount}+
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fc flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium py-4 rounded-xl transition-colors"
                    >
                        View Profile
                    </Link>

                    <Link
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 border-2 border-gray-300 hover:border-blue-600 rounded-xl flex items-center justify-center transition-colors group"
                    >
                        <svg
                            className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors"
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
