'use client';

import React, { useEffect, useState } from 'react';
import Basic from './components/basic';
import Contacts from './components/contacts';
import Services from './components/services';
import Images from './components/image';
import Branches from './components/branches';
import Certifications from './components/certifications';
import { ArrowLeft, Save } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '../(admin)/admin/components/common/NavBar';
import { ContactInfo, Award, LocationData,CompanyProfile,Service } from '@/app/(admin)/admin/interfaces';
import { useRouter } from 'next/navigation';
import api from '../api';



type TabType = 'basic' | 'contact' | 'branches' | 'certification' | 'services' | 'images';


const ProfileLayout: React.FC = () => {
    // Note: State (contactInfo) and handleInputChange removed to make this a layout


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
        email:string;
        contacts:Contact[];
        branch_locations:LocationData[];
        certifications:Award[];
        gallery:{id: string;
            image: string;
        }[];
    }

const router = useRouter();
    const id = localStorage.getItem('n1X_ang@xinl23446')

    const tabs: { id: TabType; label: string }[] = [
        { id: 'basic', label: 'Basic Information' },
        { id: 'contact', label: 'Contact Information' },
        { id: 'branches', label: 'Branches' },
        { id: 'certification', label: 'Certifications' },
        { id: 'services', label: 'Services & About' },
        { id: 'images', label: 'Images' },
    ];

    




    const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'branches' | 'certification' | 'services' | 'images'>('basic')
    const [data, setData] = useState<CompanyProfile>()





    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            if (!id) return;

            try {
               
                const response: any = await api.get(`business/all/`, {
                    signal: controller.signal
                });



                const data = response.results.businesses.find((b: any) => b.id === id);
                setData(data);

            } catch (err: any) {
                if (err.name !== 'CanceledError') {
                   

                }
            }
        };

        fetchData();


        return () => controller.abort();
    }, [id]); 

 console.log('**************************************************************',id)
    
    const [basic, setBasic] = useState<{ name?: string, address?: string, country?: string }>({ name: data?.title,address:data?.location,country:data?.country})
    const [contact, setContact] = useState<any>({
        office: {
            phone: data?.phone,
            email: data?.email,
            website: data?.website,
        },
        contacts: data?.contacts,
    })
    const [branch, setBranch] = useState<any>(data?.branch_locations)
    const [certification, setCertification] = useState(data?.certifications)
    const [services, setServices] = useState({about:data?.description,services:data?.services})
    const [images, setImages] = useState({ banner: data?.headerImage, gallery: data?.gallery })


    
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
                    <div className="max-w-full px-24 mx-auto mt-4">

                       
                        {/* Header */}
                        <div className="mb-8">
                             <button
                            className="fc h-10 p-4 bg-blue-200 border-blue-400 rounded-lg gap-2 mb-10"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <ArrowLeft color={"#001a81ff"} />
                            <p className="text-blue-900 text-md font-semibold">
                                Back
                            </p>
                        </button>
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