
'use client'
import React from 'react';
import { Data } from '../page';
import { Service } from '../../accounts/page';
interface ContactsProps {
    data: Service[];
    setData: React.Dispatch<React.SetStateAction<Data>>;
}

const Services: React.FC<ContactsProps> = ({ data, setData }) => {
    const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                services: e.target.value,
            },
        }));
    };

    const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                about: e.target.value,
            },
        }));
    };

    return (
        <div className="space-y-6">
            {/* Services Offered Field */}
            <div>
                <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                    Services Offered<span className="text-red-500">*</span>
                </label>
                <input
                    id="services"
                    type="text"
                    value={data.services}
                    onChange={handleServicesChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Software Development, Cloud Solutions, IT Consulting"
                />
                <p className="mt-1 text-xs text-gray-500">Separate services with commas</p>
            </div>

            {/* About Your Business Field */}
            <div>
                <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                    About Your Business<span className="text-red-500">*</span>
                </label>
                <textarea
                    id="about"
                    value={data.about}
                    onChange={handleAboutChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Leading technology solutions provider with 15+ years of experience in enterprise software development."
                />
                <p className="mt-1 text-xs text-gray-500">
                    {data.about.length} characters
                </p>
            </div>
        </div>
    );
};

export default Services;