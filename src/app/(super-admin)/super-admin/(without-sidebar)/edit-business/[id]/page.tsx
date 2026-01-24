// Fahim
"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarHeartIcon, Eye, EyeOff, LockKeyhole, MoveLeft, Save, Trash2, Upload, X }
    from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/axiosInterceptor";
import axios from "axios";

interface GalleryImage {
    id?: string;           // ← নতুন: backend থেকে আসা image এর id/uuid
    file: File | null;     // নতুন আপলোড করা হলে থাকবে
    preview: string;       // url
}

interface Errors {
    banner: string;
    gallery: string;
}

// Add interface for form data
interface BusinessFormData {
    businessName: string;
    country: string;
    fullAddress: string;
    membershipValidTill: string;
    emailAddress: string;
    phoneNumber: string;
    websiteURL: string;
    servicesOffered: string;
    aboutBusiness: string;
    newPassword?: string;
    confirmPassword?: string;
}


// Zod password validation schema
const passwordSchema = z
    .object({
        newPassword: z
            .string()
            .optional()
            .refine(
                (val) =>
                    !val ||
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(val),
                {
                    message:
                        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
                }
            ),

        confirmPassword: z.string().optional(),
    })
    .refine(
        (data) =>
            !data.newPassword ||
            (data.newPassword && data.confirmPassword === data.newPassword),
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

// Full form schema
const businessFormSchema = z
    .object({
        businessName: z.string().min(1, "Business name is required"),
        country: z.string().min(1, "Country is required"),
        fullAddress: z.string().min(1, "Full address is required"),
        membershipValidTill: z.string().min(1, "Membership date is required"),
        emailAddress: z.string().email().optional(),
        phoneNumber: z.string().optional(),
        websiteURL: z.string().optional(),
        servicesOffered: z.string().min(1, "Services are required"),
        aboutBusiness: z.string().min(1, "About business is required"),

        newPassword: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .and(passwordSchema);


export default function EditBusiness() {
    const [activeTab, setActiveTab] = useState('basic');
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [errors, setErrors] = useState<Errors>({ banner: '', gallery: '' });
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    const { id } = useParams(); // Extract id from URL
    const [datas, setDatas] = useState<any>(null);

    // Initialize React Hook Form
    // useForm now uses zodResolver
    const {
        register,
        handleSubmit,
        control,
        formState: { errors: formErrors },
        setValue,
        reset,
        watch,
    } = useForm<BusinessFormData>({
        resolver: zodResolver(businessFormSchema),
        defaultValues: {
            businessName: "",
            country: "",
            fullAddress: "",
            membershipValidTill: "",
            emailAddress: "",
            phoneNumber: "",
            websiteURL: "",
            servicesOffered: "",
            aboutBusiness: "",
            newPassword: "",
            confirmPassword: "",
        },
    });


    // Country type definition
    type Country = {
        id: string;
        name: string;
        flag: string;
    };

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        api.get("/api/core/countries/")
            .then(response => {
                setCountries(response?.data?.countries || []);
                // console.log("success");
                // Handle the successful response
                // return response?.data?.countries;
                // console.log(response.data); // The actual data payload from the server
            })
            .catch(error => {
                console.log("failed");
                console.log(error); // Axios rejects promises for HTTP errors
                // Handle the error
                console.error('Error fetching data:', error.status);
            });
    }, []);

    const refreshBusinessData = async () => {
        try {
            const res = await api.get(`/api/business/${id}/`);

            const freshData = res?.data;
            setDatas(freshData);

            // Re-populate ALL fields (same as in initial fetch)
            setValue('businessName', freshData?.business?.business_name || '');
            setValue('country', freshData?.business?.country?.id || '', { shouldValidate: true });
            setValue('fullAddress', freshData?.business?.full_address || '');
            setValue('emailAddress', freshData?.business?.user_email || '');
            setValue('phoneNumber', freshData?.business?.phone_number || '');
            setValue('websiteURL', freshData?.business?.website || '');
            setValue('aboutBusiness', freshData?.business?.about_business || '');

            const servicesStr = freshData?.business?.services
                ?.map((s: any) => s.title)
                .join(', ') || '';
            setValue('servicesOffered', servicesStr);

            // membership date
            if (freshData?.business?.membership_valid_till) {
                const dateStr = freshData.business.membership_valid_till.trim();
                const parts = dateStr.split("/");
                if (parts.length === 3) {
                    const [d, m, y] = parts.map(Number);
                    const jsDate = new Date(y, m - 1, d);
                    if (!isNaN(jsDate.getTime())) {
                        setDate(jsDate);
                        setValue("membershipValidTill", jsDate.toISOString());
                    }
                }
            }

            // Update banner preview if available
            if (freshData?.business?.logo) {
                setBannerPreview(freshData.business.logo);
            }

            // Update gallery images
            if (freshData?.business?.gallery && Array.isArray(freshData?.business?.gallery)) {
                const galleryPreviews = freshData?.business?.gallery.map((item: any) => ({
                    id: item.id,
                    file: null,
                    preview: item.image
                }));
                setGalleryImages(galleryPreviews);
            }

        } catch (err) {
            console.error("Failed to refresh data after update", err);
        }
    };

    // Fetch data from API on component mount using Axios
    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const response = await api.get(`/api/business/${id}/`);

                const data = response?.data;
                setDatas(data);

                // Populate form fields with fetched data
                setValue('businessName', data?.business?.business_name || '');
                setValue('country', data?.business?.country?.id || '');
                setValue('fullAddress', data?.business?.full_address || '');
                setValue('emailAddress', data?.business?.user_email || '');
                setValue('phoneNumber', data?.business?.phone_number || '');
                setValue('websiteURL', data?.business?.website || '');
                setValue('aboutBusiness', data?.business?.about_business || '');

                // Handle services array properly
                const servicesString = data?.business?.services?.map((service: any) => service.title)
                    .join(', ') || '';
                setValue('servicesOffered', servicesString);

                // // Set date if available
                // if (data?.business?.membership_valid_till) {
                //     const dateValue = data.business.membership_valid_till;
                //     const parsedDate = new Date(dateValue);
                //     setValue('membershipValidTill', parsedDate.toISOString());
                //     setDate(parsedDate);
                // }

                if (data?.business?.membership_valid_till) {
                    const dateStr = data.business.membership_valid_till.trim(); // "12/04/2027"

                    // Split and validate format
                    const parts = dateStr.split("/");
                    if (parts.length === 3) {
                        const [day, month, year] = parts.map(p => parseInt(p, 10));

                        // JavaScript Date months are 0-based → month-1
                        const jsDate = new Date(year, month - 1, day);

                        // Basic validation: check if date is valid
                        if (
                            !isNaN(jsDate.getTime()) &&
                            jsDate.getDate() === day &&
                            jsDate.getMonth() === month - 1 &&
                            jsDate.getFullYear() === year
                        ) {
                            setDate(jsDate);
                            setValue("membershipValidTill", jsDate.toISOString());
                        } else {
                            console.warn("Invalid date from API:", dateStr);
                            // optionally: setDate(undefined); setValue("membershipValidTill", "");
                        }
                    }
                }

                // Set banner preview if available
                if (data?.business?.logo) {
                    setBannerPreview(data.business.logo);
                }

                // Set gallery images with correct property mapping
                if (data?.business?.gallery && Array.isArray(data?.business?.gallery)) {
                    const galleryPreviews = data?.business?.gallery.map((item: any) => ({
                        id: item.id,           // ← এটা থাকা চাই (backend থেকে)
                        file: null,
                        preview: item.image    // url
                    }));
                    setGalleryImages(galleryPreviews);
                }

            }
            catch (error) {
                console.error('Error fetching business data:', error);
                if (axios.isAxiosError(error)) {
                    console.error(`Failed to load business data: ${error.response?.data?.message ||
                        error.message}`);
                } else {
                    console.log('Failed to load business data. Please try again.');
                }
            }
            finally {
                //setIsFetching(false);
            }
        };

        if (id) {
            fetchBusinessData();
        }
    }, [id, setValue]);


    const handleDelete = async () => {
        try {
            const response = await api.delete(`/api/business/${id}/delete/`);
            console.log("Business Deleted", response.data);
            // We may want to refresh the table data here or use a state management solution
            // to update the UI immediately
        } catch (error) {
            console.error("Error deleting", error);
        }
    };

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

        if (galleryImages.length + files.length > 8) {
            setErrors({ ...errors, gallery: 'Maximum 8 images allowed' });
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

    const removeGalleryImage = async (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const imageToRemove = galleryImages[index];

        // যদি নতুন আপলোড করা ছবি (file আছে) → শুধু frontend থেকে মুছে ফেলো
        if (imageToRemove.file) {
            setGalleryImages((prev) => prev.filter((_, i) => i !== index));
            return;
        }

        // যদি existing ছবি (id আছে) → backend থেকে ডিলিট করো
        if (imageToRemove.id) {
            console.log("iid", imageToRemove.id)
            try {
                await api.delete(`/api/business/gallery/images/${imageToRemove.id}/`);
                console.log(`Image ${imageToRemove.id} deleted from backend`);

                // সফল হলে frontend থেকেও মুছে ফেলো
                setGalleryImages((prev) => prev.filter((_, i) => i !== index));
            } catch (error) {
                console.error("Failed to delete gallery image:", error);
                if (axios.isAxiosError(error) && error.response) {
                    console.log("Delete error details:", error.response.data);
                }
                console.log("Could not delete the image. Please try again.");
                // optionally: error state দেখাও UI-তে
            }
        }
    };

    const handleToggleLock = async () => {
        try {
            const newLockStatus = !datas?.business?.is_locked;

            const response = await api.patch(`/api/business/${id}/update/`,
                { is_locked: newLockStatus },
            );

            // Update local state after successful API call
            setDatas({
                ...datas,
                business: {
                    ...datas.business,
                    is_locked: newLockStatus
                }
            });

            console.log(`Account ${newLockStatus ? 'locked' : 'unlocked'} successfully`);

        } catch (error) {
            console.error('Error toggling lock status:', error);
            if (axios.isAxiosError(error)) {
                console.log(`Failed to update lock status: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    // Add form submission handler using Axios
    const onSubmit = async (data: BusinessFormData) => {
        try {
            // Create FormData
            const formData1 = new FormData();
            // Append text fields
            formData1.append('business_name', data.businessName);
            formData1.append('country', data.country);
            formData1.append('full_address', data.fullAddress);
            formData1.append('user_email', data.emailAddress || '');
            formData1.append('phone_number', data.phoneNumber || '');
            formData1.append('website', data.websiteURL || '');
            formData1.append('services', data.servicesOffered);
            formData1.append('about_business', data.aboutBusiness);

            const isoDate = data.membershipValidTill;
            const date = new Date(isoDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            formData1.append('membership_valid_till', formattedDate);

            // Append banner image if changed
            if (bannerImage) {
                formData1.append('logo', bannerImage);
            }

            // Update business details
            const response1 = await axios.patch(`/api/business/${id}/update/`,
                formData1,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                });


            // Upload gallery images (only if there are new images)
            const newGalleryImages = galleryImages.filter(img => img.file);
            if (newGalleryImages.length > 0) {
                const formData2 = new FormData();
                newGalleryImages.forEach((image) => {
                    if (image.file) {
                        formData2.append('images', image.file);
                    }
                });

                const response2 = await api.post(`/api/business/gallery/upload/${id}/`,
                    formData2,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    });
                console.log("Gallery upload successful:", response2.data);
            }


            // Only update password if BOTH fields are provided
            if (data.newPassword && data.confirmPassword) {
                console.log("Attempting to change password..."); // Debug log

                const passwordData = {
                    email: data.emailAddress,
                    new_password: data.newPassword,
                    confirm_password: data.confirmPassword
                };

                try {
                    const response3 = await api.post(`/api/auth/super-admin/users/change-password/`,
                        passwordData
                    );
                    console.log("Password updated successfully", response3.data);
                    console.log("Password changed successfully!");

                    // Clear password fields after successful change
                    setValue('newPassword', '');
                    setValue('confirmPassword', '');
                }
                catch (error) {
                    console.error("Password change failed:", error);
                    if (axios.isAxiosError(error)) {
                        console.log(`Failed to change password: ${error.response?.data?.message || error.message}`);
                    }
                }
            } else {
                console.log("No password provided, skipping password change");
            }

            // Reset bannerImage state after successful upload
            setBannerImage(null);

            // Refresh all data from backend
            await refreshBusinessData();

            console.log("Business updated successfully!");

        } catch (error) {
            console.error('Error updating business:', error);
            if (axios.isAxiosError(error)) {
                console.log(`Failed to update business: ${error.response?.data?.message || error.message}`);
            } else {
                console.log('Failed to update business. Please try again.');
            }
        }
    };

    // Add cancel handler
    const handleCancel = () => {
        // Reset form to original values
        reset();
        setBannerImage(null);
        setBannerPreview(null);
        setGalleryImages([]);
        setDate(undefined);
        // Optionally redirect back
        // router.back();
    };

    // Show loading state while fetching
    // if (isFetching) {
    //     return (
    //         <div className="max-w-[1300px] mx-auto p-8">
    //             <div className="text-center py-12">
    //                 <p className="text-gray-600 font-poppins">Loading business data...</p>
    //             </div>
    //         </div>
    //     );
    // }

    const router = useRouter();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1300px] mx-auto">
            <button className="mt-3 bg-[#BFD7FDB8] text-[#153569] px-2 py-1 
                flex items-center gap-1.5 font-semibold font-poppins rounded-lg cursor-pointer"
                onClick={() => router.push("/super-admin/all-businesses")}>
                <MoveLeft />
                Back
            </button>
            <h1 className="font-medium font-poppins text-[#0B0B0B] text-2xl mt-5">Edit Profile</h1>
            <p className="font-poppins text-[#626262]">Update your business information and images</p>
            <div className="bg-white rounded-lg shadow-md border mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b">
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
                            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                                <label htmlFor="businessName" className="font-poppins text-[#252525]">
                                    Business Name*</label>
                                <div className="w-full">
                                    <Input type="text" id="businessName" placeholder="Tech Solution Inc."
                                        className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                        {...register("businessName")}
                                    />
                                </div>
                                {formErrors.businessName && (
                                    <p className="text-red-500 text-sm font-poppins mt-1">
                                        {formErrors.businessName.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                                <label htmlFor="country" className="font-poppins text-[#252525]">
                                    Country*</label>
                                {/* Used Controller for Select component */}
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full cursor-pointer font-poppins">
                                                <SelectValue placeholder="Countries" />
                                            </SelectTrigger>
                                            <SelectContent className="font-poppins">
                                                <SelectGroup>
                                                    <SelectLabel>Countries</SelectLabel>
                                                    {countries.map(item => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {formErrors.country && (
                                    <p className="text-red-500 text-sm font-poppins mt-1">
                                        {formErrors.country.message}
                                    </p>
                                )}

                                {/* <div>
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
                                </div> */}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                                <label htmlFor="fullAddress" className="font-poppins text-[#000000]">
                                    Full Address*</label>
                                <div className="w-full">
                                    <Input type="text" id="fullAddress"
                                        placeholder="123 Tech street, san Francisco, CA 94105"
                                        className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                        {...register("fullAddress")}
                                    />
                                </div>
                                {formErrors.fullAddress && (
                                    <p className="text-red-500 text-sm font-poppins mt-1">
                                        {formErrors.fullAddress.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                                <label htmlFor="membership" className="font-poppins text-[#000000]">
                                    Membership Valid Till*</label>
                                <div className="w-full">
                                    <Controller
                                        name="membershipValidTill"
                                        control={control}
                                        //rules={{ required: "Membership date is required" }}
                                        render={({ field }) => (
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        type="button"
                                                        className="w-full justify-between font-normal 
                                                        font-poppins text-[#313131] cursor-pointer"
                                                    >
                                                        {date ? date.toLocaleDateString('en-GB') :
                                                            "DD / MM / YYYY"}
                                                        {/* (en-GB → 12/04/2027 style) */}
                                                        <CalendarHeartIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0"
                                                    align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        captionLayout="dropdown"
                                                        onSelect={(selectedDate) => {
                                                            if (selectedDate) {
                                                                setDate(selectedDate);
                                                                field.onChange(selectedDate.toISOString());
                                                                // important for RHF
                                                            } else {
                                                                setDate(undefined);
                                                                field.onChange("");
                                                            }
                                                            setOpen(false);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                </div>
                                {formErrors.membershipValidTill && (
                                    <p className="text-red-500 text-sm font-poppins mt-1">
                                        {formErrors.membershipValidTill.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                }

                {activeTab === 'contact' &&
                    <div className="p-3">
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="emailAddress" className="font-poppins text-[#515151]">
                                Email Address</label>
                            <div className="w-full">
                                <Input disabled type="text" id="emailAddress" placeholder="admin@business.com"
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                    {...register("emailAddress")}
                                />
                            </div>
                            {formErrors.emailAddress && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {formErrors.emailAddress.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="phoneNumber" className="font-poppins text-[#515151]">
                                Office Phone Number</label>
                            <div className="w-full">
                                <Input type="text" id="phoneNumber" placeholder="Tech Solution Inc."
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                    {...register("phoneNumber")}
                                />
                            </div>
                            {formErrors.phoneNumber && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {formErrors.phoneNumber.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="websiteURL" className="font-poppins text-[#515151]">
                                Website URL</label>
                            <div className="w-full">
                                <Input type="text" id="websiteURL" placeholder="example.com"
                                    className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                                    {...register("websiteURL")}
                                />
                            </div>
                            {formErrors.websiteURL && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {formErrors.websiteURL.message}
                                </p>
                            )}
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
                                    {...register("servicesOffered")}
                                />
                            </div>
                            <p className="font-poppins text-[#595959] text-xs">Separate services with commas</p>
                            {formErrors.servicesOffered && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {formErrors.servicesOffered.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full grid gap-2 items-center mt-4">
                            <label htmlFor="aboutBusiness" className="font-poppins text-[#515151]">
                                About Your Business*</label>
                            <div className="relative w-full">
                                <Textarea id="aboutBusiness" placeholder="Leading technology solutions 
                                provider with 15+ years of experience in enterprise software development."
                                    className="font-poppins resize-none whitespace-normal break-words"
                                    {...register("aboutBusiness")}
                                />
                            </div>
                            <p className="font-poppins text-[#595959] text-xs">102 characters</p>
                            {formErrors.aboutBusiness && (
                                <p className="text-red-500 text-sm font-poppins mt-1">
                                    {formErrors.aboutBusiness.message}
                                </p>
                            )}
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
                            {galleryImages?.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {galleryImages?.map((image, index) => (
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
                                className={`w-full border-2 border-dashed rounded-lg py-12 px-4 
                                    text-center cursor-pointer transition-colors bg-white 
                                    ${errors.gallery ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'
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
                                    Add up to 8 images to showcase your business
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
                            <label htmlFor="newPassword" className="text-[#252525] font-poppins">
                                New Password*</label>
                            <div className="relative w-full">
                                <Input
                                    type={showPassword1 ? "text" : "password"}
                                    id="newPassword"
                                    placeholder="Enter New password"
                                    className="pr-10 pl-9 font-poppins bg-[#FFFFFF] text-[#3F3F3F]"
                                    // leave space for the eye button
                                    {...register("newPassword")}
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
                            {formErrors.newPassword && (
                                <p className="text-red-500 text-sm font-poppins">
                                    {formErrors.newPassword.message}</p>
                            )}
                        </div>

                        <div className="w-1/2 grid gap-3 items-center mt-5">
                            <label htmlFor="confirmPassword" className="text-[#252525] font-poppins">
                                Confirm Password*</label>
                            <div className="relative w-full">
                                <Input
                                    type={showPassword2 ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Confirm New password"
                                    className="pr-10 pl-9 font-poppins bg-[#FFFFFF] text-[#3F3F3F]"
                                    // leave space for the eye button
                                    {...register("confirmPassword")}
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
                            {formErrors.confirmPassword && (
                                <p className="text-red-500 text-sm font-poppins">
                                    {formErrors.confirmPassword.message}</p>
                            )}
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
                gap-2 bg-[#B3261E] text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer"
                        onClick={handleCancel}>
                        <X className="text-[#EBF2FE] w-5 h-5" />
                        Cancel
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {
                        // console.log(data?.is_locked);
                        datas?.business?.is_locked === true ?
                            <button type="button" className="flex items-center justify-center gap-2 
                            bg-[#8ACF84]/60 text-[#0C8C00] font-poppins px-4 py-2 rounded-lg cursor-pointer"
                                onClick={handleToggleLock}>
                                <LockKeyhole className="text-[#0C8C00] w-5 h-5" />
                                Unlock Account
                            </button> :
                            <button type="button" className="flex items-center justify-center gap-2 
                            bg-[#CFB584]/60 text-[#AD7703] font-poppins px-4 py-2 rounded-lg cursor-pointer"
                                onClick={handleToggleLock}>
                                <LockKeyhole className="text-[#AD7703] w-5 h-5" />
                                Lock Account
                            </button>
                    }
                    <button type="button" className="flex items-center justify-center 
                gap-2 bg-[#F59D9D]/60 text-[#B3261E] font-poppins px-4 py-2 rounded-lg cursor-pointer"
                        onClick={handleDelete}>
                        <Trash2 className="text-[#B3261E] w-5 h-5" />
                        Delete Business
                    </button>
                </div>
            </div>

            <div className="p-3 bg-[#EBF2FE] border border-[#76A9FB] rounded-lg mt-8">
                <p className="font-poppins text-[#1C4589] text-sm"><span className="font-medium">Note:
                </span> Your profile information is visible to all logged-in users in the directory.
                    Make sure all information is accurate and up-to date.</p>
            </div>
        </form>
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