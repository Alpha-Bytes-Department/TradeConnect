"use client";

import { useState } from "react";
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
} from "lucide-react";
import { PiX } from "react-icons/pi";
import { redirect } from "next/navigation";
import Image from "next/image";

interface Service {
    id: string;
    name: string;
}

interface Activity {
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
    office:{
        phone: string;
        email: string;
        website: string;
    };
    contacts: Contact[],
    
}

interface CompanyProfile {
    name: string;
    address: string;
    industry: string;
    logo: string;
    about: string;
    contact: ContactInfo;
    services: Service[];
    activities: Activity;
    gallery: string[];
}

export default function AccountPage() {
    const [activeService, setActiveService] = useState<string | null>(null);
    const [modal, setModal]= useState<number|undefined>(undefined)






    const companyData: CompanyProfile = {
        name: "Construction Partners",
        address: "989 Builder Road, Dubai, UAE",
        industry: "Construxion",
        logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
        about:
            "We are a trusted construction company dedicated to delivering high-quality projects on time and within budget. From residential buildings to commercial developments, we focus on safety, durability, and customer satisfaction at every step.",
        contact: {
            office:{
                phone: '5656565494555',
                email: 'mmislam272@gmail.com',
                website: 'dtrhfgg'
            },
            contacts: [
                {
                    id: '1',
                    name: 'Sample Name',
                    position: 'CEO',
                    phone: '5656565494555',
                    email: 'mmislam272@gmail.com',
                    isPrimary: true,
                },
                {
                    id: '2', 
                    name: 'Sample Name',
                    position: 'CEO',
                    phone: '5656565494555',
                    email: 'mmislam272@gmail.com',
                    isPrimary: false,
                },
                {
                    id: '3', 
                    name: 'Sample Name',
                    position: 'CEO',
                    phone: '5656565494555',
                    email: 'mmislam272@gmail.com',
                    isPrimary: false,
                },
            ]
        },
        services: [
            { id: "1", name: "Commercial Construction" },
            { id: "2", name: "Project Management" },
            { id: "3", name: "Renovation" },
            { id: "4", name: "Infrastructure" },
            { id: "11", name: "Commercial Construction" },
            { id: "21", name: "Project Management" },
            { id: "31", name: "Renovation" },
            { id: "41", name: "Infrastructure" },
            { id: "51", name: "Commercial Construction" },
            { id: "x1", name: "Commercial Construction" },
            { id: "x2", name: "Project Management" },
            { id: "x3", name: "Renovation" },
            { id: "x4", name: "Infrastructure" },
            { id: "x11", name: "Commercial Construction" },
            { id: "x21", name: "Project Management" },
            { id: "x31", name: "Renovation" },
            { id: "xx1", name: "Infrastructure" },
            { id: "x51", name: "Commercial Construction" },


        ],
        activities: {
            active: true,
            activeFor: 23,
            lastUpdated: new Date().toISOString(),
        },
        gallery: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1541976590-713941681591?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
        ],
    };

    return (
        <div className="w-full min-h-screen ">
            <div className="relative w-full min-h-screen">
                <div className="fc h-[50vw] md:h-[22vw] w-[100%] m-auto overflow-hidden ">
                    <img
                        src=".././././accountsBanner.png"
                        alt="accounts"
                        className="w-[170%] "
                    ></img>
                </div>
                <button
                    className="absolute top-[2vw] left-[2vw] fc h-10 p-4 bg-blue-200 border-blue-400 rounded-lg gap-2"
                    onClick={() => {
                        redirect("/admin/directory");
                    }}
                >
                    <ArrowLeft color={"#001a81ff"} />
                    <p className="text-blue-900 text-md font-semibold">
                        Back to Directory
                    </p>
                </button>

                <div className="absolute flex flex-col top-[calc(50vw-82px)] md:top-[calc(22vw-82px)] max-w-12xl mx-auto pb-6 md:pb-12">
                    {/* Header Section */}
                    <div className="fc flex-col text-center mb-12 animate-fade-in-up">
                        <div className="inline-block mb-6 relative group border-5 border-[#FFFFFF] rounded-lg">
                            <img
                                src={companyData.logo}
                                alt={companyData.name}
                                className="w-40 h-40 rounded-lg object-cover s relative transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <h1 className="text-3xl font-semibold mb-4 tracking-tight">
                            <span className=" text-black">{companyData.name}</span>
                        </h1>

                        <div className="flex items-center justify-center gap-2 text-[#909090] mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">{companyData.address}</span>
                        </div>

                        <div className="inline-block">
                            <span className="px-6 py-2 bg-[#FBC8A2] text-[#153569] rounded-full text-sm font-semibold ">
                                {companyData.industry}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center md:gap-10 items-center w-full md:w-[33vw] mt-8 flex-col md:flex-row">
                            <button className="group w-full max-w-40 fc px-4 md:px-8 text-[#153569] py-2 bg-white hover:bg-blue-500 hover:text-white rounded-sm font-medium gl transition-all border border-[#153569] hover:border-blue-500 duration-300 hover:-translate-y-0.5 flex items-center gap-2 mt-4">
                                <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                Email
                            </button>

                            <button className=" w-full hover:text-white hover:bg-blue-500 gl hover:border-blue-500 max-w-40 fc px-4 md:px-8 py-2 bg-white text-[#153569] rounded-sm font-medium transition-all duration-300 hover:-translate-y-0.5 border border-[#153569] flex items-center gap-2 mt-4 group">
                                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                Website
                            </button>
                        </div>
                    </div>

                    {/* Top Row: About, Contact, Activity */}
                    <div className="flex flex-col mb-6 md:flex-row md:h-[630px] gap-6">
                        <div className="flex-1 md:h-[100%] w-full flex flex-col gap-6">
                            {/* About */}
                            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-md p-4 md:p-6 s hover:s transition-all duration-300 animate-fade-in-up stagger-1 border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                    About
                                </h2>
                                <p className="text-[stone-600] h-22 leading-relaxed overflow-auto">
                                    {companyData.about}
                                </p>
                            </div>


                            {/* Services */}
                            <div className="flex-1 w-full rounded-md p-4 md:p-6 s transition-all duration-300 animate-fade-in-up stagger-4 border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-6 text-gray-900">
                                    Services
                                </h2>

                                <div className="flex max-h-20 flex-wrap overflow-auto gap-3 pl-4 pb-4">
                                    {companyData.services?.map((service, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-900 text-base rounded-full shadow-md shadow-blue-200"
                                        >
                                            {service.name}
                                        </span>
                                    ))}
                                    {/*(companyData.services.length -5) > 0 && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-900 text-base rounded-full shadow-md shadow-blue-200">
                                        {(companyData.services.length - 5)}+
                                    </span>
                                )*/}
                                </div>
                            </div>





                            {/* Activity */}
                            <div className="flex-1 w-full lg:col-span-1 bg-white backdrop-blur-sm rounded-md p-4 md:p-6 s -lg hover:s 
                             transition-all duration-300 animate-fade-in-up stagger-3 border border-[#d6d6d6]">
                                <h2 className="text-lg font-semibold mb-6 text-gray-900">
                                    Activity
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="flex items-start flex-row">
                                            <div className="fc h-12 w-12 rounded-sm bg-[#BFD7FD] text-[#2E73E3]">
                                                <CalendarIcon />
                                            </div>
                                            <div className="flex flex-col items-left justify-center ml-2">
                                                <p className="text-sm text-gray-500">Active for</p>
                                                <p className="text-md text-[#327EF9]">
                                                    {companyData.activities.activeFor} Months
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start flex-row">
                                            <div className="fc h-12 w-12 rounded-sm bg-[#FDDAC0] text-[#884B1D]">
                                                <Clock10Icon />
                                            </div>
                                            <div className="flex flex-col items-left justify-center ml-2">
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <div className="flex flex-row items-left justify-center gap-6">
                                                    <p className="text-md text-[#327EF9]">
                                                        {companyData.activities.lastUpdated.slice(0, 10)}
                                                    </p>
                                                    <p className="text-md text-[#327EF9]">
                                                        {companyData.activities.lastUpdated.slice(11, 16)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Contact Information */}
                        <div className="flex-1 w-full h-[100%] bg-white rounded-md p-4 md:p-6 s  hover:s  transition-all duration-300 animate-fade-in-up border border-[#d6d6d6]">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                Contact Information
                            </h2>
                            <div className="space-y-1 border-b border-gray-300 p-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        Office Number
                                    </p>
                                    <span className="text-[#327EF9] hover:text-blue-700 font-medium transition-colors">
                                        {companyData.contact.office.phone}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        Email
                                    </p>
                                    <a
                                        href={`mailto:${companyData.contact.office.email}`}
                                        className="text-[#327EF9] hover:text-blue-700 font-medium transition-colors"
                                    >
                                        {companyData.contact.office.email}
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-md text-gray-500 font-semibold p-2 pb-4">Contact Persons</h3>

                            {companyData.contact.contacts.map((item,index)=>
                            <div key={index} className="border border-[#327EF9] hover:bg-[#327EF922] px-4 p-2 mb-2 rounded-lg">
                                <div>
                                    <span className="flex flex-row items-center gap-2 text-[#000000] text-lg font-medium transition-colors">
                                        {item.name}
                                    </span>
                                </div><div>
                                    <span className="flex flex-row items-center gap-2 text-gray-500 text-md font-medium transition-colors">
                                            {item.position}
                                    </span>
                                </div>
                                <div>
                                        <span className="flex flex-row items-center gap-2 text-[#327EF9] hover:text-blue-700  text-md font-semibold transition-colors">
                                            <PhoneIcon color={'#327EF9'} size={16} />{item.phone}
                                    </span>
                                </div>
                                <div>
                                    <a
                                            href={`mailto:${item.email}`}
                                            className="flex flex-row items-center gap-2 text-[#327EF9] text-md font-semibold hover:text-blue-700 transition-colors"
                                    >
                                            <MailIcon color={'#327EF9'} size={16} />{item.email}
                                    </a>
                                </div>
                            </div>)}
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
                                {companyData.gallery.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={()=>setModal(index+1)}
                                        className="fc col-span-1 overflow-hidden bg-black aspect-[16/9] rounded-sm"
                                    >
                                        <img
                                            src={image}
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
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
                        <button onClick={() => setModal(undefined)} className="absolute left-[410px] top-[5px] bg-white text-gray-500 p-1 font-bold rounded-full">
                            <X/>
                        </button>
                        <Image
                            src={`${companyData.gallery[modal-1]}`}
                            alt="Image Enlarged"
                            width={500}
                            height={300}
                            className="object-cover rounded-lg"
                        />

                    </div>
                </div>
            )}
        </div>
    );
}
