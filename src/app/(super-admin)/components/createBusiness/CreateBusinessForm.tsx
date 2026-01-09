// Fahim
"use client"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbCategoryPlus } from "react-icons/tb";
import axios from "axios";
import { useView } from "../../ListGridContext";

const businessFormSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    country: z.string().min(1, "Country is required"),
    fullAddress: z.string().min(1, "Full address is required"),
    websiteURL: z.string().url("Invalid URL").min(1, "Website URL is required"),
    servicesOffered: z.string().min(1, "Services offered is required"),
    aboutBusiness: z.string().min(1, "About business is required"),
    bannerImage: z.instanceof(File, { message: "Banner image is required" })
});

// Define TypeScript type from Zod schema
type BusinessFormData = z.infer<typeof businessFormSchema>;

export default function CreateBusinessForm() {
    console.log("hello");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const { auth, setAuth } = useView();

    // Initialize React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<BusinessFormData>({
        resolver: zodResolver(businessFormSchema),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a PNG or JPG image');
                return;
            }

            // Validate file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }

            setError('');
            setSelectedFile(file);
            setValue('bannerImage', file); // Set value in form

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setSelectedFile(null);
        setPreviewUrl(null);
        setError('');
        setValue('bannerImage', undefined as any); // Clear form value
        const fileInput = document.getElementById('file-input') as HTMLInputElement; // Added type assertion
        if (fileInput) fileInput.value = '';
    };

    const handleClick = () => {
        document.getElementById('file-input')?.click(); // Added optional chaining
    };

    // Form submit handler
    const onSubmit = async (data: BusinessFormData) => {
        console.log("Form Data:", data);
        console.log("token:", auth.accessToken);
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error("No access token found");
            return;
        }

        const formData = new FormData();
        formData.append("business_name", data.businessName);
        formData.append("email", data.emailAddress);
        formData.append("phone_number", data.phoneNumber);
        formData.append("password", data.password);
        formData.append("country", data.country);
        formData.append("full_address", data.fullAddress);
        formData.append("website", data.websiteURL);
        formData.append("services", data.servicesOffered);
        formData.append("about_business", data.aboutBusiness);
        formData.append("logo", data.bannerImage); // ✅ File

        await axios.post(
            "https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/business/create-with-user/",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Correct
                },
            }
        );

        // if (token) {
        //     setAuth({ accessToken: token });
        // }

        // // You can handle form submission here (e.g., API call)
        // const response = await axios.post("https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/business/create-with-user/",
        //     {
        //         business_name: data.businessName,
        //         email: data.emailAddress,
        //         phone_number: data.phoneNumber,
        //         password: data.password,
        //         country: data.country,
        //         full_address: data.fullAddress,
        //         website: data.websiteURL,
        //         services: data.servicesOffered,
        //         about_business: data.aboutBusiness,
        //         logo: data.bannerImage
        //     },
        //     {
        //         headers: {
        //             // Don't set Content-Type - let browser set it with boundary
        //             'Authorization': `Bearer ${token}`,  // ✅ Correct way to add token
        //         }
        //         // headers: { 'Content-Type': 'multipart/form-data' },
        //         // localStorage.getItem(accessToken)
        //         //localStorage.setItem('accessToken', token);
        //         // withCredentials: true
        //     }
        // );

        // try {
        //     // Create FormData object
        //     const formData = new FormData();

        //     // Append all fields to FormData
        //     formData.append('business_name', data.businessName);
        //     formData.append('email', data.emailAddress);
        //     formData.append('phone_number', data.phoneNumber);
        //     formData.append('password', data.password);
        //     formData.append('country', data.country);
        //     formData.append('full_address', data.fullAddress);
        //     formData.append('website', data.websiteURL);
        //     formData.append('services', data.servicesOffered);
        //     formData.append('about_business', data.aboutBusiness);
        //     formData.append('logo', data.bannerImage); // File object

        //     // const response = await axios.post(
        //     //     "https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/business/create-with-user/",
        //     //     formData,
        //     //    {
        //     //     headers:{
        //     //         'Authorization':'Bearer '
        //     //     }
        //     //    }
        //     // );
        //     const response = await axios.post(
        //         "https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/business/create-with-user/",
        //         formData,
        //         {
        //             headers: {
        //                 "Authorization": "Bearer",
        //             }
        //         }
        //     );
        //     console.log('Business created successfully:', response.data);
        //     // Handle success (e.g., show message, redirect, etc.)

        // } catch (error) {
        //     console.error('Error creating business:', error);
        //     // Handle error (e.g., show error message)
        // }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-4 bg-[#FFFFFF] rounded-lg">
            <h1 className="font-poppins font-medium text-[#000000]">Basic Information</h1>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
                <div className="w-full grid gap-2 items-center mt-4">
                    <label htmlFor="businessName" className="font-poppins text-[#252525]">
                        Business Name*</label>
                    <div className="w-full">
                        <Input type="text" id="businessName" placeholder="Tech Solution Inc."
                            className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                            {...register("businessName")}
                        />
                    </div>
                    {errors.businessName && (
                        <p className="text-red-500 text-sm font-poppins mt-1">
                            {errors.businessName.message}
                        </p>
                    )}
                </div>
                <div className="w-full grid gap-2 items-center mt-4">
                    <label htmlFor="emailAddress" className="font-poppins text-[#252525]">
                        Email Address*</label>
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
                        Phone Number*</label>
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
                <div className="w-full grid gap-3 items-center mt-6">
                    <label htmlFor="password" className="text-[#252525] font-poppins">
                        Initial Password*</label>
                    <div className="relative w-full">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="XXXXXXXXXXXXXXXXXX"
                            className="pr-10 font-poppins bg-[#FFFFFF] text-black" // leave space for the eye button
                            {...register("password")}
                        />
                        <button type="button" className="absolute right-3 top-3.5 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
                    )}
                </div>
            </div>

            <h1 className="font-poppins font-medium text-[#000000] mt-4">Location Information</h1>
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
                )}
            </div>

            <div className="w-full grid gap-2 items-center mt-4">
                <label htmlFor="fullAddress" className="font-poppins text-[#000000]">
                    Full Address*</label>
                <div className="w-full">
                    <Input type="text" id="fullAddress"
                        placeholder="123 Tech street, san Francisco, CA 94105"
                        className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                        {...register("fullAddress")}
                    />
                </div>
                {errors.fullAddress && (
                    <p className="text-red-500 text-sm font-poppins mt-1">
                        {errors.fullAddress.message}
                    </p>
                )}
            </div>
            <h1 className="font-poppins font-medium text-[#000000] mt-4">Business Details</h1>
            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                <label htmlFor="websiteURL" className="font-poppins text-[#000000]">
                    Website URL*</label>
                <div className="w-full">
                    <Input type="text" id="websiteURL" placeholder="example.com"
                        className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
                        {...register("websiteURL")}
                    />
                </div>
                {errors.websiteURL && (
                    <p className="text-red-500 text-sm font-poppins mt-1">
                        {errors.websiteURL.message}
                    </p>
                )}
            </div>
            <div className="w-full grid gap-2 items-center mt-4">
                <label htmlFor="servicesOffered" className="font-poppins text-[#000000]">
                    Services Offered*</label>
                <div className="w-full">
                    <Textarea id="servicesOffered" placeholder="List services separated by commas"
                        className="font-poppins resize-none whitespace-normal break-words"
                        {...register("servicesOffered")}
                    />
                </div>
                {errors.servicesOffered && (
                    <p className="text-red-500 text-sm font-poppins mt-1">
                        {errors.servicesOffered.message}
                    </p>
                )}
            </div>
            <div className="w-full grid gap-2 items-center mt-4">
                <label htmlFor="aboutBusiness" className="font-poppins text-[#000000]">
                    About Business*</label>
                <div className="relative w-full">
                    <Textarea id="aboutBusiness" placeholder="Describe the business..."
                        className="font-poppins resize-none whitespace-normal break-words"
                        {...register("aboutBusiness")} />
                </div>
                {errors.aboutBusiness && (
                    <p className="text-red-500 text-sm font-poppins mt-1">
                        {errors.aboutBusiness.message}
                    </p>
                )}
            </div>

            <h1 className="font-poppins font-medium text-[#000000] mt-4">Image</h1>
            <div className="w-full grid gap-2 items-center mt-4">
                <label htmlFor="" className="font-poppins text-[#000000]">
                    Banner Image*</label>
                <div className="relative w-full">
                    <div
                        onClick={handleClick}
                        className={`border-2 border-dashed rounded-lg p-16 text-center cursor-pointer 
                            transition-colors bg-white relative ${
                            // Show error border if form has error
                            error || errors.bannerImage ? 'border-red-400' :
                                'border-gray-300 hover:border-gray-400'
                            }`}
                    >
                        <input
                            id="file-input"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {previewUrl ? (
                            <div className="space-y-4">
                                <button
                                    onClick={handleRemove}
                                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 
                                    text-white rounded-full p-2 transition-colors"
                                    title="Remove image"
                                >
                                    <X className="w-5 h-5 cursor-pointer" />
                                </button>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-h-48 mx-auto rounded"
                                />
                                <p className="font-poppins text-gray-600">
                                    {selectedFile?.name}
                                </p>
                                <p className="font-poppins text-sm text-gray-500">
                                    Click to change image
                                </p>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <p className="font-poppins text-gray-600 mb-2">
                                    Click to upload new logo
                                </p>
                                <p className="font-poppins text-gray-400 text-sm">
                                    PNG, JPG, up to 5MB (Square recommended)
                                </p>
                            </>
                        )}
                    </div>

                    {/* Show both custom error and form error */}
                    {error && (
                        <p className="font-poppins text-red-500 text-sm mt-2">{error}</p>
                    )}
                    {errors.bannerImage && (
                        <p className="font-poppins text-red-500 text-sm mt-2">
                            {errors.bannerImage.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                <button type="submit" className="flex items-center justify-center gap-2 bg-[#327EF9] 
                text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                    <TbCategoryPlus className="text-[#EBF2FE] w-5 h-5" />
                    Create Business
                </button>
                <button type="button" className="flex items-center justify-center gap-2 bg-[#B3261E] 
                text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
                    <X className="text-[#EBF2FE] w-5 h-5" />
                    Cancel
                </button>
            </div>
        </form>
    );
}


// resize-none - Prevents manual resizing that could stretch the textarea.
// whitespace-normal - Allows text to wrap to the next line.
// break-words - Breaks long words if they exceed the width.