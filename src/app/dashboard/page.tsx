'use client'
import React, { useState } from 'react';
import {
    CheckSquare,
    Calendar,
    Eye,
    Edit3,
    Lock,
    Image as ImageIcon,
    ExternalLink
} from 'lucide-react';

// Mock Data
const statsData = [
    {
        id: 1,
        icon: CheckSquare,
        value: '85%',
        label: 'Profile Completeness',
        color: 'bg-blue-100',
        iconColor: 'text-blue-600',
        hasProgress: true,
        progress: 85
    },
    {
        id: 2,
        icon: Calendar,
        value: '23',
        label: 'Months Active',
        color: 'bg-green-100',
        iconColor: 'text-green-600',
        hasProgress: false
    },
    {
        id: 3,
        icon: Eye,
        value: '124',
        label: 'Profile Views (Mock)',
        color: 'bg-purple-100',
        iconColor: 'text-purple-600',
        hasProgress: false
    }
];

const quickActions = [
    {
        id: 1,
        icon: Edit3,
        title: 'Edit Profile',
        description: 'Update your information',
        color: 'bg-blue-100',
        iconColor: 'text-blue-600'
    },
    {
        id: 2,
        icon: Lock,
        title: 'Change Password',
        description: 'Update security',
        color: 'bg-purple-100',
        iconColor: 'text-purple-600'
    },
    {
        id: 3,
        icon: ImageIcon,
        title: 'Update Images',
        description: 'Add photos to gallery',
        color: 'bg-green-100',
        iconColor: 'text-green-600'
    }
];

const profileData = {
    businessName: 'Tech Solutions Inc.',
    email: 'contact@techsolutions.com',
    country: 'United States',
    lastUpdated: '2024-12-05 09:30'
};

const recentlyViewedBusinesses = [
    {
        id: 1,
        name: 'Global Marketing Pro',
        country: 'United Kingdom',
        services: 'Digital Marketing, SEO, Brand Strategy, Social Media Management',
        logo: 'GM',
        logoColor: 'bg-slate-700 text-white'
    },
    {
        id: 2,
        name: 'Finance Experts Ltd',
        country: 'Canada',
        services: 'Financial Planning, Investment Advisory, Tax Consulting, Wealth Management',
        logo: 'FE',
        logoColor: 'bg-amber-100 text-amber-900'
    },
    {
        id: 3,
        name: 'Design Studio Co',
        country: 'Australia',
        services: 'Graphic Design, UI/UX Design, Brand Identity, Product Design',
        logo: 'DS',
        logoColor: 'bg-rose-400 text-white'
    }
];

export default function Dashboard() {
    const [hoveredAction, setHoveredAction] = useState<number|null>(0);

    return (
            

        <div className="w-full fc flex-col justify-around  gap-4 md:gap-6 my-4 md:my-6">
                
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-[#8A38F5] to-[#005AF0] rounded-lg">
                <h1 className="text-2xl sm:text-2xl lg:text-2xl font-semibold mb-2 tracking-tight text-white">
                    Welcome back, Tech Solutions Inc.!
                </h1>
                <p className="text-purple-100 text-md sm:text-base font-light">
                    Manage your business profile and explore the directory
                </p>
            </div>
            {/* Stats Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {statsData.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                    <Icon className={`${stat.iconColor} w-6 h-6`} />
                                </div>
                                <div className="text-3xl font-bold text-slate-800 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 font-medium mb-3">
                                    {stat.label}
                                </div>
                                {stat.hasProgress && (
                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${stat.progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
            <div className="w-full bg-[#FEF3EB] p-4 rounded-lg">
                    <h2 className="text-xl sm:text-xl font-semibold text-slate-800 pb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={action.id}
                                    onClick={() => alert(`${action.title} clicked`)}
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
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                    <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-3xl font-bold">
                                        TS
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                        Business Name
                                    </p>
                                    <p className="text-base font-semibold text-slate-800">
                                        {profileData.businessName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                        Country
                                    </p>
                                    <p className="text-base font-semibold text-slate-800">
                                        {profileData.country}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                        Email
                                    </p>
                                    <p className="text-base font-semibold text-slate-800">
                                        {profileData.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                        Last Updated
                                    </p>
                                    <p className="text-base font-semibold text-slate-800">
                                        {profileData.lastUpdated}
                                    </p>
                                </div>
                            </div>

                            {/* Public View Button */}
                            <div className="flex-shrink-0 lg:self-start">
                                <button
                                    onClick={() => alert('Public View clicked')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Eye className="w-5 h-5" />
                                    Public View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recently Viewed Business */}
            <div className="w-full bg-[#FEF3EB] p-4 rounded-lg" >
                <h2 className="text-xl sm:text-xl font-semibold text-slate-800 ">
                        Recently Viewed Business
                    </h2>
                    <div className=" overflow-hidden border border-slate-100">
                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Business
                                        </th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Country
                                        </th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Services
                                        </th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentlyViewedBusinesses.map((business) => (
                                        <tr
                                            key={business.id}
                                            className="border-b border-slate-300 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`${business.logoColor} w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm`}>
                                                        {business.logo}
                                                    </div>
                                                    <span className="font-semibold text-slate-800">
                                                        {business.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-slate-700">
                                                {business.country}
                                            </td>
                                            <td className="py-5 px-6 text-slate-700 max-w-md">
                                                {business.services}
                                            </td>
                                            <td className="py-5 px-6">
                                                <button
                                                    onClick={() => alert(`View ${business.name}`)}
                                                    className="w-28 fc rounded-lg h-10 bg-blue-200 action:bg-blue-400 action:text-white text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 hover:gap-3 transition-all group"
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
                                            <h3 className="font-semibold text-slate-800 mb-1">
                                                {business.name}
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                {business.country}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-700 mb-4">
                                        {business.services}
                                    </p>
                                    <button
                                        onClick={() => alert(`View ${business.name}`)}
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