"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CheckSquare,
    Calendar,
    Eye,
    Edit3,
    Lock,
    Image as ImageIcon,
    ExternalLink,
    Calendar1Icon,
} from "lucide-react";
import Image from "next/image";
import api from "@/app/api";

const progressTab = {
    label: "Profile Completeness",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    progress: 35,
};

const monthsActive = {
    icon: Calendar,
    label: "Expiry Date",
    color: "bg-green-100",
    iconColor: "text-green-600",
    active: 23,
};

const visits = {
    icon: Eye,
    visits: 124,
    label: "Profile Views",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
};

const quickActions = [
    {
        id: 1,
        icon: Edit3,
        title: "Edit Profile",
        link: '/admin/withoutSidebar/editAccount',
        description: "Update your information",
        color: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        id: 2,
        icon: Lock,
        title: "Change Password",
        link: '/admin/withoutSidebar/changePassword',
        description: "Update security",
        color: "bg-purple-100",
        iconColor: "text-purple-600",
    },
    {
        id: 3,
        icon: ImageIcon,
        title: "Update Images",
        link: '/admin/withoutSidebar/editAccount',
        description: "Add photos to gallery",
        color: "bg-green-100",
        iconColor: "text-green-600",
    },
];

const profileData = {
    businessName: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    country: "United States",
    lastUpdated: "2024-12-05 09:30",
};

const recentlyViewedBusinesses = [
    {
        id: 1,
        name: "Global Marketing Pro",
        country: "United Kingdom",
        services: "Digital Marketing, SEO, Brand Strategy, Social Media Management",
        logo: "/logo.jpg",
        logoColor: "bg-slate-700 text-white",
    },
    {
        id: 2,
        name: "Finance Experts Ltd",
        country: "Canada",
        services:
            "Financial Planning, Investment Advisory, Tax Consulting, Wealth Management",
        logo: "/logo.jpg",
        logoColor: "bg-amber-100 text-amber-900",
    },
    {
        id: 3,
        name: "Design Studio Co",
        country: "Australia",
        services: "Graphic Design, UI/UX Design, Brand Identity, Product Design",
        logo: "/logo.jpg",
        logoColor: "bg-rose-400 text-white",
    },
];


interface Business {
    business_name: string;
    country: string;
    logo: string;
    services: string[];
    id: string;
}


interface MyData {
    id: string;
    business_name: string;
    user_email: string;
    logo: string;
    country: string;
    updated_at: string;
}


interface Data {
    profile_completeness: number;
    membership_valid_till: string;
    profile_views: number;
}

