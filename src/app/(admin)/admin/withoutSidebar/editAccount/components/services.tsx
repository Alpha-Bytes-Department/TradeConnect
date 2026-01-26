'use client';
import React, { useEffect, useState } from 'react';

interface Service {
    id: string;
    title: string | undefined;
}

interface ServicesData {
    about_business?: string | undefined;
    services?: Service[] | [];
}

interface ContactsProps {
    data: ServicesData | undefined;
    setData: React.Dispatch<React.SetStateAction<ServicesData | undefined>>;
}

const Services: React.FC<ContactsProps> = ({ data, setData }) => {
    const [services, setServices] = useState('');
    const [about, setAbout] = useState('');

    // Sync local state when prop data initially arrives
    useEffect(() => {
        if (data) {
            // Only update local state if it's currently empty to avoid overwriting user typing
            if (!services && data.services) {
                setServices(data.services.map(s => s.title).join(', ') || '');
            }
            if (!about && data.about_business) {
                setAbout(data.about_business || '');
            }
        }
    }, [data]); // Watch data for async loading

    const handleServicesChange = () => {
        const servicesArray: Service[] = services
            .split(',')
            .map(item => item.trim())
            .filter(Boolean)
            .map((name, index) => ({
                // Using crypto.randomUUID() safely
                id: `${crypto.randomUUID()}-${index}`,
                title: name
            }));

            

        setData(prev => ({
            ...prev,
            services: servicesArray
        }));
    };

    const handleAboutChange = () => {
        setData(prev => ({
            ...prev,
            about_business: about
        }));
    };
    return (
        <div className="space-y-6">
            {/* Services */}
            <div>
                <label htmlFor="services" className="text-sm text-gray-700 mb-2 block">
                    Services Offered<span className="text-red-500">*</span>
                </label>

                <textarea
                    id="services"
                    rows={6}
                    value={services}
                    onChange={(e) => {handleServicesChange;setServices(e.target.value)}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="Software Development, Cloud Solutions, IT Consulting"
                />

                <p className="mt-1 text-xs text-gray-500">
                    Separate services with commas
                </p>
            </div>

            {/* About */}
            <div>
                <label htmlFor="about" className="text-sm text-gray-700 mb-2 block">
                    About Your Business<span className="text-red-500">*</span>
                </label>

                <textarea
                    id="about"
                    value={about}
                    onChange={(e) => {handleAboutChange; setAbout(e.target.value)}}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 resize-none outline-none"
                    placeholder="Leading technology solutions provider with 15+ years of experience."
                />

                <p className="mt-1 text-xs text-gray-500">
                    {/* Fixed: Now tracks typing in real-time */}
                    {about.length} characters
                </p>
            </div>
        </div>
    );
};

export default Services;