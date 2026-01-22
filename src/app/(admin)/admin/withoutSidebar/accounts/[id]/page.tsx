"use client";

import { use, useEffect, useState } from "react";
import {
    Mail,
    Phone,
    Globe,
    MapPin,
    Clock,
    Calendar,
    CalendarCheckIcon,
    Clock10Icon,
    CalendarIcon,
    ArrowBigLeft,
    ArrowBigLeftIcon,
    ArrowLeft,
    Cross,
    X,
    MailIcon,
    PhoneIcon,
    Building2,
    AwardIcon,
    Star,
} from "lucide-react";
import { PiX } from "react-icons/pi";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import api from "../../../../../api";
import Flag from "@/app/flag/page";

/*
export interface Service {
    name: string;
}

export interface LocationData {
    id: string,
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}


export interface Award {
    id: string;
    name: string;
}

export interface Activity {
    active: boolean;
    activeFor: number;
    lastUpdated: string;
}

export interface Contact {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    isPrimary: boolean;
}

export interface ContactInfo {
    office: {
        phone: string;
        email: string;
        website: string;
    };
    contacts: Contact[];
}

export interface CompanyProfile {
    name: string;
    address: string;
    country: string;
    about: string;
    contact: ContactInfo;
    services: Service[];
    awards: Award[];
    location: LocationData[];
    banner: string,
    gallery: string[],
}*/

export interface ApiService {
    id: string;
    title: string;
    description?: string;
}

export interface ApiBranch {
    id: string;
    full_name: string;
    full_address: string;
    city?: string;
    country?: {id:string;
        name: string;
        file:string;
    };
}

export interface ApiContact {
    id: string;
    full_name: string;
    position: string;
    email: string;
    phone_number: string;
    is_primary: boolean;
}

export interface ApiCertification {
    id: string;
    name: string;
    issued_by?: string;
}

export interface BusinessProfile {
    id: string;
    business_name: string;
    about_business: string;
    full_address: string;
    phone_number: string;
    user_full_name: string;
    user_email: string;
    website: string | null;
    country: {
        id: string;
        name: string;
        file: string;
    };
    country_name?: string;
    logo: string | null;
    is_locked: boolean;
    created_at: string;
    updated_at: string;

    // Nested Data Arrays
    services: ApiService[];
    branches: ApiBranch[];
    contacts: ApiContact[];
    certifications: ApiCertification[];
    gallery: {id:string,
        image:string,
    }[];
}

