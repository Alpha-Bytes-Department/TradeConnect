"use client";

import React, { useEffect, useState } from "react";
import Basic from "./components/basic";
import Contacts from "./components/contacts";
import Services from "./components/services";
import Images from "./components/image";
import Branches from "./components/branches";
import Certifications from "./components/certifications";
import { ArrowLeft, Save } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "../(admin)/admin/components/common/NavBar";
import {
    ContactInfo,
    Award,
    LocationData,
    CompanyProfile,
    Service,
} from "@/app/(admin)/admin/interfaces";
import { useRouter } from "next/navigation";
import api from "../api";

type TabType =
    | "basic"
    | "contact"
    | "branches"
    | "certification"
    | "services"
    | "images";

const ProfileLayout: React.FC = () => {
    // Note: State (contactInfo) and handleInputChange removed to make this a layout

    interface Country {
        id: string;
        name: string;
        flag: string;
    }

    interface Service {
        id: string;
        title: string|undefined;
    }

    interface Branch {
        id: string;
        full_name: string;
        address: string;
        city: string;
        country: Country;
        phone_number: string;
    }

    interface Contact {
        id: string;
        full_name: string;
        email: string;
        phone_number: string;
        role: string;
        custom_role: string | null;
        is_primary: boolean;
    }

    interface Certification {
        id: string;
        name: string;
    }

    interface GalleryItem {
        id: string;
        image: string;
    }

    interface Business {
        id: string;
        user_email: string;
        user_full_name: string;
        business_name: string;
        phone_number: string;
        country: Country;
        full_address: string;
        website: string;
        membership_valid_till: string; // ISO date string
        services: Service[];
        branches: Branch[];
        contacts: Contact[];
        certifications: Certification[];
        about_business: string;
        logo: string;
        gallery: GalleryItem[];
        is_locked: boolean;
        created_at: string; // ISO date string
        updated_at: string; // ISO date string
    }

    interface ApiResponse {
        success: boolean;
        business: Business;
    }

    const router = useRouter();
    //const id = localStorage.getItem('n1X_ang@xinl23446')

    

    const tabs: { id: TabType; label: string }[] = [
        { id: "basic", label: "Basic Information" },
        { id: "contact", label: "Contact Information" },
        { id: "branches", label: "Branches" },
        { id: "certification", label: "Certifications" },
        { id: "services", label: "Services & About" },
        { id: "images", label: "Images" },
    ];

    const [activeTab, setActiveTab] = useState<
        "basic" | "contact" | "branches" | "certification" | "services" | "images"
    >("basic");
    const [data, setData] = useState<Business | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error,setError]=useState(false)

    const [basic, setBasic] = useState<any>({
        business_name: data?.business_name || "",
        full_address: data?.full_address || "",
        country: data?.country || {
            id: '',
            name: "",
            flag: '',
        },
    });
    const [contact, setContact] = useState<any>({
        office: {
            phone: data?.phone_number ? data?.phone_number : "",
            email: data?.user_email ? data?.user_email : "",
            website: data?.website ? data?.website : "",
        },
        contacts: data?.contacts ? data?.contacts : [],
    });
    const [branch, setBranch] = useState<Branch[]>([]);
    const [certification, setCertification] = useState(
        data?.certifications || []
    );
    const [services, setServices] = useState({
        about_business: data?.about_business ? data?.about_business : "",
        services: data?.services ? data?.services : [],
    });
    const [images, setImages] = useState({
        logo: data?.logo ? data?.logo : "",
        gallery: data?.gallery ? data?.gallery : [],
    });

    useEffect(() => {
        if (data) {
            setBasic({
                business_name: data.business_name,
                full_address: data.full_address,
                country: data.country,
            });
            setContact({
                office: {
                    phone: data.phone_number,
                    email: data.user_email,
                    website: data.website,
                },
                contacts: data.contacts,
            });
            setBranch(data.branches);
            setCertification(data.certifications);
            setServices({
                about_business: data.about_business,
                services: data?.services,
            });
            setImages({
                logo: data.logo,
                gallery: data.gallery,
            });
        }
    }, [data]);

    const handleCancel = () => { };
    /*
    ---------previous--------------------
    
    const handleSave = () => {
        setData({
            ...data,
            business_name: basic.business_name,
            full_address: basic.full_address,
            country: basic.country,

            contacts: contact.contacts,

            branches: branch.map((prev: any) => {
                return { ...prev, id: prev.id, city: prev.city, country: prev.country };
            }),

            about_business: services.about_business || "",
            services: services.services || [],

            logo: images.logo,
            gallery: images.gallery || [],

            phone_number: contact.office.phone,
            user_email: contact.office.email,
            website: contact.office.website,

            certifications: certification?.map((c) => c),
        });
    };



    */



    const handleSave = async () => {
        // 1. Construct the payload carefully
        const payload: Business = {
            ...data, // Keep existing ID and metadata
            business_name: basic.business_name || '',
            full_address: basic.full_address || '',
            country: basic.country || {},

            // Ensure office info is correctly nested
            phone_number: contact.office.phone || '',
            user_email: contact.office.email || '',
            website: contact.office.website || '',

            // Clean up arrays - ensure they are actually arrays before mapping
            contacts: (contact.contacts || []).map((c: any) => ({ ...c })),

            // Fix: 'branch' was potentially a nested array [[...]], so we flatten it
            branches: (branch || []).flat().map((b: any) => ({...b,
                id: b.id,
                city: b.city,
                country: b.country
            })),

            about_business: services.about_business || '',
            services: services.services || [],

            logo: images.logo || '',
            gallery: images.gallery || [],
            certifications: (certification || []).map((c: any) => c),
        };

        setData(payload);

       /* try {
            console.log("Sending Payload:", payload);
            // 2. Perform the API update
            const res = await api.put(`business/my/update/`, payload);

            if (res.status === 200) {
                setData(payload); // Update local data with the saved version
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Save failed:", err);
            alert("Failed to save changes.");
        }

        */
    };

    const renderTab = () => {
        switch (activeTab) {
            case "basic":
                return <Basic data={basic} setData={setBasic} />;

            case "contact":
                return <Contacts data={contact} setData={setContact} />;

            case "services":
                return <Services data={services} setData={setServices} />;

            case "images":
                return <Images data={images} setData={setImages} />;

            case "branches":
                return <Branches data={branch} setData={setBranch} />;

            case "certification":
                return (
                    <Certifications data={certification} setData={setCertification} />
                );

            default:
                return null;
        }
    };

    useEffect(() => {
        let controller = new AbortController();

        const fetchUsers = async () => {
            try {
                if (controller) {
                    const res: any = await api.get(`business/my/`, {
                        signal: controller.signal,
                    });


                    if(res){
                       setData(res?.business); 
                       setIsLoading(false)
                    }

                    
                }
            } catch (err: any) { 
                setError(true)
            }
        };

        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);

    console.log(
        "**************************************************************",
        data
    );


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Error loading profile</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 ">
            <SidebarProvider>
                <div className="w-full ">
                    <Navbar />
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
                                <p className="text-blue-900 text-md font-semibold">Back</p>
                            </button>
                            <h1 className="text-4xl font-semibold text-gray-900 mb-2">
                                Edit Profile
                            </h1>
                            <p className="text-lg text-gray-600">
                                Update your business information and images
                            </p>
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
                                                    ? "text-blue-600"
                                                    : "text-gray-600 hover:text-gray-900"
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
                            <div className="p-2 md:p-4">{renderTab()}</div>
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
                                <span className="font-semibold">Note:</span> Your profile
                                information is visible to all logged-in users in the directory.
                                Make sure all information is accurate and up-to-date.
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default ProfileLayout;
