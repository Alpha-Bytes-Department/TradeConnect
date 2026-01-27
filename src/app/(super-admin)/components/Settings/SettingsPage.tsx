// Fahim
"use client"
import { Input } from "@/components/ui/input";
import api from "@/lib/axiosInterceptor";
import axios from "axios";
import { ArchiveRestore, Bookmark, Camera, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


type SettingsFormData = {
    fullName: string;
    phoneNumber: string;
};

export default function SettingsPage() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<SettingsFormData>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
        },
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const userName = localStorage.getItem('user_name') || '';
        const userEmail = localStorage.getItem('user_email') || '';
        const userPhone = localStorage.getItem('user_phone') || '';
        const userPhoto = localStorage.getItem('user_photo') || '';

        setValue('fullName', userName);
        setValue('phoneNumber', userPhone);
        setProfileImageUrl(userPhoto);
    }, [setValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create preview URL and update profileImageUrl immediately
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submit handler - sends data to backend
    const onSubmit = async (data: SettingsFormData) => {
        setIsLoading(true);
        try {
            // Prepare form data for backend
            const formData = new FormData();
            formData.append('full_name', data.fullName);
            formData.append('phone_number', data.phoneNumber);

            // Add profile image if changed
            if (imageFile) {
                formData.append('profile_image', imageFile);
            }

            // Send data to backend
            const response = await api.put('/api/auth/profile/',
                formData
            );
            console.log("Full Backend Response:", response?.data);

            // Update localStorage with new values
            localStorage.setItem('user_name', data.fullName);
            localStorage.setItem('user_phone', data.phoneNumber);

            let photoUrl = null;

            if (response?.data?.user?.profile_image) {
                photoUrl = response.data.user.profile_image;
            }

            if (photoUrl) {
                localStorage.setItem('user_photo', photoUrl);
                setProfileImageUrl(photoUrl);
                console.log("Photo URL saved:", photoUrl);
            } else {
                console.warn("Photo URL not found in response. Response structure:", response.data);
            }

            // Clear the selected file after successful upload
            setImageFile(null);
            console.log("Settings saved successfully!");
            window.location.reload(); // Simple reload
            toast.success("Settings saved!", {
                description: "Your profile information has been updated successfully.",
            });
        }
        catch (error) {
            console.error("Error updating profile:", error);
            if (axios.isAxiosError(error)) {
                console.error("Response data:", error.response?.data);
                console.error("Response status:", error.response?.status);
            }
            console.log("Failed to save settings. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };

    // Reset handler - reloads data from localStorage
    const handleReset = () => {
        const userName = localStorage.getItem('user_name') || '';
        const userEmail = localStorage.getItem('user_email') || '';
        const userPhone = localStorage.getItem('user_phone') || '';
        const userPhoto = localStorage.getItem('user_photo') || '';

        setValue('fullName', userName);
        setValue('phoneNumber', userPhone);
        setProfileImageUrl(userPhoto);
        setImageFile(null);

        console.log("Settings reset to saved values!");
    };

    // Export CSV handler
    // Updated Export CSV handler - for when API returns CSV string directly
    const handleExportCSV = async () => {
        try {
            // Show loading state (optional)
            console.log("Exporting CSV...");

            const response = await api.get('/api/business/export/csv/');

            console.log("API Response:", response?.data);

            // Since API returns CSV string directly, use it as is
            const csvContent = response.data;

            // Create blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', `businesses_export_${new Date().getTime()}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL object
            URL.revokeObjectURL(url);

            console.log("CSV exported successfully!");
            // ("CSV file downloaded successfully!");

        }
        catch (error) {
            console.error("Export failed:", error);
            if (axios.isAxiosError(error)) {
                console.error("Response data:", error.response?.data);
                console.error("Response status:", error.response?.status);
            }
            // alert("Failed to export CSV");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Admin Profile Information */}
            <div className="bg-[#FFFFFF] mt-5 p-4 rounded-md">
                <div className="flex gap-3">
                    <div className="bg-[#DBBFFF] w-11 h-11 rounded-lg flex items-center justify-center">
                        <Database className="text-[#8A38F5] w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-poppins font-medium text-[#313131]">Admin Profile Information</h1>
                        <p className="font-poppins text-[#626262] text-xs">Update your admin account details</p>
                    </div>
                </div>

                <div className="relative w-32 h-32 mt-5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-300 border-2 border-white shadow-lg">
                        <img
                            src={profileImageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-gray-800 hover:bg-gray-700 rounded-full p-2 cursor-pointer transition-colors shadow-lg">
                        <Camera className="w-5 h-5 text-white" />
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <p className="font-poppins text-[#515151] mt-3">Profile Image</p>
                {imageFile && (
                    <p className="font-poppins text-[#327EF9] text-xs mt-1">
                        New photo selected: {imageFile.name}
                    </p>
                )}

                <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                    <div className="w-full grid gap-2 items-center mt-6">
                        <label htmlFor="fullName" className="font-poppins text-[#252525]">Full Name</label>
                        <div className="w-full">
                            <Input
                                type="text"
                                id="fullName"
                                placeholder="Admin User"
                                className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                {...register("fullName")}
                            />
                        </div>
                    </div>
                    <div className="w-full grid gap-2 items-center mt-6">
                        <label htmlFor="emailAddress" className="font-poppins text-[#252525]">Email</label>
                        <div className="w-full">
                            <Input
                                disabled
                                type="email"
                                id="emailAddress"
                                placeholder="admin@business.com"
                                className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                    <div className="w-full grid gap-2 items-center mt-4">
                        <label htmlFor="phoneNumber" className="font-poppins text-[#252525]">Phone</label>
                        <div className="w-full">
                            <Input
                                type="text"
                                id="phoneNumber"
                                placeholder="+1234567890"
                                className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                {...register("phoneNumber")}
                            />
                        </div>
                    </div>
                    <div className="w-full grid gap-2 items-center mt-4">
                        <label htmlFor="role" className="font-poppins text-[#252525]">Role</label>
                        <div className="w-full">
                            <Input
                                disabled
                                type="text"
                                placeholder="Super Admin"
                                className="font-poppins"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Backup & Export */}
            <div className="bg-[#FFFFFF] mt-5 p-4 rounded-md">
                <div className="flex gap-3">
                    <div className="bg-[#BFFDBA] w-11 h-11 rounded-lg flex items-center justify-center">
                        <Database className="text-[#279300] w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-poppins font-medium text-[#313131]">Backup & Export</h1>
                        <p className="font-poppins text-[#626262] text-xs">Data management options (placeholder)</p>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex justify-between items-center p-2 rounded-lg mt-5">
                    <div>
                        <h1 className="font-poppins text-[#000000]">Export All Businesses</h1>
                        <p className="font-poppins text-[#7A7A7A] text-xs">Download CSV file with all business data</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="font-poppins bg-[#327EF9] text-[#EBF2FE] px-2 py-1 rounded-md cursor-pointer"
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                <button type="submit" disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-[#327EF9] text-[#EBF2FE] 
                    font-poppins px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 
                    disabled:cursor-not-allowed"
                >
                    <Bookmark className="text-[#EBF2FE] w-5 h-5" />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
                <button type="button" onClick={handleReset}
                    className="flex items-center justify-center gap-2 bg-[#B3261E] text-[#EBF2FE] 
                    font-poppins px-4 py-2 rounded-lg cursor-pointer"
                >
                    <ArchiveRestore className="text-[#EBF2FE] w-5 h-5" />
                    Reset to Defaults
                </button>
            </div>
        </form>
    );
}