export default function Dashboard() {
    const [hoveredAction, setHoveredAction] = useState<number | null>(0);
    const router = useRouter()

    const [data, setData] = useState<Data>({
        profile_completeness: 0,
        membership_valid_till: '',
        profile_views: 0,
    })

    const [myData, setMyData] = useState<MyData>({
        id: '',
        business_name: '',
        user_email: '',
        logo: '',
        country: '',
        updated_at: '',
    })

    const [recentlyViewed, setRecentlyViewed] = useState<Business[]>([])

    
        const increaseBusinessView = async (id:string) => {
            try {
                const response = await api.post(`/business/${id}/increase-view/`);
    
                if (!response) {
                    throw new Error(`HTTP error! status: ${response}`);
                }
    
                
            } catch (error) {
                console.error('Error increasing business view:', error);
                throw error;
            }
            
        };
    

    useEffect(() => {
        const controller = new AbortController()

        const fetchUsers = async () => {
            try {
                const res = await api.get(`business/dashboard/`, {
                    signal: controller.signal,
                });
                if (!controller.signal.aborted) setData(res.data.data);
            } catch (err: any) {
                // handle error
            }
        }
        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);


    useEffect(() => {
        const controller = new AbortController()

        const fetchUsers = async () => {
            try {
                const res = await api.get(`business/recently-viewed/`, {
                    signal: controller.signal,
                });

                if (!controller.signal.aborted && Array.isArray(res.data.data)) {
                    setRecentlyViewed(res.data.data.map((r: any) => {
                        return {
                            business_name: r.business_name?.business_name || r.business_name || '',
                            country: r.country || '',
                            logo: r.logo || '',
                            services: r.services || [],
                            id: r.id || r.business_name?.id || ''
                        }
                    }));
                }
            } catch (err: any) {
                // handle error
            }
        }
        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController()

        const fetchUsers = async () => {
            try {
                const res = await api.get(`business/my/`, {
                    signal: controller.signal,
                });
                if (!controller.signal.aborted) setMyData({
                    id: res.data.business?.id,
                    business_name: res.data.business?.business_name,
                    user_email: res.data.business?.user_email,
                    logo: res.data.business?.logo,
                    country: res.data.business?.country?.name,
                    updated_at: res.data.business?.updated_at,
                });
            } catch (err: any) {
                // handle error
            }
        }
        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);



    return (
        <div className="w-full flex flex-col justify-around gap-4 md:gap-6 my-4 md:my-6">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-[#005AF0] to-[#8A38F5] rounded-lg">
                <h1 className="text-3xl sm:text-2xl lg:text-2xl font-semibold mb-2 tracking-tight text-white">
                    Welcome back, Tech Solutions Inc.!
                </h1>
                <p className="text-purple-100 text-xl sm:text-base font-light">
                    Manage your business profile and explore the directory
                </p>
            </div>
            {/* Stats Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${0 * 100}ms` }}
                >
                    <div
                        className={`${progressTab.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                    >
                        <CheckSquare className={`${progressTab.iconColor} w-6 h-6`} />
                    </div>
                    <div className="text-2xl font-semibold text-slate-800 mb-1">
                        {`${data.profile_completeness}%`}
                    </div>
                    <div className="text-sm text-slate-600 font-medium mb-3">
                        {progressTab.label}
                    </div>
                    {progressTab.progress && (
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${data.profile_completeness}%` }}
                            />
                        </div>
                    )}
                </div>

                <div
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${1 * 100}ms` }}
                >
                    <div
                        className={`${monthsActive.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                    >
                        <Calendar1Icon className={`${monthsActive.iconColor} w-6 h-6`} />
                    </div>
                    <div className="text-2xl font-semibold text-slate-800 mb-1">
                        {data.membership_valid_till ? new Date(data.membership_valid_till).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric'
                        }).toUpperCase() : 'N/A'}
                    </div>
                    <div className="text-sm text-slate-600 font-medium mb-3">
                        {monthsActive.label}
                    </div>
                </div>

                <div
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${2 * 100}ms` }}
                >
                    <div
                        className={`${visits.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                    >
                        <Eye className={`${visits.iconColor} w-6 h-6`} />
                    </div>
                    <div className="text-2xl font-semibold text-slate-800 mb-1">
                        {data.profile_views}
                    </div>
                    <div className="text-sm text-slate-600 font-medium mb-3">
                        {visits.label}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="w-full bg-[#FEF3EB] p-4 rounded-lg border">
                <h2 className="text-xl sm:text-xl font-semibold text-slate-800 pb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.id}
                                onClick={() => router.push(`${quickActions[index].link}`)}
                                onMouseEnter={() => setHoveredAction(action.id)}
                                onMouseLeave={() => setHoveredAction(null)}
                                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-left group border border-slate-100 hover:border-indigo-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon className={`${action.iconColor} w-5 h-5`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Your Profile */}
            <div className="w-full bg-white p-4 rounded-lg border shadow-lg">
                <h2 className="text-xl sm:text-xl font-semibold text-slate-800 pb-4">
                    Your Profile
                </h2>
                <div className="bg-white rounded-2xl">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                            <div className="relative w-32 h-32 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                {/* Fixed: Added fallback source to prevent crash on empty string */}
                                <Image
                                    src={myData.logo || '/logo.jpg'}
                                    alt='image'
                                    fill
                                    className="object-cover aspect-square"
                                />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 tracking-wider mb-1">
                                    Business Name
                                </p>
                                <p className="text-base font-semibold text-slate-800">
                                    {myData.business_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 tracking-wider mb-1">
                                    Country
                                </p>
                                <p className="text-base font-semibold text-slate-800">
                                    {myData.country}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 tracking-wider mb-1">
                                    Email
                                </p>
                                <p className="text-base font-semibold text-slate-800">
                                    {myData.user_email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 tracking-wider mb-1">
                                    Last Updated
                                </p>
                                <div className='flex flex-row gap-6'>
                                    {myData.updated_at && (
                                        <>
                                            <p className="text-base font-semibold text-slate-800">
                                                {new Date(myData.updated_at).toLocaleDateString('en-CA')} </p>
                                            <p className="text-base font-semibold text-slate-800">{new Date(myData.updated_at).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Public View Button */}
                        <div className="flex-shrink-0 lg:self-end">
                            <button
                                onClick={async () => { await increaseBusinessView(myData.id); router.push(`/admin/withoutSidebar/accounts/${myData.id}/`) }}
                                className="w-full m-1 sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <Eye className="w-5 h-5" />
                                Public View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recently Viewed Business */}
            <div className="w-full bg-[#FEF3EB] p-4 rounded-lg border">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Recently Viewed Business
                </h2>

                <div className="overflow-hidden border border-slate-100 bg-[#FEF3EB] rounded-lg">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">Business</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">Country</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">Services</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentlyViewed.map((business) => (
                                    <tr key={business.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-sm flex items-center justify-center ${business.logo ? 'bg-white border border-slate-100' : ''}`}>
                                                    {business.logo ? (
                                                        <Image
                                                            src={business.logo}
                                                            alt={`${business.business_name} logo`}
                                                            fill
                                                            sizes="w-12 h-12"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <span className="font-bold text-sm">
                                                            {business.business_name}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="font-semibold text-slate-800">{business.business_name}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-slate-700">{business.country}</td>
                                        {/* Fixed: Added .join() to render array correctly */}
                                        <td className="py-5 px-6 text-slate-700 max-w-md truncate">{business.services?.join(', ')}</td>
                                        <td className="py-5 px-6">
                                            <button
                                                onClick={async () => { await increaseBusinessView(business.id); router.push(`/admin/withoutSidebar/accounts/${business.id}/`) }}
                                                className="w-28 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold flex items-center justify-center gap-2 transition-all group"
                                            >
                                                View
                                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden divide-y divide-slate-100">
                        {recentlyViewedBusinesses.map((business) => (
                            <div key={business.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`${business.logoColor} w-14 h-14 rounded-xl flex items-center justify-center font-bold shadow-sm flex-shrink-0`}>
                                        {business.logo}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-800 mb-1">{business.name}</h3>
                                        <p className="text-sm text-slate-600">{business.country}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-700 mb-4 line-clamp-2">{business.services}</p>
                                <button
                                    onClick={() => router.push(`/admin/accounts/${business.id}`)}
                                    className="w-full bg-blue-50 text-blue-600 py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    View
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}