export default function AccountPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [activeService, setActiveService] = useState<string | null>(null);
    const [modal, setModal] = useState<number | undefined>(undefined);
    const {id} = use(params)
    const router = useRouter()
    

    const activities = {
        active: true,
        activeFor: 23,
        lastUpdated: crypto.randomUUID(),
    }

    

    const [businesses, setBusinesses] = useState<BusinessProfile>();
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    function getActiveMonths(): number {
        const createdAt = new Date(businesses?businesses.created_at:'');
        const now = new Date(); 

        let months =
            (now.getFullYear() - createdAt.getFullYear()) * 12 +
            (now.getMonth() - createdAt.getMonth());

        // adjust if current day is before created day
        if (now.getDate() < createdAt.getDate()) {
            months -= 1;
        }

        return Math.max(months, 0);
    }


    function getLastUpdated() {
        const date = businesses ? businesses.updated_at : ''

        const formattedDate = date.slice(0, 10);
        const formattedTime = date.slice(11, 16); 

        return {
            date: formattedDate,
            time: formattedTime,
        };
    }



    useEffect(() => {
        const controller = new AbortController();

        const fetchBusinesses = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const response:any = await api.get(`business/${id}/`, {
                    signal: controller.signal
                });

               

                const data = response.data.business
                
                setBusinesses(data);

            } catch (err: any) {
                if (err.name !== 'CanceledError') {
                    setError("Failed to load services. Please try again later.");
                    
                }
            } finally {
                setLoading(false);
            }
        };


        

        fetchBusinesses();
        

        return () => controller.abort();
    }, [id]); 



    return (
        <div className="w-full min-h-screen ">
            <div className="relative w-full min-h-screen">
                <div className="fc h-[50vw] md:h-[22vw] w-[100%] m-auto overflow-hidden ">
                    <img
                        src={`${businesses?.logo}`}
                        alt="accounts"
                        className="w-[170%] "
                    ></img>
                </div>
                <button
                    className="absolute top-[2vw] left-[2vw] fc h-10 p-4 bg-blue-200 border-blue-400 rounded-lg gap-2"
                    onClick={() => {
                        router.back();
                    }}
                >
                    <ArrowLeft color={"#001a81ff"} />
                    <p className="text-blue-900 text-md font-semibold">
                        Back 
                    </p>
                </button>

                <div className=" flex flex-col top-[calc(50vw-82px)] md:top-[calc(22vw-82px)] max-w-12xl mx-10 py-6 md:py-12">
                    {/* Header Section */}
                    <div className="fc flex-col text-center mb-12 animate-fade-in-up">
                        {/*
                        <div className="inline-block mb-6 relative group border-5 border-[#FFFFFF] rounded-lg">
                            <img
                                src={companyData.logo}
                                alt={companyData.name}
                                className="w-40 h-40 rounded-lg object-cover s relative transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        */}

                        <h1 className="text-3xl fc gap-3 font-semibold mb-2 tracking-tight">
                            <span className=" text-black">
                                {businesses?.business_name}
                            </span>
                            <Flag id={businesses?.country?.id} h={28} w={28}/>
                        </h1>

                        <div className="flex items-center justify-center gap-2 text-[#909090] mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-md font-medium">{businesses?.full_address}</span>
                        </div>


                        {/* Action Buttons */}
                        <div className="flex justify-center md:gap-6 items-center w-full md:w-[33vw] mt-4 flex-col md:flex-row">
                            {/* Email Link */}
                            <a
                                href={`mailto:${businesses?.user_email}`}
                                className="z-50 group w-full max-w-40 fc px-4 md:px-8 text-[#153569] py-2 bg-white hover:bg-blue-500 hover:text-white rounded-sm font-medium transition-all border border-[#153569] hover:border-blue-500 duration-300 hover:-translate-y-0.5 flex items-center gap-2 mt-4"
                            >
                                <Mail className="w-4 h-4  transition-transform" />
                                Email
                            </a>

                            {/* Website Link */}
                            <a
                                href={businesses?.website || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full hover:text-white hover:bg-blue-500 hover:border-blue-500 max-w-40 fc px-4 md:px-8 py-2 bg-white text-[#153569] rounded-sm font-medium transition-all duration-300 hover:-translate-y-0.5 border border-[#153569] flex items-center gap-2 mt-4 group"
                            >
                                <Globe className="w-4 h-4  transition-transform" />
                                Website
                            </a>
                        </div>
                    </div>

                    {/* Top Row: About, Contact, Activity */}
                    <div className="flex flex-col mb-6 md:flex-row gap-6 items-stretch">
                        <div className="flex-1 w-full flex flex-col gap-6">
                            {/* About */}
                            <div className="flex-1 backdrop-blur-sm rounded-md p-4 md:p-6 s hover:s transition-all duration-300 animate-fade-in-up border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                    About
                                </h2>
                                <p className="text-[stone-600] h-23 leading-relaxed overflow-auto ">
                                    {businesses?.about_business}
                                </p>
                            </div>

                            {/* Services */}
                            <div className="flex-1 w-full rounded-md p-4 md:p-6 s transition-all duration-300 animate-fade-in-up stagger-4 border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                    Services
                                </h2>

                                <div className="flex max-h-22 flex-wrap overflow-auto gap-3 pl-4 pb-4">
                                    {businesses?.services?.map((service, index) => (
                                        <span
                                            key={service.id}
                                            className="px-3 py-1 bg-blue-100 font-semibold text-blue-800 text-base rounded-full shadow-md shadow-blue-300"
                                        >
                                            {service.title}
                                        </span>
                                    ))}
                                    {/*(companyData.services.length -5) > 0 && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-900 text-base rounded-full shadow-md shadow-blue-200">
                                        {(companyData.services.length - 5)}+
                                    </span>
                                )*/}
                                </div>
                            </div>


                            {/*Awards*/}
                            <div className="w-full rounded-md p-4 md:p-6 s transition-all duration-300 animate-fade-in-up stagger-4 border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                    Certifications
                                </h2>

                                <div className="flex max-h-22 flex-wrap overflow-auto gap-3 pl-4 pb-4">
                                    {businesses?.certifications?.map((award, index) => (
                                        
                                        <span
                                            key={award.id}
                                            className="fc gap-1 px-3 py-1 bg-[#27930033] font-semibold text-[#279300] text-base rounded-full shadow-md shadow-[#27930088] "
                                        >
                                            <AwardIcon size={16}/>{award.name}
                                        </span>
                                    ))}
                                    {/*(companyData.services.length -5) > 0 && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-900 text-base rounded-full shadow-md shadow-blue-200">
                                        {(companyData.services.length - 5)}+
                                    </span>
                                )*/}
                                </div>
                            </div>


                            {/* Locations */}

                            <div className="flex-1 w-full rounded-md p-4 md:p-6 s transition-all duration-300 animate-fade-in-up stagger-4 border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Branch Locations
                                </h2>

                                <div className="flex flex-wrap overflow-auto gap-3 pl-4 pb-4">
                                    {businesses?.branches?.map((loc, index) => (
                                        <span
                                            key={loc.id}
                                            className="fc gap-2 px-3 py-1 bg-[#FEF3EB] font-semibold text-[#917057] text-base rounded-full shadow-md shadow-[#d3c1b3] "
                                        >
                                            <Flag id={loc?.country?.id} h={18} w={18} />
                                            <p>{loc.city}, {loc?.country?.name}</p>
                                        </span>
                                    ))}
                                </div>
                            </div>



                        </div>

                        <div className="flex-1 flex items-start flex-col gap-6">
                            {/* Contact Information */}
                            <div className="w-full bg-white rounded-md p-4 md:p-6 s  hover:s  transition-all duration-300 animate-fade-in-up border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                    Contact Information
                                </h2>
                                <div className=" border-b border-gray-300 pb-4">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                            Office Number
                                        </p>
                                        <span className="text-[#327EF9] hover:text-blue-700 font-medium transition-colors">
                                            {businesses?.phone_number}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                            Email
                                        </p>
                                        <a
                                            href={`mailto:${businesses?.user_email}`}
                                            className="text-[#327EF9] hover:text-blue-700 font-medium transition-colors"
                                        >
                                            {businesses?.user_email}
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-md text-gray-500 font-semibold p-2 pb-4">
                                    Contact Persons
                                </h3>

                                {businesses?.contacts.map((item, index) => (item.is_primary===false? null:
                                   ( <div
                                        key={index}
                                        className="border border-[#327EF9] hover:bg-[#327EF922] px-4 p-2 mb-2 rounded-lg"
                                    >
                                        <div>
                                            <span className="flex flex-row items-center gap-4 text-[#000000] text-lg font-medium transition-colors">
                                                {item.full_name}{item.is_primary && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-400 border border-orange-400 rounded-full text-xs font-medium">
                                                    <Star className="w-3 h-3 fill-orange-400" />
                                                    Primary
                                                </span>
                                            )}
                                            </span>
                                            
                                        </div>
                                        <div>
                                            <span className="flex flex-row items-center gap-2 text-gray-500 text-md font-medium transition-colors">
                                                {item.position}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="flex flex-row items-center gap-2 text-[#327EF9] hover:text-blue-700  text-md font-semibold transition-colors">
                                                <PhoneIcon color={"#327EF9"} size={16} />
                                                {item.phone_number}
                                            </span>
                                        </div>
                                        <div>
                                            <a
                                                href={`mailto:${item.email}`}
                                                className="flex flex-row items-center gap-2 text-[#327EF9] text-md font-semibold hover:text-blue-700 transition-colors"
                                            >
                                                <MailIcon color={"#327EF9"} size={16} />
                                                {item.email}
                                            </a>
                                        </div>
                                    </div>)
                                ))}

                                {businesses?.contacts.map((item, index) => (item.is_primary === true ? null :
                                    (<div
                                        key={index}
                                        className="border border-[#327EF9] hover:bg-[#327EF922] px-4 p-2 mb-2 rounded-lg"
                                    >
                                        <div>
                                            <span className="flex flex-row items-center gap-2 text-[#000000] text-lg font-medium transition-colors">
                                                {item.full_name}
                                            </span>
                                            
                                        </div>
                                        <div>
                                            <span className="flex flex-row items-center gap-2 text-gray-500 text-md font-medium transition-colors">
                                                {item.position}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="flex flex-row items-center gap-2 text-[#327EF9] hover:text-blue-700  text-md font-semibold transition-colors">
                                                <PhoneIcon color={"#327EF9"} size={16} />
                                                {item.phone_number}
                                            </span>
                                        </div>
                                        <div>
                                            <a
                                                href={`mailto:${item.email}`}
                                                className="flex flex-row items-center gap-2 text-[#327EF9] text-md font-semibold hover:text-blue-700 transition-colors"
                                            >
                                                <MailIcon color={"#327EF9"} size={16} />
                                                {item.email}
                                            </a>
                                        </div>
                                    </div>)
                                ))}
                            </div>

                            {/* Activity */}
                            <div
                                className=" w-full h-[100%] lg:col-span-2 bg-white backdrop-blur-sm rounded-md p-4 md:p-6 s -lg hover:s 
                             transition-all duration-300 animate-fade-in-up stagger-3 border border-[#d6d6d6]"
                            >
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                    Activity
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="fc flex-row">
                                            <div className="fc h-11 w-11 rounded-sm bg-[#BFD7FD] text-[#2E73E3]">
                                                <CalendarIcon size={22} />
                                            </div>
                                            <div className="flex flex-col items-left justify-center ml-2">
                                                <p className="text-sm text-gray-500">Active for</p>
                                                <p className="text-sm text-[#327EF9]">
                                                    {getActiveMonths()} Months
                                                </p>
                                            </div>
                                        </div>
                                        <div className="fc flex-row ">
                                            <div className="fc h-11 w-11 rounded-sm bg-[#FDDAC0] text-[#884B1D]">
                                                <Clock10Icon size={22} />
                                            </div>
                                            <div className="flex flex-col items-left justify-center ml-2">
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <div className="flex flex-row items-left justify-center gap-6">
                                                    <p className="text-sm text-[#327EF9]">
                                                        {getLastUpdated().date}
                                                    </p>
                                                    <p className="text-sm text-[#327EF9]">
                                                        {getLastUpdated().time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Gallery */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Gallery */}
                        <div className="lg:col-span-5 rounded-md p-4 md:p-6 s hover:s border transition-all duration-300 animate-fade-in-up stagger-5 border border-[#d6d6d6]">
                            <h2 className="text-lg font-semibold mb-6 text-gray-900">
                                Gallery{modal}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 overflow-y-scroll scrollbar-hide max-h-88">
                                {businesses?.gallery.map((item:any,index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setModal(index+ 1)}
                                        className="fc col-span-1 overflow-hidden bg-black aspect-[16/9] rounded-sm"
                                    >
                                        <img
                                            src={item ? item?.image : ''}
                                            alt="image"
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-7xl aspect-video overflow-hidden border">
                        <button
                            onClick={() => setModal(undefined)}
                            className=" absolute z-100 left-[1240px] top-[5px] bg-white text-gray-500 p-1 font-bold rounded-full"
                        >
                            <X />
                        </button>
                        <Image
                            src={`${businesses?.gallery[modal - 1]?.image}`}
                            alt="Image Enlarged"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}