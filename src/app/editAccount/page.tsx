'use client';

import React, { useState } from 'react';
import Basic from './components/basic';
import Contacts from './components/contacts';
import Services from './components/services';
import Images from './components/image';

export interface EditData{
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
}

type TabType = 'basic' | 'contact' | 'services' | 'images';


const ProfileLayout: React.FC = () => {
    // Note: State (contactInfo) and handleInputChange removed to make this a layout



    const tabs: { id: TabType; label: string }[] = [
        { id: 'basic', label: 'Basic Information' },
        { id: 'contact', label: 'Contact Information' },
        { id: 'services', label: 'Services & About' },
        { id: 'images', label: 'Images' },
    ];

    const [activeTab,setActiveTab]=useState<string>('basic')
    const [editData, setEditData] = useState<EditData>({
        basic: {
            name: 'stringyyyyy',
            country: 'string',
            address: 'string'
        },
    contact: {
            email: 'string',
            phone: 'string',
            website: 'string',
        },
    services: {
            services: 'string',
            about: 'string',
        },
    images: {
        logo: new File(
            ['fake image content'],
            'logo.png',
            { type: 'image/png' }
        ),
        banner: new File(
            ['fake image content'],
            'logo.png',
            { type: 'image/png' }
        ),
            gallery: [],
        },
    })



    const handleSave=()=>{
    

        setEditData({
            basic: {
                name: '',
                country: '',
                address: ''
            },
            contact: {
                email: '',
                phone: '',
                website: '',
            },
            services: {
                services: '',
                about: '',
            },
            images: {
                logo: undefined,
                banner: undefined,
                gallery: [],
            },
        })
    }   


    const handleCancel=()=>{
       setEditData({
            basic: {
                name: '',
                    country: '',
                        address: ''
            },
            contact: {
                email: '',
                    phone: '',
                        website: '',
        },
            services: {
                services: '',
                    about: '',
        },
            images: {
                logo: undefined,
                banner: undefined,
                gallery: [],
        },
        })
    }

    const renderTab = () => {
        switch (activeTab) {
            case 'basic':
                return <Basic editData={editData} setEditData={setEditData} />;

            case 'contact':
                return <Contacts editData={editData} setEditData={setEditData} />;

            case 'services':
                return <Services editData={editData} setEditData={setEditData} />;

            case 'images':
                return <Images editData={editData} setEditData={setEditData} />;

            default:
                return null;
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 p-2 md:p-4">
            <div className="max-w-7xl mx-auto">
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
                        className="fc gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium gl"
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
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                            />
                        </svg>
                        Save Changes
                    </button>

                    <button
                        onClick={handleCancel}
                        className="fc gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium glr"
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
    );
};

export default ProfileLayout;