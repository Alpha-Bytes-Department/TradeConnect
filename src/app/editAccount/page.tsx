'use client';

import React, { useState } from 'react';
import Basic from './components/basic';
import Contacts from './components/contacts';
import Services from './components/services';
import Images from './components/image';
import Branches from './components/branches';
import Certifications from './components/certifications';
import { Save } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '../(admin)/admin/components/common/NavBar';
import { ContactInfo, Award, LocationData,CompanyProfile,Service } from '@/app/(admin)/admin/interfaces';

/*export interface Data{
    basic:{
        name:string,
        country: string,
        address: string
    }
    contact:{
        email: string,
        phone: string,
        website: string,
    }
    services:{
        services: string,
        about: string,
    }
    images:{
        logo: File | undefined,
        banner: File | undefined,
        gallery: File[],
    }
}*/

type TabType = 'basic' | 'contact' | 'branches' | 'certification' | 'services' | 'images';


const ProfileLayout: React.FC = () => {
    // Note: State (contactInfo) and handleInputChange removed to make this a layout



    const tabs: { id: TabType; label: string }[] = [
        { id: 'basic', label: 'Basic Information' },
        { id: 'contact', label: 'Contact Information' },
        { id: 'branches', label: 'Branches' },
        { id: 'certification', label: 'Certifications' },
        { id: 'services', label: 'Services & About' },
        { id: 'images', label: 'Images' },
    ];

    




    const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'branches' | 'certification' | 'services' | 'images'>('basic')
    const [data, setData] = useState<CompanyProfile>({
        name: "Construction Partners",
        address: "989 Builder Road, Dubai, UAE",
        country: 'UAE',
        banner: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop" ,
        about:
            "We are a trusted construction company dedicated to delivering high-quality projects on time and within budget. From residential buildings to commercial developments, we focus on safety, durability, and customer satisfaction at every step.",
        contact: {
            office: {
                phone: "5656565494555",
                email: "mmislam272@gmail.com",
                website: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
            },
            contacts: [
                {
                    id: "1",
                    name: "Sample Name",
                    position: "CEO",
                    phone: "5656565494555",
                    email: "mmislam272@gmail.com",
                    isPrimary: true,
                },
                {
                    id: "2",
                    name: "Sample Name",
                    position: "CEO",
                    phone: "5656565494555",
                    email: "mmislam272@gmail.com",
                    isPrimary: false,
                },
                {
                    id: "3",
                    name: "Sample Name",
                    position: "CEO",
                    phone: "5656565494555",
                    email: "mmislam272@gmail.com",
                    isPrimary: false,
                },
            ],
        },
        services: [
            { name: "Commercial Construction" },
            { name: "Project Management" },
            {  name: "Renovation" },
            {  name: "Infrastructure" },
            { name: "Commercial Construction" },
            { name: "Project Management" },
            { name: "Renovation" },
            { name: "Infrastructure" },
            { name: "Commercial Construction" },
            { name: "Commercial Construction" },
            { name: "Project Management" },
            { name: "Renovation" },
            { name: "Infrastructure" },
            { name: "Commercial Construction" },
            { name: "Project Management" },
            { name: "Renovation" },
            { name: "Infrastructure" },
            { name: "Commercial Construction" },
        ],
        awards: [
            { id: "1", name: "Commercial Construction" },
            { id: "2", name: "Project Management" },
            { id: "3", name: "Renovation" },
            { id: "4", name: "Infrastructure" },
            { id: "11", name: "Commercial Construction" },
            { id: "21", name: "Project Management" },
            { id: "31", name: "Renovation" },
            { id: "41", name: "Infrastructure" },
            { id: "51", name: "Commercial Construction" },
            { id: "x1", name: "Commercial Construction" },
            { id: "x2", name: "Project Management" },
            { id: "x3", name: "Renovation" },
            { id: "x4", name: "Infrastructure" },
            { id: "x11", name: "Commercial Construction" },
            { id: "x21", name: "Project Management" },
            { id: "x31", name: "Renovation" },
            { id: "xx1", name: "Infrastructure" },
            { id: "x51", name: "Commercial Construction" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1541976590-713941681591?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
],
        location: [
            {
                id: '1',
                name: "Paris Office",
                address: "123 Tech Street, San Francisco, CA 94105",
                city: "San Francisco",
                country: "United States",
                email: "paris@gmail.com",
                phone: "+1 555-0123"
            },
            {
                id: '2', 
                name: "USA Office",
                address: "123 Tech Street, San Francisco, CA 94105",
                city: "San Francisco",
                country: "United States",
                email: "paris@gmail.com",
                phone: "+1 555-0123"
            }
        ],
    })


    
    const [basic, setBasic] = useState<{ name: string, address: string, country: string }>({name:data.name,address:data.address,country:data.country})
    const [contact, setContact] = useState<ContactInfo>({
        office: {
            phone: data.contact.office.phone,
            email: data.contact.office.email,
            website: data.contact.office.website,
        },
        contacts: data.contact.contacts,
    })
    const [branch, setBranch] = useState<LocationData[]>(data.location)
    const [certification, setCertification] = useState<Award[]>(data.awards)
    const [services, setServices] = useState<{about:string,services:Service[]}>({about:data.about,services:data.services})
    const [images, setImages] = useState<{ banner:string, gallery: string[] }>({ banner: data.banner, gallery: data.gallery })


    
    const handleCancel=()=>{
       
    }
    const handleSave = () => {
        setData({...data,
        name:basic.name,
        address:basic.address,
        country:basic.country,
        
        contact:contact,

        location:branch,

        about:services.about,
        services:services.services,

        banner:images.banner,
        gallery: images.gallery,


        })
    }


    
    const renderTab = () => {
        switch (activeTab) {
            case 'basic':
                return <Basic data={basic} setData={setBasic} />;

            case 'contact':
                return <Contacts data={contact} setData={setContact} />;

            case 'services':
                return <Services data={services} setData={setServices} />;

            case 'images':
                return <Images data={images} setData={setImages} />;

            case 'branches':
                return <Branches data={branch} setData={setBranch} />;

            case 'certification':
                return <Certifications data={certification} setData={setCertification} />;

            

            default:
                return null;
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 ">
            <SidebarProvider>
                <div className="w-full ">
                    <Navbar/>
                    <div className="max-w-7xl mx-auto mt-12">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-semibold text-gray-900 mb-2">Edit Profile</h1>
                            <p className="text-lg text-gray-600">Update your business information and images</p>
                        </div>

                        {/* Card Container */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <div className="flex flex-wrap">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-1 px-6 py-4 text-base font-medium transition-colors relative ${activeTab === tab.id
                                                ? 'text-blue-600'
                                                : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            {tab.label}
                                            {activeTab === tab.id && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-2 md:p-4">




                                {renderTab()}





                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row gap-4 mt-8 ">
                            <button
                                onClick={handleSave}
                                className="fc gap-2 px-6 py-3 bg-[#327EF9] text-white rounded-lg hover: font-medium gl"
                            >
                                <Save />
                                Save Changes
                            </button>

                            <button
                                onClick={handleCancel}
                                className="fc gap-2 px-6 py-3 bg-[#B3261E] text-white rounded-lg hover: font-medium hover: glr"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Cancel
                            </button>
                        </div>

                        {/* Info Note */}
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                                <span className="font-semibold">Note:</span> Your profile information is visible to
                                all logged-in users in the directory. Make sure all information is accurate and
                                up-to-date.
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default ProfileLayout;