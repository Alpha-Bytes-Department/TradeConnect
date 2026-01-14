import React from 'react';
import { ExternalLink } from 'lucide-react';

import Link from 'next/link';

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

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', companies)
    return (
        <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 px-8 min-h-screen">
            <div className=" mx-auto">
                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    {/* Header */}
                    <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_0.8fr] gap-6 px-8 py-5 bg-[#fff3e3] border-b border-slate-200">
                        <div className="text-lg font-semibold text-slate-800 tracking-wide">Business</div>
                        <div className="text-lg font-semibold text-slate-800 tracking-wide">Country</div>
                        <div className="text-lg font-semibold text-slate-800 tracking-wide">Services</div>
                        <div className="text-lg font-semibold text-slate-800 tracking-wide">Contact</div>
                        <div className="text-lg font-semibold text-slate-800 tracking-wide">Action</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-slate-100">
                        {companies.map((item, index) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_0.8fr] gap-6 px-8 py-6 hover:bg-slate-50 transition-all duration-300 group"
                            >
                                {/* Business Column */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                                        <img
                                            src={item?.headerImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                                            {item.title}
                                        </h3>
                                        
                                    </div>
                                </div>

                                {/* Country Column */}
                                <div className="flex items-center">
                                    <p className="text-md font-semibold text-slate-500 ">{item.country ? item.country:'-'}</p>
                                </div>

                                {/* Services Column */}
                                <div className="flex items-center">
                                    <div className="space-y-1">
                                        {item.services?.slice(0, 2).map((service, idx) => (
                                            <p key={idx} className="text-sm font-semibold text-slate-700">
                                                {service?.title}
                                            </p>
                                        ))}
                                        {item.services && item.services.length > 2 && (
                                            <p className="text-md font-semibold text-slate-500 font-medium mt-1">
                                                {item.services.length-2}+
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Column */}
                                <div className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-md font-semibold text-slate-700">
                                            {item?.website || 'info@company.com'}
                                        </p>
                                        <p className="text-md font-semibold text-slate-500">
                                            {item.phone || '+971 544 4546 4641'}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Column */}
                                <div className="flex items-center justify-start">
                                    <Link
                                        href={`/accounts/${item.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="fc gap-3 bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white text-md  font-semibold py-2 px-4 rounded-xl transition-colors border border-blue-600 "
                                    >
                                        <span>View</span>
                                        <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListView;