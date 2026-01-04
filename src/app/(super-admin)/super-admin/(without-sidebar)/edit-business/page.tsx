// Fahim
"use client"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Divide, Eye, EyeOff, LockKeyhole, Save, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface GalleryImage {
    file: File;
    preview: string;
}

interface Errors {
    banner: string;
    gallery: string;
}

export default function EditBusiness() {
    const [activeTab, setActiveTab] = useState('basic');
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [errors, setErrors] = useState<Errors>({ banner: '', gallery: '' });
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // Type annotation for validation function
    const validateFile = (file: File): string | null => {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            return 'Please upload a PNG or JPG image';
        }
        if (file.size > 5 * 1024 * 1024) {
            return 'File size must be less than 5MB';
        }
        return null;
    };

    // Type annotation for event handler
    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const error = validateFile(file);
            if (error) {
                setErrors({ ...errors, banner: error });
                return;
            }

            setErrors({ ...errors, banner: '' });
            setBannerImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Type annotation for event handler
    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (galleryImages.length + files.length > 10) {
            setErrors({ ...errors, gallery: 'Maximum 10 images allowed' });
            return;
        }

        const validFiles: File[] = [];
        let errorMessage = '';

        for (const file of files) {
            const error = validateFile(file);
            if (error) {
                errorMessage = error;
                break;
            }
            validFiles.push(file);
        }

        if (errorMessage) {
            setErrors({ ...errors, gallery: errorMessage });
            return;
        }

        setErrors({ ...errors, gallery: '' });

        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryImages((prev) => [...prev, { file, preview: reader.result as string }]);
            };
            reader.readAsDataURL(file);
        });
    };

    // Type annotation for event handler
    const removeBanner = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setBannerImage(null);
        setBannerPreview(null);
        setErrors({ ...errors, banner: '' });
        const input = document.getElementById('banner-input') as HTMLInputElement;
        if (input) input.value = '';
    };

    // Type annotation for event handler
    const removeGalleryImage = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-[1300px] mx-auto">
            <h1 className="font-medium font-poppins text-[#0B0B0B] text-2xl mt-6">Edit Profile</h1>
            <p className="font-poppins text-[#626262]">Update your business information and images</p>
            <div className="bg-white rounded-lg shadow-sm border mt-6">
                <div className="flex justify-around border-b">
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`px-8 py-2 font-medium font-poppins border-b-2 transition-colors 
                            text-[#141414] cursor-pointer 
                            ${activeTab === 'basic' ? 'border-[#327EF9]'
                                : 'border-transparent hover:text-gray-700'
                            }`}
                    >
                        Basic Information
                    </button>
                    <button
                        onClick={() => setActiveTab('contact')}
                        className={`px-8 py-2 font-medium font-poppins border-b-2 transition-colors 
                            text-[#141414] cursor-pointer
                            ${activeTab === 'contact' ? 'border-[#327EF9]'
                                : 'border-transparent hover:text-gray-700'
                            }`}
                    >
                        Contact Information
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-8 py-2 font-medium font-poppins border-b-2 transition-colors 
                            text-[#141414] cursor-pointer
                            ${activeTab === 'services' ? 'border-[#327EF9]'
                                : 'border-transparent hover:text-gray-700'
                            }`}
                    >
                        Services & About
                    </button>
                    <button
                        onClick={() => setActiveTab('images')}
                        className={`px-8 py-2 font-medium font-poppins border-b-2 transition-colors 
                            text-[#141414] cursor-pointer 
                            ${activeTab === 'images' ? 'border-[#327EF9]'
                                : 'border-transparent hover:text-gray-700'
                            }`}
                    >
                        Images
                    </button>
                    <button
                        onClick={() => setActiveTab('changePassword')}
                        className={`px-8 py-2 font-medium font-poppins border-b-2 transition-colors 
                            text-[#141414] cursor-pointer 
                            ${activeTab === 'changePassword' ? 'border-[#327EF9]'
                                : 'border-transparent hover:text-gray-700'
                            }`}
                    >
                        Change Password
                    </button>
                </div>

                {activeTab === 'basic' &&
                    <div className="p-3">
                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                            <div className="w-full grid gap-2 items-center mt-4">
                                <label htmlFor="businessName" className="font-poppins text-[#252525]">
                                    Business Name*</label>
                                <div className="w-full">
                                    <Input type="text" id="businessName" placeholder="Tech Solution Inc."
                                        className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                    // {...register("businessName")}
                                    />
                                </div>
                                {/* {errors.businessName && (
                                    <p className="text-red-500 text-sm font-poppins mt-1">
                                        {errors.businessName.message}
                                    </p>
                                )} */}
                            </div>
                            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                                <label htmlFor="country" className="font-poppins text-[#252525]">
                                    Country*</label>
                                {/* Used Controller for Select component */}
                                {/* <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full cursor-pointer font-poppins">
                                                <SelectValue placeholder="All Countries" />
                                            </SelectTrigger>
                                            <SelectContent className="font-poppins">
                                                <SelectGroup>
                                                    <SelectLabel>Countries</SelectLabel>
                                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                    <SelectItem value="Germany">Germany</SelectItem>
                                                    <SelectItem value="France">France</SelectItem>
                                                    <SelectItem value="Taiwan">Taiwan</SelectItem>
                                                    <SelectItem value="China">China</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-sm font-poppins mt-1">
                                        {errors.country.message}
                                    </p>
                                )} */}

                                <div>
                                    <Select>
                                        <SelectTrigger className="w-full cursor-pointer font-poppins">
                                            <SelectValue placeholder="All Countries" />
                                        </SelectTrigger>
                                        <SelectContent className="font-poppins">
                                            <SelectGroup>
                                                <SelectLabel>Countries</SelectLabel>
                                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                <SelectItem value="Germany">Germany</SelectItem>
                                                <SelectItem value="France">France</SelectItem>
                                                <SelectItem value="Taiwan">Taiwan</SelectItem>
                                                <SelectItem value="China">China</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="fullAddress" className="font-poppins text-[#000000]">
                                Full Address*</label>
                            <div className="w-full">
                                <Input type="text" id="fullAddress"
                                    placeholder="123 Tech street, san Francisco, CA 94105"
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                // {...register("fullAddress")}
                                />
                            </div>
                            {/* {errors.fullAddress && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {errors.fullAddress.message}
                                </p>
                            )} */}
                        </div>
                    </div>
                }

                {activeTab === 'contact' &&
                    <div className="p-3">
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="emailAddress" className="font-poppins text-[#515151]">
                                Email Address</label>
                            <div className="w-full">
                                <Input type="text" id="emailAddress" placeholder="admin@business.com"
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                // {...register("emailAddress")}
                                />
                            </div>
                            {/* {errors.emailAddress && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {errors.emailAddress.message}
                                </p>
                            )} */}
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="phoneNumber" className="font-poppins text-[#515151]">
                                Office Phone Number</label>
                            <div className="w-full">
                                <Input type="text" id="phoneNumber" placeholder="Tech Solution Inc."
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                // {...register("phoneNumber")}
                                />
                            </div>
                            {/* {errors.phoneNumber && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {errors.phoneNumber.message}
                                </p>
                            )} */}
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="websiteURL" className="font-poppins text-[#515151]">
                                Website URL</label>
                            <div className="w-full">
                                <Input type="text" id="websiteURL" placeholder="example.com"
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                // {...register("websiteURL")}
                                />
                            </div>
                            {/* {errors.websiteURL && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {errors.websiteURL.message}
                                </p>
                            )} */}
                        </div>
                    </div>
                }

                {activeTab === 'services' &&
                    <div className="p-3">
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="servicesOffered" className="font-poppins text-[#515151]">
                                Services Offered*</label>
                            <div className="w-full">
                                <Textarea id="servicesOffered" placeholder="List services separated by commas"
                                    className="font-poppins resize-none whitespace-normal break-words"
                                // {...register("servicesOffered")}
                                />
                            </div>
                            <p className="font-poppins text-[#595959] text-xs">Separate services with commas</p>
                            {/* {errors.servicesOffered && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {errors.servicesOffered.message}
                                </p>
                            )} */}
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="aboutBusiness" className="font-poppins text-[#515151]">
                                About Your Business*</label>
                            <div className="relative w-full">
                                <Textarea id="aboutBusiness" placeholder="Leading technology solutions 
                                provider with 15+ years of experience in enterprise software development."
                                    className="font-poppins resize-none whitespace-normal break-words"
                                // {...register("aboutBusiness")} 
                                />
                            </div>
                            <p className="font-poppins text-[#595959] text-xs">102 characters</p>
                            {/* {errors.aboutBusiness && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {errors.aboutBusiness.message}
                                </p>
                            )} */}
                        </div>
                    </div>
                }

                {activeTab === 'images' &&
                    <div className="max-w-7xl mx-auto p-6 space-y-8">
                        {/* Business Logo Section */}
                        <h2 className="font-poppins text-sm text-[#515151] mb-2">Business Logo*</h2>
                        <div className="w-full">
                            {/* Banner Preview */}
                            {bannerPreview && (
                                <div className="relative w-full h-44 rounded-t-lg overflow-hidden">
                                    <img
                                        src={bannerPreview}
                                        alt="Business Logo Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeBanner}
                                        className="absolute top-3 right-3 bg-red-500 
                                                    hover:bg-red-600 text-white rounded-full p-1 
                                                    transition-colors shadow-lg"
                                        title="Remove image"
                                    >
                                        <X className="w-6 h-6 cursor-pointer" />
                                    </button>
                                </div>
                            )}

                            {/* Upload Area */}
                            <div
                                onClick={() => document.getElementById('banner-input')?.click()}
                                className={`w-full border-2 border-dashed 
                                                ${bannerPreview ? 'rounded-b-lg border-t-0' : 'rounded-lg'} 
                      py-12 px-4 text-center cursor-pointer transition-colors bg-white 
                      ${errors.banner ? 'border-red-600' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <input
                                    id="banner-input"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleBannerChange}
                                    className="hidden"
                                />

                                <Upload className="w-10 h-10 mx-auto text-gray-500 mb-3"
                                    strokeWidth={1.5} />
                                <p className="font-poppins text-gray-600 text-sm font-normal mb-1">
                                    Click to upload new logo
                                </p>
                                <p className="font-poppins text-gray-400 text-xs">
                                    PNG, JPG, up to 5MB (1200x400 recommended)
                                </p>
                            </div>
                            {errors.banner && (
                                <p className="font-poppins text-red-500 text-sm mt-2">{errors.banner}</p>
                            )}
                        </div>


                        {/* Gallery Images Section */}
                        <div>
                            <h2 className="font-poppins text-sm text-[#515151] mb-2">Gallery Images</h2>
                            {/* Display Gallery Images */}
                            {galleryImages.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {galleryImages.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <div className="w-full h-48 bg-gray-900 rounded-lg 
                                                    overflow-hidden">
                                                <img
                                                    src={image.preview}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => removeGalleryImage(index, e)}
                                                className="absolute top-2 right-2 bg-black bg-opacity-60 
                                                        hover:bg-red-500 text-white rounded-full p-1.5 
                                                        transition-colors opacity-0 group-hover:opacity-100"
                                                title="Remove image"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Area for Gallery */}
                            <div
                                onClick={() => document.getElementById('gallery-input')?.click()}
                                className={`w-full border-2 border-dashed rounded-lg 
                    py-12 px-4 text-center cursor-pointer transition-colors bg-white ${errors.gallery ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <input
                                    id="gallery-input"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleGalleryChange}
                                    className="hidden"
                                    multiple
                                />

                                <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" strokeWidth={1.5} />
                                <p className="font-poppins text-gray-600 text-sm font-normal mb-1">
                                    Click to add more images
                                </p>
                                <p className="font-poppins text-gray-400 text-xs">
                                    Add up to 10 images to showcase your business
                                </p>
                            </div>

                            {errors.gallery && (
                                <p className="font-poppins text-red-500 text-sm mt-2">{errors.gallery}</p>
                            )}
                        </div>
                    </div>
                }

                {activeTab === 'changePassword' &&
                    <div className="p-3">
                        <div className="w-1/2 grid gap-3 items-center mt-5">
                            <label htmlFor="newPassword" className="text-[#252525] font-poppins">New Password*</label>
                            <div className="relative w-full">
                                <Input
                                    type={showPassword1 ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter New password"
                                    className="pr-10 pl-9 font-poppins bg-[#FFFFFF] text-black" // leave space for the eye button
                                // {...register("password")}
                                />
                                <LockKeyhole className="absolute top-2.5 left-2.5 w-5 h-5" />
                                <button type="button" className="absolute right-3 top-3.5 cursor-pointer"
                                    onClick={() => setShowPassword1(!showPassword1)}>
                                    {showPassword1 ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {/* {errors.password && (
                                <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
                            )} */}
                        </div>
                        <div className="w-1/2 grid gap-3 items-center mt-5">
                            <label htmlFor="newPassword" className="text-[#252525] font-poppins">Confirm Password*</label>
                            <div className="relative w-full">
                                <Input
                                    type={showPassword2 ? "text" : "password"}
                                    id="password"
                                    placeholder="Confirm New password"
                                    className="pr-10 pl-9 font-poppins bg-[#FFFFFF] text-black" // leave space for the eye button
                                // {...register("password")}
                                />
                                <LockKeyhole className="absolute top-2.5 left-2.5 w-5 h-5" />
                                <button type="button" className="absolute right-3 top-3.5 cursor-pointer"
                                    onClick={() => setShowPassword2(!showPassword2)}>
                                    {showPassword2 ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {/* {errors.password && (
                                <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
                            )} */}
                        </div>
                    </div>
                }
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    <button type="submit" className="flex items-center justify-center gap-2 bg-[#327EF9] 
                text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                        <Save className="text-[#EBF2FE] w-5 h-5" />
                        Save Changes
                    </button>
                    <button type="button" className="flex items-center justify-center 
                gap-2 bg-[#B3261E] text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                        <X className="text-[#EBF2FE] w-5 h-5" />
                        Cancel
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    <button type="button" className="flex items-center justify-center gap-2 bg-[#CFB584] 
                text-[#AD7703] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                        <LockKeyhole className="text-[#AD7703] w-5 h-5" />
                        Locked Account
                    </button>
                    <button type="button" className="flex items-center justify-center 
                gap-2 bg-[#F59D9D] text-[#B3261E] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                        <Trash2 className="text-[#B3261E] w-5 h-5" />
                        Delete Business
                    </button>
                </div>
            </div>

            <div className="p-3 bg-[#76A9FB] rounded-lg mt-8">
                <p className="font-poppins text-[#1C4589] text-sm"><span className="font-medium">Note:
                </span> Your profile information is visible to all logged-in users in the directory.
                    Make sure all information is accurate and up-to date.</p>
            </div>

            <div className="p-3 bg-[#76A9FB] rounded-lg mt-8">
                <p className="font-poppins text-[#1C4589] text-sm"><span className="font-medium">Note:
                </span> Your profile information is visible to all logged-in users in the directory.
                    Make sure all information is accurate and up-to date.</p>
            </div>
        </div>
    );
}





// "use client"
// import React, { useState } from 'react';

// export default function EditProfileForm() {
//     const [activeTab, setActiveTab] = useState('basic');
//     const [businessName, setBusinessName] = useState('Tech Solution Inc.');
//     const [country, setCountry] = useState('United States');
//     const [address, setAddress] = useState('123 Tech street, san Francisco, CA 94105');

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
//                     <p className="text-gray-600">Update your business information and images</p>
//                 </div>

//                 {/* Form Card */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                     {/* Tabs */}
//                     <div className="border-b border-gray-200">
//                         <div className="flex">
//                             <button
//                                 onClick={() => setActiveTab('basic')}
//                                 className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic'
//                                     ? 'border-blue-600 text-gray-900'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                                     }`}
//                             >
//                                 Basic Information
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('contact')}
//                                 className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'contact'
//                                     ? 'border-blue-600 text-gray-900'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                                     }`}
//                             >
//                                 Contact Information
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('services')}
//                                 className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'services'
//                                     ? 'border-blue-600 text-gray-900'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                                     }`}
//                             >
//                                 Services & About
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('images')}
//                                 className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'images'
//                                     ? 'border-blue-600 text-gray-900'
//                                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                                     }`}
//                             >
//                                 Images
//                             </button>
//                         </div>
//                     </div>

//                     {/* Form Content */}
//                     <div className="p-8">
//                         {activeTab === 'basic' && (
//                             <div className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {/* Business Name */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Business Name*
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={businessName}
//                                             onChange={(e) => setBusinessName(e.target.value)}
//                                             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                                         />
//                                     </div>

//                                     {/* Country */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Country*
//                                         </label>
//                                         <select
//                                             value={country}
//                                             onChange={(e) => setCountry(e.target.value)}
//                                             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
//                                             style={{
//                                                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//                                                 backgroundRepeat: 'no-repeat',
//                                                 backgroundPosition: 'right 0.75rem center',
//                                                 backgroundSize: '1.5rem'
//                                             }}
//                                         >
//                                             <option>United States</option>
//                                             <option>Canada</option>
//                                             <option>United Kingdom</option>
//                                             <option>Australia</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Full Address */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Full Address*
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={address}
//                                         onChange={(e) => setAddress(e.target.value)}
//                                         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {activeTab === 'contact' && (
//                             <div className="text-center py-12 text-gray-500">
//                                 Contact Information content
//                             </div>
//                         )}

//                         {activeTab === 'services' && (
//                             <div className="text-center py-12 text-gray-500">
//                                 Services & About content
//                             </div>
//                         )}

//                         {activeTab === 'images' && (
//                             <div className="text-center py-12 text-gray-500">
//                                 Images content
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-between items-center mt-6">
//                     <div className="flex gap-3">
//                         <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//                             </svg>
//                             Save Changes
//                         </button>
//                         <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Cancel
//                         </button>
//                     </div>

//                     <div className="flex gap-3">
//                         <button className="px-6 py-2.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2 font-medium">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
//                             </svg>
//                             Unlock Account
//                         </button>
//                         <button className="px-6 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 font-medium">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                             Delete Business
//                         </button>
//                     </div>
//                 </div>

//                 {/* Info Note */}
//                 <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <p className="text-sm text-blue-800">
//                         <span className="font-semibold">Note:</span> Your profile information is visible to all logged-in users in the directory. Make sure all information is accurate and up-to date.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }