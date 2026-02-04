// Fahim
"use client"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarHeartIcon, CloudUpload, Eye, EyeOff, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbCategoryPlus } from "react-icons/tb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/axiosInterceptor";

// Country type definition
type Country = {
    id: string;
    name: string;
    flag: string;
};

type Certificate = {
    id: string;
    name: string;
};

const businessFormSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),

    phoneNumber: z.string()
        .min(1, "Phone number is required")
        .regex(/^\+?\d+$/, "Phone number must contain only digits (optional + at start)")
        .max(20, "Phone number must not exceed 20 characters"),

    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
        .regex(/\d/, "Password must contain at least 1 number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character (!@#$%^&*(),.?\":{}|<>)"),

    country: z.string().min(1, "Country is required"),
    fullAddress: z.string().min(1, "Full address is required"),
    websiteURL: z.string().url("Invalid URL").min(1, "Website URL is required"),
    servicesOffered: z.string().min(1, "Services offered is required"),
    aboutBusiness: z.string().min(1, "About business is required"),
    bannerImage: z.instanceof(File, { message: "Banner image is required" }),
    membershipValidTill: z.date({ message: "Membership date is required" }),
    certifications: z.array(z.string())
});


type BusinessFormData = z.infer<typeof businessFormSchema>;

export default function CreateBusinessForm() {
    // console.log("hello");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [countries, setCountries] = useState<Country[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);

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
                const response = await api.get('/api/core/countries/');
                setCountries(response?.data?.countries);
                console.log("Countries loaded:", response?.data?.countries);
            }
            catch (error) {
                console.error("Failed to fetch countries:", error);
                setCountries([]);
            }
        };
        fetchCountries();
    }, []);


    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await api.get('/api/core/certifications/');
                setCertificates(response?.data?.certifications);
                console.log("Certificates loaded:", response?.data?.certifications);
            }
            catch (error) {
                console.error("Failed to fetch Certificates:", error);
                setCertificates([]);
            }
        };
        fetchCertifications();
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

            const formData = new FormData();
            formData.append("email", data.emailAddress);
            formData.append("password", data.password);
            formData.append("business_name", data.businessName);
            formData.append("phone_number", data.phoneNumber);
            formData.append("country", data.country);
            formData.append("full_address", data.fullAddress);
            formData.append("website", data.websiteURL);
            formData.append("services", data.servicesOffered);
            formData.append("about_business", data.aboutBusiness);
            formData.append("logo", data.bannerImage);

            // Fix date formatting
            const date = data.membershipValidTill; // Already a Date object
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            formData.append("membership_valid_till", formattedDate);

            data.certifications.forEach(certId => {
                formData.append("certifications", certId);
            });

            const response = await api.post("/api/business/create-with-user/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Success:", response?.data);
            toast.success("Success", {
                description: "Business Created Successfully",
            });

            // Optionally reset form or redirect
            // reset(); // If you want to clear the form

        }
        catch (error: any) {
            console.error("Error creating business:", error);

            // Better error handling with specific messages
            if (error?.response?.data) {
                const errorData = error.response.data;

                // Handle validation errors
                if (errorData.errors) {
                    const errorMessages = Object.entries(errorData.errors).map(([field, messages]) => {
                        const messageArray = messages as string[];
                        return `${field}: ${messageArray.join(', ')}`;
                    })
                        .join('\n');

                    toast.error("Validation Error", {
                        description: errorMessages,
                    });
                }
                // Handle email already exists error
                else if (errorData.email) {
                    toast.error("Email Already Exists", {
                        description: errorData.email[0] || "This email is already registered",
                    });
                }
                // Handle other errors
                else {
                    toast.error("Failed", {
                        description: errorData.message || "Failed to create business",
                    });
                }
            }
            else if (error?.request) {
                toast.error("Network Error", {
                    description: "Please check your internet connection",
                });
            }
            else {
                toast.error("Error", {
                    description: "An unexpected error occurred",
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 xl:p-8 mt-4 bg-[#FFFFFF] rounded-lg">
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

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-4">
                <div className="w-full grid gap-2 items-center">
                    <label htmlFor="phoneNumber" className="font-poppins text-[#252525]">
                        Office Phone Number*</label>
                    <div className="w-full">
                        <Input type="text" id="phoneNumber" placeholder="Phone Number"
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
                <div className="w-full grid gap-2 items-center">
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

            <h1 className="font-poppins font-medium text-[#000000] mt-8">Location Information</h1>
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
                                    {countries?.length > 0 ? (
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

            {/* <Select value={...}> → "What is currently selected?"
            <SelectItem value={...}> → "What is THIS option's value?" */}

            <div className="w-full grid gap-2 items-center mt-4">
                <label htmlFor="fullAddress" className="font-poppins text-[#000000]">
                    Full Address*</label>
                <div className="w-full">
                    <Input type="text" id="fullAddress"
                        placeholder="123 Tech Street, San Francisco, CA 94105"
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

            <h1 className="font-poppins font-medium text-[#000000] mt-8">Business Details</h1>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-4">
                <div className="w-full lg:w-1/2 grid gap-2 items-center">
                    <label htmlFor="websiteURL" className="font-poppins text-[#000000]">
                        Website URL*</label>
                    <div className="w-full">
                        <Input type="text" id="websiteURL" placeholder="https://joinventureai.com/"
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
                        name="membershipValidTill" // Field name in the form. This is the field name in your form data.
                        control={control} // This connects the Controller to React Hook Form.
                        render={({ field }) => (  // Gives you "field" object to work with
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-full justify-between font-normal font-poppins 
                                            text-[#313131] cursor-pointer">
                                        {date ? date.toLocaleDateString('en-GB') :
                                            "DD / MM / YYYY"}
                                        {/* (en-GB → 12/04/2027 style) */}
                                        <CalendarHeartIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single" // User can pick only ONE date
                                        selected={date} // Shows which date is currently selected
                                        captionLayout="dropdown"
                                        onSelect={(selectedDate) => {
                                            if (selectedDate) {
                                                setDate(selectedDate); // Save to local state (shows on button)
                                                field.onChange(selectedDate); // Save to form (for validation & submission), Sends Date object
                                                // important for RHF
                                            } else {
                                                setDate(undefined);  // Clear the display
                                                field.onChange(undefined); // Clear the form
                                            }
                                            setOpen(false); // Close the calendar popup
                                        }}
                                        fromYear={2025}
                                        toYear={2150}
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

            <h1 className="font-poppins font-medium text-[#000000] mt-8">Business Certifications</h1>
            <label htmlFor="" className="font-poppins text-[#595959]">
                Select all certifications that apply to your business</label>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4">
                {
                    certificates?.map(item => (
                        <div key={item.id} className="p-2 flex items-center gap-2 border border-gray-300 rounded-sm">
                            <Controller
                                name="certifications"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id={item.id}
                                        onCheckedChange={(checked) => {
                                            const current = field.value;
                                            const updated = checked ?
                                                [...current, item.id] // add
                                                : current.filter(id => id !== item.id); // remove
                                            field.onChange(updated);
                                        }}
                                    />
                                )}
                            />
                            <label
                                htmlFor={item.id}
                                className="font-poppins cursor-pointer"
                            >
                                {item.name}
                            </label>
                        </div>
                    ))
                }
            </div>

            <div className="w-full grid gap-2 items-center mt-8">
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

            <div className="w-full grid gap-2 items-center mt-8">
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

            <h1 className="font-poppins font-medium text-[#000000] mt-8">Image</h1>
            <div className="w-full grid gap-2 items-center mt-2">
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
                                <CloudUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <p className="font-poppins text-gray-600 mb-2">
                                    Click to upload new Banner
                                </p>
                                <p className="font-poppins text-gray-400 text-sm">
                                    PNG, JPG, up to 5MB (1200X400 recommended)
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



// resize-none - Prevents manual resizing that could stretch the textarea.
// whitespace-normal - Allows text to wrap to the next line.
// break-words - Breaks long words if they exceed the width.