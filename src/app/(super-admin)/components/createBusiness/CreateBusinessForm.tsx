// // Fahim
// "use client"
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
//     from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CalendarHeartIcon, Eye, EyeOff, Upload, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { TbCategoryPlus } from "react-icons/tb";
// import axios from "axios";
// import { useView } from "../../ListGridContext";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";

// // ADDED: Country type definition
// type Country = {
//     id: string;
//     name: string;
//     flag: string;
// };

// const businessFormSchema = z.object({
//     businessName: z.string().min(1, "Business name is required"),
//     emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),
//     phoneNumber: z.string().min(1, "Phone number is required"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     country: z.string().min(1, "Country is required"),
//     fullAddress: z.string().min(1, "Full address is required"),
//     websiteURL: z.string().url("Invalid URL").min(1, "Website URL is required"),
//     servicesOffered: z.string().min(1, "Services offered is required"),
//     aboutBusiness: z.string().min(1, "About business is required"),
//     bannerImage: z.instanceof(File, { message: "Banner image is required" }),
//     //membershipValidTill: z.date({ message: "Membership date is required" })
// });

// // Define TypeScript type from Zod schema
// type BusinessFormData = z.infer<typeof businessFormSchema>;

// export default function CreateBusinessForm() {
//     //console.log("hello");
//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const [error, setError] = useState<string>('');
//     const { auth, setAuth } = useView();
//     const [open, setOpen] = useState(false);
//     const [countries, setCountries] = useState<Country[]>([]);

//     // Initialize React Hook Form with Zod validation
//     const {
//         register,
//         handleSubmit,
//         control,
//         setValue,
//         formState: { errors },
//     } = useForm<BusinessFormData>({
//         resolver: zodResolver(businessFormSchema),
//     });

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             // Validate file type
//             const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//             if (!validTypes.includes(file.type)) {
//                 setError('Please upload a PNG or JPG image');
//                 return;
//             }

//             // Validate file size (5MB = 5 * 1024 * 1024 bytes)
//             if (file.size > 5 * 1024 * 1024) {
//                 setError('File size must be less than 5MB');
//                 return;
//             }

//             setError('');
//             setSelectedFile(file);
//             setValue('bannerImage', file); // Set value in form

