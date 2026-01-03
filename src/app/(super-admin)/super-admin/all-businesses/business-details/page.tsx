// Fahim
import { Globe, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { IoInformationCircleOutline } from "react-icons/io5";
export default function BusinessDetails() {
    return (
        <div className="">
            <div className="relative w-full h-[350px] px-8 flex items-center
            justify-center">
                <Image src="/all-business-card-banners/3.jpg" alt="" fill
                    className="object-cover object-center" />
            </div>
            <div className="max-w-[300px] h-[150px] mx-auto -mt-16 relative">
                <Image src="/all-business-card-banners/2.jpg" alt="" fill
                    className="rounded-lg object-cover object-center
                    hover:scale-110 transition-transform duration-300 ease-in-out" />
            </div>

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

            <div className="flex flex-col lg:flex-row gap-6 mt-8">
                <div className="flex flex-col gap-3 w-full lg:w-1/2">
                    <div className="p-2 border  rounded-lg bg-[#FFFFFF] 
                    shadow-lg">
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
                    <div className="p-2 border  rounded-lg bg-[#FFFFFF] 
                    shadow-lg">
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
                    <div className="p-2 border  rounded-lg bg-[#FFFFFF] 
                    shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Activity</h1>
                        <div className="flex gap-3 mt-3">
                            <div className="bg-[#BFD7FD] w-11 h-11 rounded-lg flex items-center justify-center">
                                <IoInformationCircleOutline className="text-[#2459B1] w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="font-poppins font-medium text-[#595959]">Active for</h1>
                                <p className="font-poppins text-[#2E73E3] text-xs">23 Months</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="bg-[#FDDAC0] w-11 h-11 rounded-lg flex items-center justify-center">
                                <IoInformationCircleOutline className="text-[#884B1D] w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="font-poppins font-medium text-[#595959]">Last Updates</h1>
                                <p className="font-poppins text-[#327EF9] text-xs">2024-12-04   11:30</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 border shadow-lg rounded-lg">
                    <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Activity</h1>
                </div>
            </div>
        </div>
    );
}