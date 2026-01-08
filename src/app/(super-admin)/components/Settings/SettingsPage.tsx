// Fahim
"use client"
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArchiveRestore, Bookmark, Camera, Database } from "lucide-react";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const settingsSchema = z.object({
    maintenanceMode: z.boolean(),
    directoryName: z.string().min(1, "Directory name is required"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    emailAddress: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(6, "Phone number must be at least 6 characters"),
    role: z.string(),
});

// Type inference from schema
type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
    const [image, setImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop');
    const [isEditingDirectory, setIsEditingDirectory] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Initialize React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            maintenanceMode: false,
            directoryName: "TradeConnect",
            fullName: "",
            emailAddress: "",
            phoneNumber: "",
            role: "Super Admin",
        },
    });

    // Watch maintenance mode value
    const maintenanceMode = watch("maintenanceMode");
    const directoryName = watch("directoryName");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); // Store the file
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submit handler
    const onSubmit = (data: SettingsFormData) => {
        console.log("Form Data:", data);
        console.log("Profile Image:", imageFile);
        // TODO: Send data to backend
    };

    // Reset handler
    const handleReset = () => {
        reset();
        setImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop');
        setIsEditingDirectory(false);
        alert("Settings reset to defaults!");
    };

    // Export CSV handler (backend call)
    const handleExportCSV = async () => {
        try {
            // TODO: Replace with actual backend endpoint
            console.log("Exporting CSV...");
            // const response = await fetch('/api/export-businesses', { method: 'GET' });
            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'businesses.csv';
            // a.click();
            alert("CSV export initiated (backend integration needed)");
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export CSV");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* General Settings */}
            <div className="bg-[#FFFFFF] mt-5 p-4 rounded-md">
                <div className="flex gap-3">
                    <div className="bg-[#BFD7FD] w-11 h-11 rounded-lg flex items-center justify-center">
                        <IoInformationCircleOutline className="text-[#2459B1] w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="font-poppins font-medium text-[#313131]">General Settings</h1>
                        <p className="font-poppins text-[#626262] text-xs">Configure system-wide
                            settings</p>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex justify-between items-center p-2 rounded-lg mt-5">
                    <div>
                        <h1 className="font-poppins text-[#000000]">Maintenance Mode</h1>
                        <p className="font-poppins text-[#7A7A7A] text-xs">Temporarily disable public
                            access</p>
                    </div>
                    <Switch className="cursor-pointer" checked={maintenanceMode}
                        onCheckedChange={(checked) => setValue("maintenanceMode", checked)} />
                </div>
                {/* <div className="bg-[#EEEEEE] flex justify-between items-center p-2 rounded-lg mt-5">
                    <div>
                        <h1 className="font-poppins text-[#000000]">Directory Name</h1>
                        <p className="font-poppins text-[#7A7A7A] text-xs">TradeConnect</p>
                    </div>
                    <button className="border-2 border-[#CAC4D0] font-poppins text-[#327EF9] 
                    px-2 py-1 rounded-md cursor-pointer">Edit</button>
                </div> */}
                <div className="bg-[#EEEEEE] flex justify-between items-center p-2 rounded-lg mt-5">
                    <div className="flex-1">
                        <h1 className="font-poppins text-[#000000]">Directory Name</h1>
                        {isEditingDirectory ? (
                            <Input
                                type="text"
                                {...register("directoryName")}
                                className="font-poppins text-[#7A7A7A] text-xs mt-1 h-8"
                            />
                        ) : (
                            <p className="font-poppins text-[#7A7A7A] text-xs">{directoryName}</p>
                        )}
                        {errors.directoryName && (
                            <p className="text-red-500 text-xs font-poppins mt-1">
                                {errors.directoryName.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsEditingDirectory(!isEditingDirectory)}
                        className="border-2 border-[#CAC4D0] font-poppins text-[#327EF9] 
                        px-2 py-1 rounded-md cursor-pointer"
                    >
                        {isEditingDirectory ? "Done" : "Edit"}
                    </button>
                </div>
            </div>


            {/* Admin Profile Information */}
            <div className="bg-[#FFFFFF] mt-5 p-4 rounded-md">
                <div className="flex gap-3">
                    <div className="bg-[#DBBFFF] w-11 h-11 rounded-lg flex items-center justify-center">
                        <Database className="text-[#8A38F5] w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-poppins font-medium text-[#313131]">Admin Profile
                            Information</h1>
                        <p className="font-poppins text-[#626262] text-xs">Update your admin account
                            details</p>
                    </div>
                </div>

                <div className="relative w-32 h-32 mt-5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-300 border-2 
                        border-white shadow-lg">
                        <img
                            src={image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Uploading new photo from here */}
                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-gray-800 
                        hover:bg-gray-700 rounded-full p-2 cursor-pointer transition-colors shadow-lg"
                    >
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

                <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                    <div className="w-full grid gap-2 items-center mt-6">
                        <label htmlFor="fullName" className="font-poppins text-[#252525]">
                            Full Name</label>
                        <div className="w-full">
                            <Input type="text" id="fullName" placeholder="Admin User"
                                className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                {...register("fullName")}
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-red-500 text-sm font-poppins mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full grid gap-2 items-center mt-6">
                        <label htmlFor="emailAddress" className="font-poppins text-[#252525]">
                            Email</label>
                        <div className="w-full">
                            <Input type="text" id="emailAddress" placeholder="admin@business.com"
                                className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                {...register("emailAddress")}
                            />
                        </div>
                        {errors.emailAddress && (
                            <p className="text-red-500 text-sm font-poppins mt-1">
                                {errors.emailAddress.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                    <div className="w-full grid gap-2 items-center mt-4">
                        <label htmlFor="phoneNumber" className="font-poppins text-[#252525]">
                            Phone</label>
                        <div className="w-full">
                            <Input type="text" id="phoneNumber" placeholder="Tech Solution Inc."
                                className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                {...register("phoneNumber")}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm font-poppins mt-1">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full grid gap-2 items-center mt-4">
                        <label htmlFor="role" className="font-poppins text-[#252525]">
                            Role</label>
                        <div className="w-full">
                            <Input disabled type="text" placeholder="Super Admin" className="font-poppins"
                                {...register("role")} />
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
                        <p className="font-poppins text-[#626262] text-xs">Data management options
                            (placeholder)</p>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex justify-between items-center p-2 rounded-lg mt-5">
                    <div>
                        <h1 className="font-poppins text-[#000000]">Export All Businesses</h1>
                        <p className="font-poppins text-[#7A7A7A] text-xs">Download CSV file with all
                            business data</p>
                    </div>
                    <button type="button" onClick={handleExportCSV} className="font-poppins bg-[#327EF9] 
                    text-[#EBF2FE] px-2 py-1 rounded-md cursor-pointer">Export CSV</button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                <button type="submit" className="flex items-center justify-center gap-2 bg-[#327EF9] 
                text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                    <Bookmark className="text-[#EBF2FE] w-5 h-5" />
                    Save Settings
                </button>
                <button type="button" onClick={handleReset} className="flex items-center justify-center 
                gap-2 bg-[#B3261E] text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                    <ArchiveRestore className="text-[#EBF2FE] w-5 h-5" />
                    Reset to Defaults
                </button>
            </div>
        </form>
    );
}
