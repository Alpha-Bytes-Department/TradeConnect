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

import { useRouter } from "next/navigation";
import api from "../../../../api";

// --- Interfaces ---
interface Country { id: string; name: string; flag: string; }
interface Service { id: string; title: string | undefined; }
interface Branch { id: string; full_name: string; address: string; city: string; country: Country; phone_number: string; }
interface Contact { id: string; full_name: string; email: string; phone_number: string; role: string; custom_role: string | null; is_primary: boolean; }
interface Certification { id: string; name: string; }
interface GalleryItem { id: string; image: string; }

interface Business {
    id: string;
    user_email: string;
    user_full_name: string;
    business_name: string;
    phone_number: string;
    country: Country;
    full_address: string;
    website: string;
    membership_valid_till: string;
    services: Service[];
    branches: Branch[];
    contacts: Contact[];
    certifications: Certification[];
    about_business: string;
    logo: string;
    gallery: GalleryItem[];
    is_locked: boolean;
    created_at: string;
    updated_at: string;
}

type TabType = "basic" | "contact" | "branches" | "certification" | "services" | "images";

const ProfileLayout: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("basic");
    const [data, setData] = useState<Business | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(false);

    // Sub-states for tabs
    const [basic, setBasic] = useState<any>({ business_name: "", full_address: "", country: { id: '', name: "", flag: '' } });
    const [contact, setContact] = useState<any>({ office: { phone: "", email: "", website: "" }, contacts: [] });
    const [branch, setBranch] = useState<Branch[]>([]);
    const [certification, setCertification] = useState<Certification[]>([]);
    const [services, setServices] = useState({ about_business: "", services: [] as Service[] });
    const [images, setImages] = useState({ logo: "", gallery: [] as GalleryItem[] });
    const [cache, setCache] = useState<boolean>(true)

    const tabs: { id: TabType; label: string }[] = [
        { id: "basic", label: "Basic Information" },
        { id: "contact", label: "Contact Information" },
        { id: "branches", label: "Branches" },
        { id: "certification", label: "Certifications" },
        { id: "services", label: "Services & About" },
        { id: "images", label: "Images" },
    ];

    // Sync sub-states when main data is fetched
    useEffect(() => {
        if (data) {
            setBasic({
                business_name: data.business_name || "",
                full_address: data.full_address || "",
                country: data.country || { id: '', name: "", flag: '' },
            });
            setContact({
                office: {
                    phone: data.phone_number || "",
                    email: data.user_email || "",
                    website: data.website || "",
                },
                contacts: data.contacts || [],
            });
            setBranch(data.branches || []);
            setCertification(data.certifications || []);
            setServices({
                about_business: data.about_business || "",
                services: data.services || [],
            });
            setImages({
                logo: data.logo || "",
                gallery: data.gallery || [],
            });
        }
    }, [data]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchProfile = async () => {
            try {
                const res: any = await api.get(`business/my/`, { signal: controller.signal });
                if (res && res.data.business) {
                    setData(res.data.business);
                }
                setIsLoading(false);
            } catch (err: any) {
                if (err.name !== 'CanceledError') {
                    //setError(true);
                    //setIsLoading(false);
                }
            }
        };
        fetchProfile();
        return () => controller.abort();
    }, []);