//             // Create preview URL
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewUrl(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();
//         setSelectedFile(null);
//         setPreviewUrl(null);
//         setError('');
//         setValue('bannerImage', undefined as any); // Clear form value
//         const fileInput = document.getElementById('file-input') as HTMLInputElement; // Added type assertion
//         if (fileInput) fileInput.value = '';
//     };

//     const handleClick = () => {
//         document.getElementById('file-input')?.click(); // Added optional chaining
//     };

//     // Form submit handler
//     const onSubmit = async (data: BusinessFormData) => {
//         console.log("Form Data:", data);
//         console.log("token:", auth.accessToken);
//         const token = localStorage.getItem('accessToken');
//         if (!token) {
//             console.error("No access token found");
//             return;
//         }

//         useEffect(() => {
//             axios.get("https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/core/countries/",
//                 {
//                     headers: { "ngrok-skip-browser-warning": "true" },
//                 }
//             )
//                 .then(response => {
//                     setCountries(response?.data?.countries || []);
//                     // console.log("success");
//                     // Handle the successful response
//                     // return response?.data?.countries;
//                     // console.log(response.data); // The actual data payload from the server
//                 })
//                 .catch(error => {
//                     console.log("failed");
//                     console.log(error); // Axios rejects promises for HTTP errors
//                     // Handle the error
//                     console.error('Error fetching data:', error.status);
//                 });
//         }, []);

//         const formData = new FormData();
//         formData.append("email", data.emailAddress);
//         formData.append("password", data.password);
//         formData.append("business_name", data.businessName);
//         formData.append("phone_number", data.phoneNumber);
//         formData.append("country", data.country);
//         formData.append("full_address", data.fullAddress);
//         formData.append("website", data.websiteURL);
//         formData.append("services_offered", data.servicesOffered);
//         formData.append("about_business", data.aboutBusiness);
//         //formData.append("membership_valid_till", data.membershipValidTill.toISOString());
//         formData.append("logo", data.bannerImage);

//         const response = await axios.post(
//             "https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/business/create-with-user/",
//             formData,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "ngrok-skip-browser-warning": "true",
//                     //"Content-Type": "multipart/form-data"
//                 }
//             }
//         );
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-4 bg-[#FFFFFF] rounded-lg">
//             <h1 className="font-poppins font-medium text-[#000000]">Basic Information</h1>
//             <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
//                 <div className="w-full grid gap-2 items-center mt-4">
//                     <label htmlFor="businessName" className="font-poppins text-[#252525]">
//                         Business Name*</label>
//                     <div className="w-full">
//                         <Input type="text" id="businessName" placeholder="Tech Solution Inc."
//                             className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
//                             {...register("businessName")}
//                         />
//                     </div>
//                     {errors.businessName && (
//                         <p className="text-red-500 text-sm font-poppins mt-1">
//                             {errors.businessName.message}
//                         </p>
//                     )}
//                 </div>
//                 <div className="w-full grid gap-2 items-center mt-4">
//                     <label htmlFor="emailAddress" className="font-poppins text-[#252525]">
//                         Email Address*</label>
//                     <div className="w-full">
//                         <Input type="text" id="emailAddress" placeholder="admin@business.com"
//                             className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
//                             {...register("emailAddress")}
//                         />
//                     </div>
//                     {errors.emailAddress && (
//                         <p className="text-red-500 text-sm font-poppins mt-1">
//                             {errors.emailAddress.message}
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
//                 <div className="w-full grid gap-2 items-center mt-4">
//                     <label htmlFor="phoneNumber" className="font-poppins text-[#252525]">
//                         Office Phone Number*</label>
//                     <div className="w-full">
//                         <Input type="text" id="phoneNumber" placeholder="Tech Solution Inc."
//                             className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
//                             {...register("phoneNumber")}
//                         />
//                     </div>
//                     {errors.phoneNumber && (
//                         <p className="text-red-500 text-sm font-poppins mt-1">
//                             {errors.phoneNumber.message}
//                         </p>
//                     )}
//                 </div>
//                 <div className="w-full grid gap-3 items-center mt-6">
//                     <label htmlFor="password" className="text-[#252525] font-poppins">
//                         Initial Password*</label>
//                     <div className="relative w-full">
//                         <Input
//                             type={showPassword ? "text" : "password"}
//                             id="password"
//                             placeholder="XXXXXXXXXXXXXXXXXX"
//                             className="pr-10 font-poppins bg-[#FFFFFF] text-black" // leave space for the eye button
//                             {...register("password")}
//                         />
//                         <button type="button" className="absolute right-3 top-3.5 cursor-pointer"
//                             onClick={() => setShowPassword(!showPassword)}>
//                             {showPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                             ) : (
//                                 <Eye className="h-4 w-4" />
//                             )}
//                         </button>
//                     </div>
//                     {errors.password && (
//                         <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
//                     )}
//                 </div>
//             </div>

//             <h1 className="font-poppins font-medium text-[#000000] mt-4">Location Information</h1>
//             <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
//                 <label htmlFor="country" className="font-poppins text-[#252525]">
//                     Country*</label>
//                 {/* Used Controller for Select component */}
//                 <Controller
//                     name="country"
//                     control={control}
//                     render={({ field }) => (
//                         <Select onValueChange={field.onChange} value={field.value}>
//                             <SelectTrigger className="w-full cursor-pointer font-poppins">
//                                 <SelectValue placeholder="All Countries" />
//                             </SelectTrigger>
//                             <SelectContent className="font-poppins">
//                                 <SelectGroup>
//                                     <SelectLabel>All Countries</SelectLabel>
//                                     {countries.map(item => (
//                                         <SelectItem key={item.id} value={item.name}>
//                                             {item.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                     )}
//                 />
//                 {errors.country && (
//                     <p className="text-red-500 text-sm font-poppins mt-1">
//                         {errors.country.message}
//                     </p>
//                 )}
//             </div>

//             <div className="w-full grid gap-2 items-center mt-4">
//                 <label htmlFor="fullAddress" className="font-poppins text-[#000000]">
//                     Full Address*</label>
//                 <div className="w-full">
//                     <Input type="text" id="fullAddress"
//                         placeholder="123 Tech street, san Francisco, CA 94105"
//                         className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
//                         {...register("fullAddress")}
//                     />
//                 </div>
//                 {errors.fullAddress && (
//                     <p className="text-red-500 text-sm font-poppins mt-1">
//                         {errors.fullAddress.message}
//                     </p>
//                 )}
//             </div>

//             <h1 className="font-poppins font-medium text-[#000000] mt-4">Business Details</h1>
//             <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
//                 <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
//                     <label htmlFor="websiteURL" className="font-poppins text-[#000000]">
//                         Website URL*</label>
//                     <div className="w-full">
//                         <Input type="text" id="websiteURL" placeholder="example.com"
//                             className="font-poppins bg-[#FFFFFF] text-[#3F3F3F] text-base"
//                             {...register("websiteURL")}
//                         />
//                     </div>
//                     {errors.websiteURL && (
//                         <p className="text-red-500 text-sm font-poppins mt-1">
//                             {errors.websiteURL.message}
//                         </p>
//                     )}
//                 </div>
//                 {/* <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
//                     <label htmlFor="membership" className="font-poppins text-[#000000]">
//                         Membership Valid Till*</label>
//                     <div className="w-full">
//                         <Controller
//                             name="membershipValidTill"
//                             control={control}
//                             render={({ field }) => (
//                                 <Popover open={open} onOpenChange={setOpen}>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             variant="outline"
//                                             id="date"
//                                             className="w-full justify-between font-normal font-poppins 
//                                             text-[#313131] cursor-pointer">
//                                             {field.value ? field.value.toLocaleDateString() : "DD / MM / YYYY"}
//                                             <CalendarHeartIcon />
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value}
//                                             captionLayout="dropdown"
//                                             onSelect={(selectedDate) => {
//                                                 field.onChange(selectedDate)
//                                                 setOpen(false)
//                                             }}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                             )}
//                         />
//                     </div>
//                     {errors.membershipValidTill && (
//                         <p className="text-red-500 text-sm font-poppins mt-1">
//                             {errors.membershipValidTill.message}
//                         </p>
//                     )}
//                 </div> */}
//             </div>

//             <div className="w-full grid gap-2 items-center mt-4">
//                 <label htmlFor="servicesOffered" className="font-poppins text-[#000000]">
//                     Services Offered*</label>
//                 <div className="w-full">
//                     <Textarea id="servicesOffered" placeholder="List services separated by commas"
//                         className="font-poppins resize-none whitespace-normal break-words"
//                         {...register("servicesOffered")}
//                     />
//                 </div>
//                 {errors.servicesOffered && (
//                     <p className="text-red-500 text-sm font-poppins mt-1">
//                         {errors.servicesOffered.message}
//                     </p>
//                 )}
//             </div>

//             <div className="w-full grid gap-2 items-center mt-4">
//                 <label htmlFor="aboutBusiness" className="font-poppins text-[#000000]">
//                     About Business*</label>
//                 <div className="relative w-full">
//                     <Textarea id="aboutBusiness" placeholder="Describe the business..."
//                         className="font-poppins resize-none whitespace-normal break-words"
//                         {...register("aboutBusiness")} />
//                 </div>
//                 {errors.aboutBusiness && (
//                     <p className="text-red-500 text-sm font-poppins mt-1">
//                         {errors.aboutBusiness.message}
//                     </p>
//                 )}
//             </div>

//             <h1 className="font-poppins font-medium text-[#000000] mt-4">Image</h1>
//             <div className="w-full grid gap-2 items-center mt-4">
//                 <label htmlFor="" className="font-poppins text-[#000000]">
//                     Banner Image*</label>
//                 <div className="relative w-full">
//                     <div
//                         onClick={handleClick}
//                         className={`border-2 border-dashed rounded-lg p-16 text-center cursor-pointer 
//                             transition-colors bg-white relative ${
//                             // Show error border if form has error
//                             error || errors.bannerImage ? 'border-red-400' :
//                                 'border-gray-300 hover:border-gray-400'
//                             }`}
//                     >
//                         <input
//                             id="file-input"
//                             type="file"
//                             accept="image/png,image/jpeg,image/jpg"
//                             onChange={handleFileChange}
//                             className="hidden"
//                         />
//                         {previewUrl ? (
//                             <div className="space-y-4">
//                                 <button
//                                     onClick={handleRemove}
//                                     className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 
//                                     text-white rounded-full p-2 transition-colors"
//                                     title="Remove image"
//                                 >
//                                     <X className="w-5 h-5 cursor-pointer" />
//                                 </button>
//                                 <img
//                                     src={previewUrl}
//                                     alt="Preview"
//                                     className="max-h-48 mx-auto rounded"
//                                 />
//                                 <p className="font-poppins text-gray-600">
//                                     {selectedFile?.name}
//                                 </p>
//                                 <p className="font-poppins text-sm text-gray-500">
//                                     Click to change image
//                                 </p>
//                             </div>
//                         ) : (
//                             <>
//                                 <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//                                 <p className="font-poppins text-gray-600 mb-2">
//                                     Click to upload new logo
//                                 </p>
//                                 <p className="font-poppins text-gray-400 text-sm">
//                                     PNG, JPG, up to 5MB (Square recommended)
//                                 </p>
//                             </>
//                         )}
//                     </div>

//                     {/* Show both custom error and form error */}
//                     {error && (
//                         <p className="font-poppins text-red-500 text-sm mt-2">{error}</p>
//                     )}
//                     {errors.bannerImage && (
//                         <p className="font-poppins text-red-500 text-sm mt-2">
//                             {errors.bannerImage.message}
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <div className="flex flex-col lg:flex-row gap-6 mt-6">
//                 <button type="submit" className="flex items-center justify-center gap-2 bg-[#327EF9] 
//                 text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
//                     <TbCategoryPlus className="text-[#EBF2FE] w-5 h-5" />
//                     Create Business
//                 </button>
//                 <button type="button" className="flex items-center justify-center gap-2 bg-[#B3261E] 
//                 text-[#EBF2FE] font-poppins px-4 py-2 rounded-lg cursor-pointer">
//                     <X className="text-[#EBF2FE] w-5 h-5" />
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// }


// // resize-none - Prevents manual resizing that could stretch the textarea.
// // whitespace-normal - Allows text to wrap to the next line.
// // break-words - Breaks long words if they exceed the width.











"use client"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarHeartIcon, Eye, EyeOff, Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbCategoryPlus } from "react-icons/tb";
import axios from "axios";
import { useView } from "../../ListGridContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// Country type definition
type Country = {
    id: string;
    name: string;
    flag: string;
};

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
    bannerImage: z.instanceof(File, { message: "Banner image is required" }),
    membershipValidTill: z.date({ message: "Membership date is required" })
});

