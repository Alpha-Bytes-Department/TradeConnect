'use client';
import React from 'react';
import { Service } from '../../accounts/page';

interface ServicesData {
    about: string;
    services: Service[];
}

interface ContactsProps {
    data: ServicesData;
    setData: React.Dispatch<React.SetStateAction<ServicesData>>;
}

const Services: React.FC<ContactsProps> = ({ data, setData }) => {

    const handleServicesChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = e.target.value;

        const servicesArray: Service[] = value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean)
            .map(name => ({ name }));

        setData(prev => ({
            ...prev,
            services: servicesArray
        }));
    };

    const handleAboutChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setData(prev => ({
            ...prev,
            about: e.target.value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Services */}
            <div>
                <label htmlFor="services" className="text-sm text-gray-700 mb-2">
                    Services Offered<span className="text-red-500">*</span>
                </label>

                <textarea
                    id="services"
                    rows={6}
                    value={data.services.map(s => s.name).join(', ')}
                    onChange={handleServicesChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    placeholder="Software Development, Cloud Solutions, IT Consulting"
                />

                <p className="mt-1 text-xs text-gray-500">
                    Separate services with commas
                </p>
            </div>

            {/* About */}
            <div>
                <label htmlFor="about" className="text-sm text-gray-700 mb-2">
                    About Your Business<span className="text-red-500">*</span>
                </label>

                <textarea
                    id="about"
                    value={data.about}
                    onChange={handleAboutChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="Leading technology solutions provider with 15+ years of experience."
                />

                <p className="mt-1 text-xs text-gray-500">
                    {data.about.length} characters
                </p>
            </div>
        </div>
    );
};

export default Services;
