"use client";
import React, { useEffect, useState } from "react";
import CardView from "./components/cardView";
import { Search, Grid3x3, List } from "lucide-react";
import ListView from "./components/listView";
import api from "@/app/api";

export interface CompanyData {
    headerImage: string;
    flagIcon: string;
    title: string;
    location: string;
    description: string;
    services: string[];
    website: string;
    country: string;
    phone: string;
    joined:string;
    seenBy: number;
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


    const dummyData = [
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
            website: 'https://google.com',
            phone: '5645345234534',
            
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
            website: 'https://google.com',
            phone: '5645345234534',
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
            website: 'https://google.com',
            phone: '5645345234534',
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
            website: 'https://google.com',
            phone: '5645345234534',
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
            website: 'https://google.com',
            phone: '5645345234534',
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
            website: 'https://google.com',
            phone: '5645345234534',
        },
    ];
    

    const [data, setData] = useState<CompanyData[]>(dummyData)
    const [page, setPage] = useState<number>(1)


    let temp: CompanyData[] = Array.isArray(data) ? [...data] : [];

    // Filter by service
    if (selectedService !== 'No Selection') {
        temp = temp.filter(item =>
            item?.services?.includes(selectedService)
        );
    }

    // Filter by country
    if (selectedCountry !== 'No Selection') {
        temp = temp.filter(item =>
            item.location?.toLowerCase() === selectedCountry.toLowerCase()
        );
    }

    // Filter by search
    if (searchTerm) {
        temp = temp.filter(item =>
            item.title?.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
    }

    // Sort (SAFE)
    switch (sortBy) {
        case 'A-Z':
            temp.sort((a, b) => a.title.localeCompare(b.title));
            break;

        case 'Z-A':
            temp.sort((a, b) => b.title.localeCompare(a.title));
            break;

        case 'Most Recent':
            temp.sort(
                (a, b) =>
                    new Date(b.joined).getTime() -
                    new Date(a.joined).getTime()
            );
            break;

        default:
            temp.sort((a, b) => a.seenBy - b.seenBy);
    }

    const modifiedData = temp;



useEffect(() => {
    let controller=new AbortController()

    const fetchUsers = async () => {
      try {
          const res = await api.get(`business/all/?country=${selectedCountry === 'No Selection' ? '' : selectedCountry}&search=${searchTerm}&service=${selectedService === 'No Selection' ? '' : selectedService}&page=${1}&sort_by=${sortBy}`);

          console.log('******************************************************',res)
        if (controller) setData(res.data);
      } catch (err: any) {
        
      } 
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, []);


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

                {/* pagination */}
                <div className="flex items-center gap-2 fc">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    {[1, 2, 3].map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-14 h-14 rounded-xl font-semibold text-lg transition-colors ${page === pageNum
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage(Math.min(3, page + 1))}
                        disabled={page === 3}
                        className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