/*    const handleSave = async () => {
        setIsSaving(true);
        // Construct payload from sub-states
        const payload = {
            business_name: basic.business_name,
            full_address: basic.full_address,
            country: basic.country?.id ? basic.country.id : basic.country, // Handle object or ID
            phone_number: contact.office.phone,
            user_email: contact.office.email,
            website: contact.office.website,
            contacts: contact.contacts,
            branches: branch.flat(),
            about_business: services.about_business,
            services: services.services,
            certifications: certification,
            logo: images.logo,
            gallery: images.gallery
        };

        try {
            // PATCH request to specific endpoint
            const res: any = await api.patch(`business/${data?.id}/update/`, {
                business_name: payload.business_name,
                full_address: payload.full_address,
                country: payload.country?.id ? payload.country.id : payload.country, // Handle object or ID
                phone_number: payload.phone_number,
                user_email: payload.user_email,
                website: payload.website,
                about_business: payload.about_business,
                services: payload.services.map((s: any) => s.title).join(','),
                certifications: payload.certifications.map((s: any) => s.id),
                ...(payload?.logo instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(payload.logo.type)
                    ? { logo: payload.logo }
                    : payload.logo === null
                        ? { logo: null }
                        : {} // Omitted from payload if it's an existing string/URL
                ),
               
});

            if (res) {
                // Update local data with backend response to reflect new ID/timestamps
                setData(res.business || { ...data, ...payload });
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Save failed:", err);
            alert("Failed to save changes. Please check your connection.");
        } finally {
            setIsSaving(false);
        }
    };
*/
    const normalizeArray = (arr: any[]) =>
        JSON.stringify([...arr].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))));

    const isFile = (v: any) => typeof File !== "undefined" && v instanceof File;


    function hasProfileChanges({
        data,
        basic,
        contact,
        branch,
        certification,
        services,
        images,
    }: {
        data: Business;
        basic: any;
        contact: any;
        branch: Branch[];
        certification: Certification[];
        services: { about_business: string; services: Service[] };
        images: { logo: any; gallery: any[] };
    }): boolean {
        if (!data) return false;

        /* ---------- BASIC ---------- */
        if (
            basic.business_name !== data.business_name ||
            basic.full_address !== data.full_address ||
            (basic.country?.id ?? basic.country) !== data.country?.id
        ) return true;

        /* ---------- CONTACT ---------- */
        if (
            contact.office.phone !== data.phone_number ||
            contact.office.email !== data.user_email ||
            contact.office.website !== data.website
        ) return true;

        const originalContacts = (data.contacts || []).map(c => ({
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            phone_number: c.phone_number,
            role: c.role,
            custom_role: c.custom_role,
            is_primary: c.is_primary,
        }));

        const currentContacts = (contact.contacts || []).map((c: any) => ({
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            phone_number: c.phone_number,
            role: c.role,
            custom_role: c.custom_role,
            is_primary: c.is_primary,
        }));

        if (normalizeArray(originalContacts) !== normalizeArray(currentContacts)) return true;

        /* ---------- BRANCHES ---------- */
        const originalBranches = (data.branches || []).map(b => ({
            id: b.id,
            full_name: b.full_name,
            address: b.address,
            city: b.city,
            country: b.country?.id,
            phone_number: b.phone_number,
        }));

        const currentBranches = (branch || []).map(b => ({
            id: b.id,
            full_name: b.full_name,
            address: b.address,
            city: b.city,
            country: b.country?.id,
            phone_number: b.phone_number,
        }));

        if (normalizeArray(originalBranches) !== normalizeArray(currentBranches)) return true;

        /* ---------- CERTIFICATIONS ---------- */
        const originalCerts = (data.certifications || []).map(c => c.id);
        const currentCerts = (certification || []).map(c => c.id ?? c);

        if (normalizeArray(originalCerts) !== normalizeArray(currentCerts)) return true;

        /* ---------- SERVICES ---------- */
        if (services.about_business !== data.about_business) return true;

        const originalServices = (data.services || []).map(s => s.title);
        const currentServices = (services.services || []).map(s => s.title);

        if (normalizeArray(originalServices) !== normalizeArray(currentServices)) return true;

        /* ---------- IMAGES ---------- */
        // Logo: new file OR cleared
        if (
            (isFile(images.logo)) ||
            (images.logo === null && data.logo !== null)
        ) return true;

        // Gallery: new files added
        const newGalleryFiles = images.gallery.some(item => isFile(item));
        if (newGalleryFiles) return true;

        return false;
    }



    const handleSave = async () => {
        setIsSaving(true);
        const formData = new FormData();

        // 1. Basic Text Fields
        formData.append("business_name", basic.business_name || "");
        formData.append("full_address", basic.full_address || "");
        formData.append("phone_number", contact.office.phone || "");
        formData.append("user_email", contact.office.email || "");
        formData.append("website", contact.office.website || "");
        formData.append("about_business", services.about_business || "");

        // 2. Handle Country (Send as a single string ID)
        const countryId =  basic?.country?.id;
        if (countryId) formData.append("country", countryId);

        // 3. FIX: Handle Certifications (ManyToMany)
        // We must append each ID individually to the same key
        certification.forEach((cert: any) => {
            const id = cert.id || cert;
            if (id) formData.append("certifications", id);
        });

        // 4. Handle Services 
        // If your backend expects a list of IDs/Titles, append individually:
        
            
        formData.append("services", services.services.map((s: any) => s.title).join(', '));
        ;

        // 5. FIX: Logo Logic
        // Only send if it's a new file. If null, send null/empty to clear it.
        if (images?.logo instanceof File) {
            formData.append("logo", images.logo);
        } else if (images.logo === null) {
            formData.append("logo", ""); // Backend sees this as clearing the file
        }
        // Note: If images.logo is a URL (string), we don't append it, 
        // so PATCH won't overwrite the existing image on the server.

        // 6. Handle Gallery (Multiple Files)
        images.gallery.forEach((item: any) => {
            if (item instanceof File) {
                formData.append("gallery", item);
            }
        });

        try {
            const res: any = await api.patch(`business/${data?.id}/update/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res) {
                // Update the main data state with the response from server
                setData(res.data.business || { ...data, ...Object.fromEntries(formData) });
                alert("Profile updated successfully!");
            }
        } catch (err: any) {
            console.error("Save failed:", err.response?.data || err);
            const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : "Check your connection.";
            alert(`Failed to save changes: ${errorMsg}`);
        } finally {
            setIsSaving(false);
        }
    };
    const reloadGalleryFromAPI = async () => {
        try {
            // Add cache-busting parameter to ensure fresh data
            const timestamp = new Date().getTime();
            const response = await api.get(`business/my/`);
            if (response.data) {
                // Check if gallery exists in response, otherwise default to empty array
                const gallery = response.data.business.gallery || [];


                setData((prev: any) => ({
                    ...prev,
                    gallery: gallery,
                }));
                console.log('Gallery reloaded:', gallery.length, 'images');
            }
        } catch (error) {
            console.error('Error reloading gallery:', error);
        }
    };



    const handleCancel = () => {
        // Simple refresh to discard changes
        //window.location.reload();
        router.back()
    };

    const renderTab = () => {
        switch (activeTab) {
            case "basic": return <Basic data={basic} setData={setBasic} />;
            case "contact": return <Contacts data={contact} setData={setContact} />;
            case "services": return <Services data={services} setData={setServices} />;
            case "images": return <Images data={images} setData={setImages} />;
            case "branches": return <Branches data={branch} setData={setBranch} />;
            case "certification": return <Certifications data={certification} setData={setCertification} />;
            default: return null;
        }
    };

    useEffect(()=>{
        const hasChanges = hasProfileChanges({
            data,
            basic,
            contact,
            branch,
            certification,
            services,
            images,
        });

        setCache(!hasChanges)

    }, [data,
        basic,
        contact,
        branch,
        certification,
        services,
        images])

   

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error || !data) return <div className="min-h-screen flex items-center justify-center">Error loading profile</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <SidebarProvider>
                <div className="w-full">
                    <div className="max-w-full px-4 md:px-24 mx-auto mt-4">
                        {/* Header */}
                        <div className="mb-8">
                            <button
                                className="fc h-10 p-4 bg-blue-200 border-blue-400 rounded-lg gap-2 mb-10 flex items-center"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft size={20} color={"#001a81ff"} />
                                <p className="text-blue-900 text-md font-semibold">Back</p>
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
                                            className={`flex-1 px-4 py-4 text-sm md:text-base font-medium transition-colors relative ${activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            {tab.label}
                                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-4 md:p-6">{renderTab()}</div>
                        </div>

                        {/* Action Buttons */}


                        <div className="flex flex-col md:flex-row gap-4 mt-8">
                            <button
                                onClick={handleSave}
                                disabled={ isSaving || cache}
                                className={`flex items-center justify-center gap-2 px-6 py-3 bg-[#327EF9] text-white rounded-lg font-medium transition-opacity ${isSaving || cache ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            >
                                <Save size={20} />
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>

                            <button
                                onClick={handleCancel}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#B3261E] text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </button>
                        </div>

                        {/* Info Note */}
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-10">
                            <p className="text-sm text-blue-900">
                                <span className="font-semibold">Note:</span> Your profile information is visible to all logged-in users in the directory. Make sure all information is accurate and up-to-date.
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default ProfileLayout;