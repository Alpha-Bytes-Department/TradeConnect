"use client";
import React, { useState } from "react";
import CardView from "./components/cardView";
import { Search, Grid3x3, List } from "lucide-react";
import ListView from "./components/listView";
import api from "@/app/api";

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

const page = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountry, setSelectedCountry] = useState('No Selection');
    const [selectedService, setSelectedService] = useState('No Selection');
    const [sortBy, setSortBy] = useState("A-Z");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const countries = [
        'No Selection',
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
    ];
    const services = [
        'No Selection',
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Retail",
    ];
    const sortOptions = ["A-Z", "Z-A", "Most Recent", "Most Popular"];

    const data = [
        {
            headerImage:
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "United States",
            seenBy:25,
            joined: '2025-01-03T07:40:00Z',
            description:
                "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "Technology",
                "Healthcare",
                "Finance",
                "Education",
                "Retail",
            ],
            country: 'UK',
        },
        {
            headerImage:
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "United States",
            seenBy: 65,
            joined: '2025-01-03T07:40:00Z',
            description:
                "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "Technology",
                "Healthcare",
                "Finance",
                "Education",
                
            ],
            country: 'UK',
        },
        {
            headerImage:
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "United States",
            seenBy: 25,
            joined: '2025-01-02T07:40:00Z',
            description:
                "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "Technology",
                "Healthcare",
                "Finance",
                
                "Retail",
            ],
            country: 'USA',
        },
        {
            headerImage:
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "bradeConnect Logistics",
            location: "Australia",
            seenBy: 15,
            joined: '2025-01-01T07:40:00Z',
            description:
                "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "Technology",
                "Healthcare",
                
                "Education",
                "Retail",
            ],
            country: 'Australia',
        },
        {
            headerImage:
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "Australia",
            seenBy: 45,
            joined: '2025-01-05T07:40:00Z',
            description:
                "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "Technology",
                
                "Finance",
                "Education",
                "Retail",
            ],
            country: 'Canada',
        },
        {
            headerImage:
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
            flagIcon: "https://images.unsplash.com/photo-1497366216548-37526070297c",
            title: "TradeConnect Logistics",
            location: "Canada",
            seenBy: 35,
            joined: '2025-01-06T07:40:00Z',
            description:
                "A leading provider of global supply chain solutions, specializing in sustainable shipping and real-time inventory tracking for modern businesses.",
            services: [
                "Healthcare",
                "Finance",
                "Education",
                "Retail",
            ],
            country: 'UK',
        },
    ];

    let temp=selectedService==='No Selection'?data:data.filter((item)=>item.services.includes(selectedService))
    
    
   temp=selectedCountry==='No Selection'?temp: temp.filter((item)=>item.location.toLowerCase()===selectedCountry.toLowerCase())
    
    
       temp = searchTerm === '' ? temp : temp.filter((item)=>item.title.toLowerCase().startsWith(searchTerm.toLowerCase()))

    temp = sortBy === 'A-Z' ? temp.sort((a, b) => a.title.localeCompare(b.title)) : sortBy === 'Z-A' ? temp.sort((a, b) => b.title.localeCompare(a.title)) : sortBy === 'Most Recent' ? temp.sort((a, b) => a.joined.localeCompare(b.joined)) : temp.sort((a, b) => a.seenBy - b.seenBy)

const modifiedData=temp

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className=" mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                        Business Directory
                    </h1>
                    <p className="text-gray-600">
                        Explore and connect with verified business worldwide
                    </p>
                </div>

                {/* Search and Filters Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    {/* Top Row - Search and Dropdowns */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search Businesses or Services"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Country Dropdown */}
                        <div className="w-full lg:w-56">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 0.75rem center",
                                    backgroundSize: "1.25rem",
                                }}
                            >
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Services Dropdown */}
                        <div className="w-full lg:w-56">
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 0.75rem center",
                                    backgroundSize: "1.25rem",
                                }}
                            >
                                {services.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Bottom Row - Sort and View Toggle */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between ">
                        {/* Sort By */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                    />
                                </svg>
                                <span className="text-gray-700 font-medium">Sort by:</span>
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer min-w-[190px]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 0.75rem center",
                                    backgroundSize: "1.25rem",
                                }}
                            >
                                {sortOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                aria-label="Grid view"
                            >
                                <Grid3x3 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                aria-label="List view"
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">Showing {modifiedData.length} businesses</p>
                </div>

                {/* Children Content */}
                <div className="fc">
                    {viewMode === 'grid' ? <CardView companies={modifiedData} />
                        : <ListView companies={modifiedData} />}
                </div>
            </div>
        </div>
    );
};

export default page;
