// Fahim
"use client"
import Image from "next/image";
import { useView } from "../../ListGridContext";
import { MapPin } from "lucide-react";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useFilter } from "../../FilterContext";

interface GridViewProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    total: number;
}

export default function GridView({ total, currentPage, onPageChange }: GridViewProps) {
    const pageSize = 8;

    const handlePageChange = (page: number) => {
        // Use prop function instead of local setState
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { grid } = useView();
    const router = useRouter();

    // Get businesses from context
    const { businesses } = useFilter();

    return (
        <div>
            {grid && (
                <div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
                    gap-8 mt-8">
                        {businesses.map(item => (
                            <div key={item?.id} className="h-[460px] rounded-lg border bg-[#FFFFFF] 
                            shadow-lg relative">
                                <div className="relative h-1/3">
                                    {item?.logo ? (
                                        <Image
                                            src={item?.logo}
                                            alt="Business logo"
                                            fill
                                            className="object-cover object-center rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 rounded-t-lg" />
                                    )}
                                    {item?.is_locked === false ? (<p className="absolute top-4 right-4 
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
                                                {item?.business_name}</h1>
                                        </div>
                                        {item?.country?.flag &&
                                            <Image src={item?.country?.flag} alt={item?.country?.name}
                                                width={24} height={24} />
                                        }
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="text-[#909090] w-4 h-4" />
                                        <p className="font-poppins text-[#909090] text-sm">
                                            {item?.full_address}{", "}{item?.country?.name}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-poppins text-[#3F3F3F] text-sm">
                                            {item?.about_business?.length > 70
                                                ? `${item?.about_business.substring(0, 70)}......`
                                                : item?.about_business}
                                        </p>
                                    </div>

                                    <p className="font-poppins text-[#595959] text-sm mt-2">Services:</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {item?.services?.slice(0, 2).map(
                                            (service: { id: string; title: string }) => (
                                                <p
                                                    key={service?.id}
                                                    className="bg-[#BFD7FD] inline-block px-2 py-1 
                                                    font-poppins text-[#153569] text-sm rounded-full"
                                                >
                                                    {service?.title}
                                                </p>
                                            )
                                        )}

                                        {item?.services?.length > 2 && (
                                            <p className="bg-[#BFD7FD] inline-block px-2 py-1 font-poppins
                                            text-[#153569] text-sm rounded-full">
                                                +{item?.services?.length - 2}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 absolute bottom-4 left-4 right-4">
                                        <button
                                            className="flex-3 py-2 bg-[#BFD7FD] font-poppins 
                                            font-medium text-[#2459B1] text-center rounded-lg cursor-pointer"
                                            onClick={() => router.push(`/super-admin/business-details/${item?.id}`)}
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            className="flex-1 py-2 bg-[#FFFFFF] font-poppins font-medium 
                                            text-[#2459B1] text-center rounded-lg cursor-pointer border 
                                            border-[#1C4589]"
                                            onClick={() => router.push(`/super-admin/edit-business/${item?.id}`)}
                                        >
                                            Edit
                                        </button>
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
