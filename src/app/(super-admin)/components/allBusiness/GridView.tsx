// Fahim
"use client"
import Image from "next/image";
import { useView } from "../../ListGridContext";
import { allBusinessData } from "../../data";
import { MapPin } from "lucide-react";

export default function GridView() {
    const { grid } = useView();
    return (
        <div>
            {grid && (
                <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-8">
                    {allBusinessData.map(item => (
                        <div key={item.id} className="h-[450px] rounded-lg border bg-[#FFFFFF] shadow-lg">
                            <div className="relative h-1/3">
                                <Image src={item.banner_src} alt={item.banner_src} fill
                                    className="object-cover object-center rounded-t-lg" />
                            </div>
                            <div className="h-2/3 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-[100px] h-[63px]">
                                        <Image src={item.flag_src} alt={item.flag_src} fill
                                            className="object-cover object-center rounded-lg" />
                                    </div>
                                    <div className="">
                                        <h1 className="font-poppins font-semibold text-[#434343]">
                                            {item.business_name}</h1>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="text-[#909090] w-4 h-4" />
                                            <p className="font-poppins text-[#909090] text-sm">
                                                {item.country}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="font-poppins text-[#3F3F3F] text-sm">
                                        {item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    );
}