type BusinessFormData = z.infer<typeof businessFormSchema>;

export default function CreateBusinessForm() {
    // console.log("hello");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const { auth, setAuth } = useView();
    const [open, setOpen] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<BusinessFormData>({
        resolver: zodResolver(businessFormSchema),
    });

    // Fetch countries from API on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(
                    'https://particularistically-transelementary-owen.ngrok-free.dev/api/core/countries/',
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        }
                    }
                );
                setCountries(response?.data?.countries);
                console.log("Countries loaded:", response?.data?.countries);
            } catch (error) {
                console.error("Failed to fetch countries:", error);
                setCountries([]);
            }
        };
        fetchCountries();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a PNG or JPG image');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }

            setError('');
            setSelectedFile(file);
            setValue('bannerImage', file);

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
        setValue('bannerImage', undefined as any);
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleClick = () => {
        document.getElementById('file-input')?.click();
    };

    // Updated onSubmit with proper error handling and authorization
    const onSubmit = async (data: BusinessFormData) => {
        try {
            console.log("Form Data:", data);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error("No access token found");
                // alert("Please login first");
                return;
            }

            const formData = new FormData();
            formData.append("email", data.emailAddress);
            formData.append("password", data.password);
            formData.append("business_name", data.businessName);
            formData.append("phone_number", data.phoneNumber);
            formData.append("country", data.country); // Now sends UUID instead of name
            formData.append("full_address", data.fullAddress);
            formData.append("website", data.websiteURL);
            formData.append("services", data.servicesOffered);
            formData.append("about_business", data.aboutBusiness);
            formData.append("logo", data.bannerImage);
            // formData.append("membership_valid_till", data.membershipValidTill.toISOString());
            // 2026-01-15T01:38:58.016109Z

            const isoDate = data.membershipValidTill;
            const date = new Date(isoDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            console.log(formattedDate); // "23/01/2026"

            formData.append("membership_valid_till", formattedDate);
            // console.log("Membership:", data.membershipValidTill.toISOString());

            const response = await axios.post(
                "https://particularistically-transelementary-owen.ngrok-free.dev/api/business/create-with-user/",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "true",
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            console.log("Success:", response?.data);
            // alert("Business created successfully!");
        } catch (error: any) { // Error handling
            console.error("Error creating business:", error);
            if (error?.response) {
                console.error("Response error:", error?.response?.data);
                //alert(`Error: ${JSON.stringify(error.response.data.errors || error.response.data.message)}`);
            } else if (error?.request) {
                console.error("No response:", error?.request);
                //alert("Network error. Please check your connection.");
            } else {
                console.error("Error:", error?.message);
                //alert("An error occurred. Please try again.");
            }
        }
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
                        Office Phone Number*</label>
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
                            className="pr-10 font-poppins bg-[#FFFFFF] text-black"
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
                                    {countries.length > 0 ? (
                                        countries.map((country) => (
                                            <SelectItem key={country.id} value={country.id}>
                                                {country.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="loading" disabled>
                                            Loading countries...
                                        </SelectItem>
                                    )}
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
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
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
            </div>

            <div className="w-full lg:w-1/2 grid gap-2 items-center mt-4">
                <label htmlFor="membership" className="font-poppins text-[#000000]">
                    Membership Valid Till*</label>
                <div className="w-full">
                    <Controller
                        name="membershipValidTill"
                        control={control}
                        render={({ field }) => (
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-full justify-between font-normal font-poppins 
                                            text-[#313131] cursor-pointer">
                                        {field.value ? field.value.toLocaleDateString() : "DD / MM / YYYY"}
                                        <CalendarHeartIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        captionLayout="dropdown"
                                        onSelect={(selectedDate) => {
                                            field.onChange(selectedDate)
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>
                {errors.membershipValidTill && (
                    <p className="text-red-500 text-sm font-poppins mt-1">
                        {errors.membershipValidTill.message}
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
                            transition-colors bg-white relative ${error || errors.bannerImage ?
                                'border-red-400' : 'border-gray-300 hover:border-gray-400'
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