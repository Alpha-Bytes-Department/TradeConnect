'use client';
import React, { useEffect, useState } from 'react';

interface Service {
    id: string | undefined;
    title: string|undefined;
}
interface ServicesData {
    about_business?: string|undefined;
    services?: Service[]|[];
}

interface ContactsProps {
    data: ServicesData|undefined;
    setData: React.Dispatch<React.SetStateAction<ServicesData | undefined>>;
}

const Services: React.FC<ContactsProps> = ({ data, setData }) => {



    const [services,setServices]=useState('')
    const [about, setAbout] = useState('')

    const handleServicesChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = e.target.value;

        const servicesArray: Service[] = value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean)
            .map((name, index) => ({
                id: `${crypto.randomUUID() }-${index}`,
                title: name
            }));

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
            about_business: e.target?.value
        }));
    };


    useEffect(()=>{
        if(data){
            setServices(data?.services?.map(s => s.title).join(', ')||'')
            setAbout(data.about_business ||'')
        }
    },[])
    

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
                    value={services}
                    onChange={(e)=>setServices(e.target.value)}
                    onBlur={handleServicesChange}
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
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    onBlur={handleAboutChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="Leading technology solutions provider with 15+ years of experience."
                />

                <p className="mt-1 text-xs text-gray-500">
                    {data?.about_business?.length} characters
                </p>
            </div>
        </div>
    );
};

export default Services;
