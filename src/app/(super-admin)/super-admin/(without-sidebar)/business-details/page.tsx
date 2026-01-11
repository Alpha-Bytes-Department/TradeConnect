// Fahim
"use client"
import Modal from "@/components/ui/modal";
import { Globe, Landmark, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function BusinessDetails() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const animations = [
        {
            type: "fade" as const,
            name: "Fade",
            description: "Simple fade-in animation",
            color: "bg-purple-500 hover:bg-purple-600",
        },
    ];

    const openModal = (type: string) => {
        setActiveModal(type);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <div className="max-w-[1300px] mx-auto p-3">
            <div className="relative w-full h-[350px] px-4 flex items-center justify-center">
                <Image src="/all-business-card-banners/3.jpg" alt="" fill
                    className="object-cover object-center" />
            </div>
            {/* <div className="max-w-[300px] h-[150px] mx-auto -mt-16 relative">
                <Image src="/all-business-card-banners/2.jpg" alt="" fill
                    className="rounded-lg object-cover object-center
                    hover:scale-110 transition-transform duration-300 ease-in-out" />
            </div> */}

            <div className="flex flex-col items-center justify-center gap-2 mt-12">
                <h1 className="font-poppins font-semibold text-[#141414] 
                text-2xl">Construction Partners</h1>
                <div className="flex items-center gap-2">
                    <MapPin className="text-[#909090] text-sm" />
                    <p className="font-poppins text-[#909090] text-sm">
                        987 Builder Road, Dubai, UAE</p>
                </div>
                <p className="bg-[#FBC8A2] text-[#153569] px-2 py-0.5
                rounded-full">Construction</p>
                <div className="flex flex-col md:flex-row gap-8 mt-2">
                    <button className="bg-[#327EF9] text-[#EBF2FE] flex 
                items-center gap-3 px-8 py-2 rounded-sm cursor-pointer
                font-poppins">
                        <Mail className="w-5 h-5 text-[#EBF2FE]" />
                        Email
                    </button>
                    <button className="bg-[#327EF9] text-[#EBF2FE] flex 
                items-center gap-3 px-8 py-2 rounded-sm cursor-pointer
                font-poppins">
                        <Globe className="w-5 h-5 text-[#EBF2FE]" />
                        Website
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mt-8 lg:h-[900px]">
                <div className="w-full lg:w-1/2 h-full flex flex-col gap-8">
                    {/* About */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">About</h1>
                        <p className="font-poppins text-[#3F3F3F] text-sm">
                            We are a trusted construction company dedicated
                            to delivering high-quality projects on time and
                            within budget. From residential buildings to
                            commercial developments, we focus on safety,
                            durability, and customer satisfaction at every
                            step.</p>
                    </div>

                    {/* Services */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Services</h1>
                        <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Commercial Construction</p>
                        <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Project Management</p>
                        <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Course Development</p>
                        <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Commercial Construction</p>
                        <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Course Development</p>
                        <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Commercial Construction</p>
                    </div>

                    {/* Certifications */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Certifications</h1>
                        <p className="bg-[#27930029] inline-block px-2 py-1 mt-1 font-poppins 
                        text-[#279300] text-xs rounded-full">Commercial Construction</p>
                        <p className="bg-[#27930029] inline-block px-2 py-1 mt-1 font-poppins 
                        text-[#279300] text-xs rounded-full">Local Freight Association</p>
                    </div>

                    {/* Branch Locations */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Branch Locations</h1>
                        <div className="bg-[#FEF3EB] rounded-full flex gap-1 inline-flex mt-2 mr-1">
                            <p className="font-poppins text-[#153569] px-4 py-1 inline-block">
                                Paris, France</p>
                        </div>
                        <div className="bg-[#FEF3EB] rounded-full flex gap-1 inline-flex mt-2 mr-1">
                            <p className="font-poppins text-[#153569] px-4 py-1 inline-block">
                                San Francisco, USA</p>
                        </div>
                        <div className="bg-[#FEF3EB] rounded-full flex gap-1 inline-flex mt-2 mr-1">
                            <p className="font-poppins text-[#153569] px-4 py-1 inline-block">
                                London, UK</p>
                        </div>
                        <div className="bg-[#FEF3EB] rounded-full flex gap-1 inline-flex mt-2 mr-1">
                            <p className="font-poppins text-[#153569] px-4 py-1 inline-block">Sydney,
                                Australia</p>
                        </div>
                    </div>
                </div>


                <div className="w-full lg:w-1/2 h-full flex flex-col gap-3">
                    {/* Contact Information */}
                    <div className="flex flex-col gap-3 p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Contact Information</h1>
                        <div className="mt-3">
                            <p className="font-poppins text-[#595959] text-sm">Office number</p>
                            <p className="font-poppins text-[#327EF9] text-sm">+971 245 54 5 643</p>
                        </div>
                        <div>
                            <p className="font-poppins text-[#595959] text-sm">Office Email</p>
                            <p className="font-poppins text-[#327EF9] text-sm">asksaha9@gmail.com</p>
                        </div>
                        <div className="w-full h-[1px] bg-gray-300 mt-3" />
                        <p className="font-poppins text-[#595959] text-sm">Contact Persons</p>
                        <div className="p-2 border rounded-lg">
                            <p className="font-medium font-poppins">Sarah Johnson</p>
                            <p className="font-poppins text-[#909090]">CEO</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Mail className="w-5 h-5 text-[#327EF9]" />
                                <p className="font-poppins text-[#327EF9]">
                                    sarah@gmail.com
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Phone className="w-5 h-5 text-[#327EF9]" />
                                <p className="font-poppins text-[#327EF9]">
                                    +1 555-0125
                                </p>
                            </div>
                        </div>
                        <div className="p-2 border rounded-lg mt-3">
                            <p className="font-medium font-poppins">Sarah Johnson</p>
                            <p className="font-poppins text-[#909090]">Managing Director</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Mail className="w-5 h-5 text-[#327EF9]" />
                                <p className="font-poppins text-[#327EF9]">
                                    sarah@gmail.com
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Phone className="w-5 h-5 text-[#327EF9]" />
                                <p className="font-poppins text-[#327EF9]">
                                    +1 555-0125
                                </p>
                            </div>
                        </div>
                        <div className="p-2 border rounded-lg mt-3">
                            <p className="font-medium font-poppins">Sarah Johnson</p>
                            <p className="font-poppins text-[#909090]">Sales Manager</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Mail className="w-5 h-5 text-[#327EF9]" />
                                <p className="font-poppins text-[#327EF9]">
                                    sarah@gmail.com
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Phone className="w-5 h-5 text-[#327EF9]" />
                                <p className="font-poppins text-[#327EF9]">
                                    +1 555-0125
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="h-full p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Verified Member</h1>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="bg-[#BFD7FD] w-11 h-11 rounded-lg flex items-center 
                            justify-center">
                                <IoInformationCircleOutline className="text-[#2459B1] w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="font-poppins font-medium text-[#595959]">
                                    Connected Since:</h1>
                                <p className="font-poppins text-[#2E73E3]">23 January 2026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="bg-[#FDDAC0] w-11 h-11 rounded-lg flex items-center 
                            justify-center">
                                <IoInformationCircleOutline className="text-[#884B1D] w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="font-poppins font-medium text-[#595959]">
                                    Membership Valid Until:</h1>
                                <p className="font-poppins text-[#327EF9]">22 June 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="p-4 rounded-lg border shadow-lg bg-[#FFFFFF] mt-16 mb-16">
                <h1 className="font-medium font-poppins text-[#121212]">Gallery</h1>
                <div className="grid grid-cols-4 gap-6 mt-3">
                    <div className="relative h-[160px]" onClick={() => openModal(animations[0].type)}>
                        <Image src="/all-business-card-banners/1.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    {activeModal &&
                        <Modal
                            isOpen={activeModal === "fade"}
                            onClose={closeModal}
                            // title={`${animations[0].name} Animation`}
                            animation="fade"
                            size="md"
                        >
                            <div className="max-w-[500px] h-[300px] relative">
                                <Image src="/all-business-card-banners/2.jpg" alt="" fill
                                    className="object-cover rounded-lg cursor-pointer" />
                            </div>
                        </Modal>
                    }
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/2.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/3.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/4.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/5.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/6.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/1.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                    <div className="relative h-[160px]">
                        <Image src="/all-business-card-banners/2.jpg" alt="" fill
                            className="object-cover object-center rounded-lg cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
