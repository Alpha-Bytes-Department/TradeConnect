// Fahim
"use client"
import Image from "next/image";
import { useView } from "../../ListGridContext";
import { allBusinessData } from "../../data";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { useState } from "react";
import { redirect } from "next/navigation";

const getFlagEmoji = (countryCode: string) => {
    console.log("Country code:", countryCode); // Debug
    const flag = countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
    console.log("Generated flag:", flag); // Debug
    return flag;
};

export default function GridView() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    // 32 data items
    const allData = [...allBusinessData]; // data array

    // Calculate the data to display on current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = allData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Optional: scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const { grid } = useView();
    return (
        <div>
            {grid && (
                <div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
                        {currentData.map(item => (
                            <div key={item.id} className="h-[460px] rounded-lg border bg-[#FFFFFF] 
                            shadow-lg">
                                <div className="relative h-1/3">
                                    <Image src={item.banner_src} alt={item.banner_src} fill
                                        className="object-cover object-center rounded-t-lg" />
                                    {item.status == "Active" ? (<p className="absolute top-4 right-4 
                                inline-block px-2 py-1 bg-[#BAFFB4] text-[#1A6300] border-[#279300]  
                                rounded-full font-poppins text-sm">Active</p>)
                                        : (<p className="absolute top-4 right-4 
                                inline-block px-2 py-1 bg-[#FDBABA] text-[#B3261E] border-red-600  
                                rounded-full font-poppins text-sm">Locked</p>)}
                                </div>
                                <div className="h-2/3 p-4">
                                    <div className="flex gap-3">
                                        <div className="">
                                            <h1 className="font-poppins font-semibold text-[#434343]">
                                                {item.business_name}</h1>
                                        </div>
                                        <p>{getFlagEmoji(item.flag_src)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="text-[#909090] w-4 h-4" />
                                        <p className="font-poppins text-[#909090] text-sm">
                                            {item.country}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="font-poppins text-[#3F3F3F] text-sm">
                                            {item.description}</p>
                                    </div>
                                    <p className="font-poppins text-[#595959] text-xs mt-4">Services:</p>
                                    <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Commercial Construction</p>
                                    <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Project Management</p>
                                    <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">Course Development</p>
                                    <p className="bg-[#BFD7FD] inline-block px-2 py-1 mt-1 font-poppins 
                                text-[#153569] text-xs rounded-full">2+</p>
                                    <div className="grid grid-cols-4 gap-2 mt-3">
                                        <div className="col-span-3">
                                            <button className="w-full py-2 bg-[#BFD7FD] font-poppins 
                                        font-medium text-[#2459B1] text-center rounded-lg cursor-pointer"
                                                onClick={() => { redirect("/super-admin/business-details") }}>
                                                View Profile</button>
                                        </div>
                                        <div className="">
                                            <button className="w-full py-2 bg-[#FFFFFF] font-poppins 
                                        font-medium text-[#2459B1] text-center rounded-lg cursor-pointer 
                                        border border-[#1C4589]"
                                                onClick={() => { redirect("/super-admin/edit-business") }}>
                                                Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <Pagination className="font-poppins"
                            current={currentPage}
                            total={allData.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        />
                    </div>
                </div>
            )
            }
        </div>
    );
}
