// Fahim
"use client"
import Image from "next/image";
import { useView } from "../../ListGridContext";
// import { allBusinessData } from "../../data";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

// const getFlagEmoji = (countryCode: string) => {
//     console.log("Country code:", countryCode); // Debug
//     const flag = countryCode
//         .toUpperCase()
//         .split('')
//         .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
//         .join('');
//     console.log("Generated flag:", flag); // Debug
//     return flag;
// };

export default function GridView() {
    const [currentPage, setCurrentPage] = useState(1);
    const [datas, setDatas] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    // 32 data items
    // const allData = [...allBusinessData]; // data array

    useEffect(() => {
        const fetchBusinessDatas = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            const response = await axios.get(
                `https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/business/all/?country=&search=&service=&page=${currentPage}&sort_by=`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDatas(response?.data?.results?.businesses);
            setTotal(response?.data?.count);
            // console.log("all business data:",response.data);
            // console.log("datas:",datas);
        };
        fetchBusinessDatas();
    }, [currentPage]);

    // Calculate the data to display on current page
    // const startIndex = (page - 1) * pageSize;
    // const endIndex = startIndex + pageSize;
    // const currentData = datas.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Optional: scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const { grid } = useView();
    const router = useRouter();

    return (
        <div>
            {grid && (
                <div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
                        {datas.map(item => (
                            <div key={item.id} className="h-[460px] rounded-lg border bg-[#FFFFFF] 
                            shadow-lg">
                                <div className="relative h-1/3">
                                    {item.logo ? (
                                        <Image
                                            src={item.logo}
                                            alt="Business logo"
                                            fill
                                            className="object-cover object-center rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 rounded-t-lg" />
                                    )}
                                    {item.is_locked === false ? (<p className="absolute top-4 right-4 
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
                                        {/* <p>{getFlagEmoji(item.flag_src)}</p> */}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="text-[#909090] w-4 h-4" />
                                        <p className="font-poppins text-[#909090] text-sm">
                                            {item.country_name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="font-poppins text-[#3F3F3F] text-sm">
                                            {item.about_business}</p>
                                    </div>

                                    <p className="font-poppins text-[#595959] text-xs mt-4">Services:</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {item.services.slice(0, 2).map(
                                            (service: { id: string; title: string }) => (
                                                <p
                                                    key={service.id}
                                                    className="bg-[#BFD7FD] inline-block px-2 py-1 
                                                    font-poppins text-[#153569] text-sm rounded-full"
                                                >
                                                    {service.title}
                                                </p>
                                            )
                                        )}

                                        {item.services.length > 2 && (
                                            <p className="bg-[#BFD7FD] inline-block px-2 py-1 font-poppins
                                            text-[#153569] text-sm rounded-full">
                                                +{item.services.length - 2}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-4 gap-2 mt-3">
                                        <div className="col-span-3">
                                            <button className="w-full py-2 bg-[#BFD7FD] font-poppins 
                                        font-medium text-[#2459B1] text-center rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    router.push(`/super-admin/business-details/${item.id}`)}>
                                                View Profile</button>
                                        </div>
                                        <div className="">
                                            <button className="w-full py-2 bg-[#FFFFFF] font-poppins 
                                        font-medium text-[#2459B1] text-center rounded-lg cursor-pointer 
                                        border border-[#1C4589]"
                                                onClick={() =>
                                                    router.push(`/super-admin/edit-business/${item.id}`)}>
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
                            total={total}
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
