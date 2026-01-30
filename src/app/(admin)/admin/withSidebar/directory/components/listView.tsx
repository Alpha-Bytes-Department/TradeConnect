import React from 'react';
import { ExternalLink } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/app/api';

interface Service {
    id: string;
    title: string;
}

interface LocationData {
    id: string,
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}
interface Award {
    id: string;
    name: string;
}
interface Activity {
    active: boolean;
    activeFor: number;
    lastUpdated: string;
}

interface Contact {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    isPrimary: boolean;
}

interface ContactInfo {
    office: {
        phone: string;
        email: string;
        website: string;
    };
    contacts: Contact[];
}

interface CompanyProfile {
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

interface DirectoryListProps {
    companies: CompanyProfile[];
}

const ListView: React.FC<DirectoryListProps> = ({ companies }) => {

    const router=useRouter()
        const increaseBusinessView = async (id:string) => {
            try {
                const response = await api.post(`/business/${id}/increase-view/`);
    
                if (!response) {
                    throw new Error(`HTTP error! status: ${response}`);
                }
    
                const data = await response;
                return data;
            } catch (error) {
                console.error('Error increasing business view:', error);
                throw error;
            }
            
        };
    
    return (
        <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 px-4 md:px-8 min-h-screen">
            <div className="mx-auto">
                {/* 1. Added overflow-x-auto to prevent layout breaking */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-x-auto">

                    {/* 2. Added min-w to ensure the columns stay aligned and readable on mobile */}
                    <div className="min-w-[950px]">
                        {/* Header */}
                        <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_0.8fr] gap-6 px-8 py-5 bg-[#fff3e3] border-b border-slate-200">
                            <div className="fc text-lg font-semibold text-slate-800 tracking-wide">Business</div>
                            <div className="fc text-lg font-semibold text-slate-800 tracking-wide">Country</div>
                            <div className="fc text-lg font-semibold text-slate-800 tracking-wide">Services</div>
                            <div className="fc text-lg font-semibold text-slate-800 tracking-wide">Contact</div>
                            <div className="fc text-lg font-semibold text-slate-800 tracking-wide">Action</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-slate-100">
                            {companies.map((item) => (
                                <div
                                    key={item.id}
                                    /* 1. Added w-full and min-w-max to ensure the row doesn't collapse smaller than its content needs */
                                    className="grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_0.8fr] gap-6 px-8 py-6 hover:bg-slate-50 transition-all duration-300 group items-center min-w-[900px]"
                                >
                                    {/* Business Column */}
                                    <div className="flex items-center gap-4 min-w-0"> {/* min-w-0 is vital for truncate to work in flex/grid */}
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                                            <img
                                                src={item?.headerImage}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <button
                                                className="text-left w-full"
                                                onClick={async () => {
                                                    await increaseBusinessView(item.id);
                                                    router.push(`/admin/withoutSidebar/accounts/${item.id}/`);
                                                }}
                                            >
                                                <h3 className="text-lg font-semibold text-slate-800 truncate group-hover:text-blue-700 transition-colors duration-200">
                                                    {item.title}
                                                </h3>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Country Column */}
                                    <div className="fc min-w-0">
                                        <p className="text-md font-semibold text-slate-500 truncate whitespace-nowrap">
                                            {item.country ? item.country : '-'}
                                        </p>
                                    </div>

                                    {/* Services Column */}
                                    <div className="fc min-w-0">
                                        <div className="flex flex-col min-w-0 ">
                                            {item.services?.slice(0, 2).map((service, idx) => (
                                                <p key={idx} className="m-auto max-w-full text-sm font-semibold text-slate-700 truncate whitespace-nowrap">
                                                    {service?.title}
                                                </p>
                                            ))}
                                            {item.services && item.services.length > 2 && (
                                                <p className="m-auto text-xs font-bold text-slate-700 mt-1 uppercase">
                                                    +{item.services.length - 2}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Column */}
                                    <div className="fc min-w-0">
                                        <div className="fc flex-col space-y-1 min-w-0">
                                            <p className="text-md font-semibold text-slate-700 truncate whitespace-nowrap">
                                                {item?.website || 'info@company.com'}
                                            </p>
                                            <p className="text-md font-semibold text-slate-500 truncate whitespace-nowrap">
                                                {item.phone || '+971 544 4546 4641'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Column */}
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={async () => {
                                                await increaseBusinessView(item.id);
                                                router.push(`/admin/withoutSidebar/accounts/${item.id}/`);
                                            }}
                                            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-900 text-blue-900 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all border border-blue-900 hover:border-blue-300 whitespace-nowrap"
                                        >
                                            <span>View</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListView;