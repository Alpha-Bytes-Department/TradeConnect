// Fahim
"use client"
import Modal from "@/components/ui/modal";
import api from "@/lib/axiosInterceptor";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function BusinessDetails() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const animations = [
        {
            type: "fade" as const,
            name: "Fade",
            description: "Simple fade-in animation",
            color: "bg-purple-500 hover:bg-purple-600",
        },
    ];

    const openModal = (type: string, selectedImageUrl: string) => {
        setActiveModal(type);
        setSelectedImage(selectedImageUrl);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const { id } = useParams();
    const [data, setData] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBusinessDatas = async () => {
            try {
                const response = await api.get(`/api/business/${id}/`);
                setData(response?.data?.business);
            }
            catch (error) {
                console.error("Error fetching business data:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchBusinessDatas();
    }, [id]);

    // Loading state
    if (isLoading) {
        return (
            <div className="max-w-[1300px] mx-auto p-3 flex items-center justify-center h-screen">
                <p className="font-poppins text-lg">Loading...</p>
            </div>
        );
    }

    // No data state
    if (!data) {
        return (
            <div className="max-w-[1300px] mx-auto p-3 flex items-center justify-center h-screen">
                <p className="font-poppins text-lg text-red-500">Business not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1300px] mx-auto p-3">
            {/* Added conditional rendering for logo */}
            {data?.logo && (
                <div className="relative w-full h-[350px] px-4 flex items-center justify-center">
                    <Image src={data.logo} alt="business-logo" fill
                        className="object-cover object-center" />
                </div>
            )}

            <div className="flex flex-col items-center justify-center gap-2 mt-12">
                <div className="flex items-center gap-2">
                    <h1 className="font-poppins font-semibold text-[#141414] 
                        text-2xl">{data?.business_name}</h1>
                    {data?.country?.flag &&
                        <Image src={data?.country?.flag} alt={data?.country?.name}
                            width={24} height={24} />
                    }
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-[#909090] text-sm" />
                    <p className="font-poppins text-[#909090] text-sm">
                        {data?.full_address}{", "}{data?.country?.name}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mt-2">
                    {/* Added conditional rendering */}
                    {data?.user_email && (
                        <a href={`mailto:${data?.user_email}`}>
                            <button className="bg-[#F6F6F6] text-[#153569] hover:bg-[#327EF9] 
                            hover:text-[#EBF2FE] flex items-center gap-3 px-8 py-2 rounded-sm 
                            cursor-pointer font-poppins border border-[#153569]">
                                <Mail className="w-5 h-5 text-[#153569] hover:text-[#EBF2FE]" />
                                Email
                            </button>
                        </a>
                    )}
                    {/* Added conditional rendering */}
                    {data?.website && (
                        <a href={data?.website} target="_blank" rel="noopener noreferrer">
                            <button className="bg-[#F6F6F6] text-[#153569] hover:bg-[#327EF9] 
                            hover:text-[#EBF2FE] flex items-center gap-3 px-8 py-2 rounded-sm 
                            cursor-pointer font-poppins border border-[#153569]">
                                <Globe className="w-5 h-5 text-[#153569] hover:text-[#EBF2FE]" />
                                Website
                            </button>
                        </a>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mt-8 lg:h-[900px]">
                <div className="w-full lg:w-1/2 h-full flex flex-col gap-8">
                    {/* About */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">About</h1>
                        <p className="font-poppins text-[#3F3F3F] text-sm">{data?.about_business}</p>
                    </div>

                    {/* Services */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Services</h1>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {data?.services?.map(
                                (service: { id: string; title: string }) => (
                                    <p key={service?.id}
                                        className="bg-[#BFD7FD] inline-block px-2 py-1 mr-1 mt-1 
                                    font-poppins text-[#153569] text-sm rounded-full"
                                    >
                                        {service?.title}
                                    </p>
                                )
                            )}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Certifications</h1>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {data?.certifications?.map(
                                (certificate: { id: string; name: string }) => (
                                    <p key={certificate?.id}
                                        className="bg-[#27930029] inline-block px-2 py-1 mr-1 mt-1 
                                    font-poppins text-[#279300] text-sm rounded-full"
                                    >
                                        {certificate?.name}
                                    </p>
                                )
                            )}
                        </div>
                    </div>

                    {/* Branch Locations */}
                    <div className="lg:h-[240px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg
                    overflow-y-auto">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Branch Locations</h1>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {data?.branches?.map(
                                (branch: {
                                    id: string; city: string,
                                    country: { id: string; name: string; flag: string | null }
                                }) => (
                                    <div key={branch?.id}
                                        className="bg-[#FEF3EB] px-4 py-1 mr-1 mt-1 rounded-full 
                                        flex gap-2"
                                    >
                                        {branch?.country?.flag &&
                                            <Image src={branch?.country?.flag} alt={branch?.country?.name}
                                                width={24} height={24} />
                                        }
                                        <p className="font-poppins text-[#153569]">
                                            {branch?.city + " , " + branch?.country?.name}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>


                <div className="w-full lg:w-1/2 h-full flex flex-col gap-3">
                    {/* Contact Information */}
                    <div className="lg:h-[690px] flex flex-col gap-3 p-4 border rounded-lg 
                    bg-[#FFFFFF] shadow-lg overflow-y-auto">
                        <h1 className="font-poppins font-semibold 
                        text-[#121212] text-xl">Contact Information</h1>
                        <div className="mt-3">
                            <p className="font-poppins text-[#595959] text-sm">Office number</p>
                            <p className="font-poppins text-[#327EF9] text-sm">{data?.phone_number}</p>
                        </div>
                        <div>
                            <p className="font-poppins text-[#595959] text-sm">Office Email</p>
                            <p className="font-poppins text-[#327EF9] text-sm">{data?.user_email}</p>
                        </div>
                        <div className="w-full h-[1px] bg-gray-300 mt-3" />

                        <p className="font-poppins text-[#595959] text-sm">Contact Persons</p>
                        {data?.contacts?.map(
                            (contact: {
                                id: string; full_name: string; role: string; email: string;
                                phone_number: string; is_primary: boolean
                            }) => (
                                <div key={contact.id} className="p-2 border rounded-lg"
                                    style={{
                                        backgroundColor: contact.is_primary === true ? '#EBF2FE' : '#FFFFFF'
                                    }}>
                                    <p className="font-medium font-poppins">{contact?.full_name}</p>
                                    <p className="font-poppins text-[#909090]">{contact?.role}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Mail className="w-5 h-5 text-[#327EF9]" />
                                        <p className="font-poppins text-[#327EF9]">
                                            {contact?.email}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Phone className="w-5 h-5 text-[#327EF9]" />
                                        <p className="font-poppins text-[#327EF9]">
                                            {contact?.phone_number}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Activity */}
                    <div className="lg:h-[200px] p-4 border rounded-lg bg-[#FFFFFF] shadow-lg">
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
                                <p className="font-poppins text-[#2E73E3]">
                                    {data?.created_at ?
                                        (() => {
                                            const d = new Date(data.created_at);
                                            if (isNaN(d.getTime())) return "Invalid Date";
                                            const dd = String(d.getDate()).padStart(2, '0');
                                            const mm = String(d.getMonth() + 1).padStart(2, '0');
                                            const yyyy = d.getFullYear();
                                            return `${dd}/${mm}/${yyyy}`;
                                        })()
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="bg-[#FDDAC0] w-11 h-11 rounded-lg flex items-center 
                            justify-center">
                                <IoInformationCircleOutline className="text-[#884B1D] w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="font-poppins font-medium text-[#595959]">
                                    Membership Valid Till:</h1>
                                <p className="font-poppins text-[#327EF9]">
                                    {data?.membership_valid_till}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Gallery */}
            <div className="p-4 rounded-lg border shadow-lg bg-[#FFFFFF] mt-16 mb-16">
                <h1 className="font-medium font-poppins text-[#121212]">Gallery</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-3">
                    {data?.gallery?.map((item: { id: string; image: string }) =>
                        <div key={item?.id} className="relative h-[160px]"
                            onClick={() => openModal(animations[0]?.type, item?.image)}
                        >
                            <Image src={item?.image} alt="" fill
                                className="object-cover object-center rounded-lg cursor-pointer" />
                        </div>
                    )}

                    {/* Added null check for selectedImage */}
                    {activeModal && selectedImage &&
                        <Modal
                            isOpen={activeModal === "fade"}
                            onClose={closeModal}
                            animation="fade"
                            size="md"
                        >
                            <div className="max-w-[500px] h-[300px] relative">
                                <Image src={selectedImage} alt="Gallery image" fill
                                    className="object-cover rounded-lg cursor-pointer" />
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        </div>
    );
}