'use client';

import { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Clock, Calendar } from 'lucide-react';

interface Service {
    id: string;
    name: string;
}

interface Activity {
    type: 'active' | 'update';
    label: string;
    value: string;
    date?: string;
}

interface ContactInfo {
    email: string;
    phone: string;
    website: string;
}

interface CompanyProfile {
    name: string;
    address: string;
    industry: string;
    logo: string;
    about: string;
    contact: ContactInfo;
    services: Service[];
    activities: Activity[];
    gallery: string[];
}

export default function AccountPage() {
    const [activeService, setActiveService] = useState<string | null>(null);

    const companyData: CompanyProfile = {
        name: "Construction Partners",
        address: "987 Builder Road, Dubai, UAE",
        industry: "Construction",
        logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
        about: "We are a trusted construction company dedicated to delivering high-quality projects on time and within budget. From residential buildings to commercial developments, we focus on safety, durability, and customer satisfaction at every step.",
        contact: {
            email: "info@constructionpartner.com",
            phone: "+971 245 54 5 545",
            website: "constructionparner.com"
        },
        services: [
            { id: '1', name: 'Commercial Construction' },
            { id: '2', name: 'Project Management' },
            { id: '3', name: 'Renovation' },
            { id: '4', name: 'Infrastructure' }
        ],
        activities: [
            { type: 'active', label: 'Active for', value: '23 Months' },
            { type: 'update', label: 'Last Updates', value: '2024-12-04', date: '11:30' }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1590496793907-4adb7e2a0e3d?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1541976590-713941681591?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1560179406-9aa0e5a06b5d?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop"
        ]
    };

    return (
        <div className="w-full min-h-screen">

            <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="fc flex-col text-center mb-12 animate-fade-in-up">
                    <div className="inline-block mb-6 relative group">
                        <div className="absolute inset-0 rounded-xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <img
                            src={companyData.logo}
                            alt={companyData.name}
                            className="w-32 h-32 rounded-3xl object-cover shadow-2xl relative transform transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    <h1 className="text-3xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        <span className=" text-black">
                            {companyData.name}
                        </span>
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{companyData.address}</span>
                    </div>

                    <div className="inline-block">
                        <span className="px-6 py-2 bg-[#FBC8A2] text-[#153569] rounded-full text-sm font-semibold shadow-sm">
                            {companyData.industry}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center w-full md:w-[33vw] mt-8 flex-wrap">
                        <button className="group w-40 fc px-8 py-2 bg-blue-500 text-white rounded-md font-medium shadow-md shadow-blue-500/80 hover:shadow-xl hover:shadow-blue-500/80 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                            <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Email
                        </button>
                        <button className="w-40 fc px-8 py-2 bg-white text-[#153569] rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-[#153569] flex items-center gap-2 group">
                            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Call
                        </button>
                        <button className="w-40 fc px-8 py-2 bg-white text-[#153569] rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-[#153569] flex items-center gap-2 group">
                            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Website
                        </button>
                    </div>
                </div>

                {/* Top Row: About, Contact, Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* About */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50 hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-1">
                        <h2 className="text-lg font-bold mb-4 text-stone-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                            About
                        </h2>
                        <p className="text-[stone-600] leading-relaxed">
                            {companyData.about}
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg  hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-2">
                        <h2 className="text-lg font-bold mb-6 text-stone-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Email</p>
                                <a href={`mailto:${companyData.contact.email}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    {companyData.contact.email}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Phone</p>
                                <a href={`tel:${companyData.contact.phone}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    {companyData.contact.phone}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Website</p>
                                <a href={`https://${companyData.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    {companyData.contact.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-stone-200/50 hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-3">
                        <h2 className="text-lg font-bold mb-6 text-stone-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Activity
                        </h2>
                        <div className="space-y-4">
                            {companyData.activities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.type === 'active'
                                            ? 'bg-blue-100'
                                            : 'bg-amber-100'
                                        }`}>
                                        {activity.type === 'active' ? (
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-amber-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                                            {activity.label}
                                        </p>
                                        <p className="text-blue-600 font-semibold">
                                            {activity.value} {activity.date && (
                                                <span className="text-stone-600 font-normal ml-1">{activity.date}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Services and Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Services */}
                    <div className="lg:col-span-2 rounded-2xl p-8 shadow-lg border border-stone-200/50 hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-4">
                        <h2 className="text-lg font-bold mb-6 text-stone-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Services
                        </h2>
                        <div className="space-y-3">
                            {companyData.services.map((service, index) => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                                    className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 border-2 ${activeService === service.id
                                            ? 'bg-blue-50 border-blue-300 shadow-md'
                                            : 'bg-stone-50 border-transparent hover:border-stone-200 hover:bg-stone-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeService === service.id ? 'bg-blue-600 scale-125' : 'bg-stone-400'
                                            }`}></div>
                                        <span className={`font-medium transition-colors ${activeService === service.id ? 'text-blue-900' : 'text-stone-700'
                                            }`}>
                                            {service.name}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="lg:col-span-3 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-5">
                        <h2 className="text-lg font-bold mb-6 text-stone-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Gallery
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {companyData.gallery.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer animate-scale-in"
                                    style={{ animationDelay: `${0.1 * index}s`, opacity: 0 }}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}