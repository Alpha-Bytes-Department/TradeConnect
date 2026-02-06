// Fahim
"use client"
import { type ColumnDef } from "@tanstack/react-table"
import { LockKeyhole, LockOpen, SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInterceptor";
import Image from "next/image";

// This type is used to define the shape of our data.
// We can use a Zod schema here if we want.

export type allBusinessesTable = {
    id: string;
    business_name: string,
    country: {
        name?: string;
        flag?: string;
    } | null,
    user_email: string,
    created_at: string,
    last_login: string,
    is_locked: boolean,
    logo: string,
    is_featured: boolean
};

export const columns: ColumnDef<allBusinessesTable>[] = [
    {
        accessorKey: "business_name",
        header: "Business Name",
        cell: ({ row }) => {
            const businessId = row.original?.id;
            const businessName = row.getValue("business_name") as string;
            const businessLogo = row.original?.logo;
            const isFeatured = row.original?.is_featured;
            const router = useRouter();

            const handleNavigate = () => {
                router.push(`/super-admin/business-details/${businessId}`);
            };
            return (
                <div className="flex items-center gap-3 cursor-pointer"
                    onClick={handleNavigate}>
                    <div className="relative w-10 h-10 flex-shrink-0">
                        {businessLogo ? (
                            <Image
                                src={businessLogo}
                                alt={businessName}
                                fill
                                className="rounded-full object-cover object-center"
                            />) : (<div className="w-full h-full bg-gray-200 rounded-full" />)}
                    </div>
                    <p>{businessName}</p>
                    {isFeatured && <p className="bg-orange-300 text-black px-1">Featured</p>}
                </div>
            );
        },
    },

    {
        id: "country",
        header: "Country",
        accessorFn: (row) => row.country?.name || "N/A", // according to backend.
        cell: ({ row }) => row.getValue("country"),
    },

    {
        accessorKey: "user_email",
        header: "Email",
    },

    {
        accessorKey: "created_at",
        header: "Created Date",
        cell: ({ row }) => {
            const dateStr = row.getValue("created_at") as string;
            if (!dateStr) return "N/A";

            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return "Invalid Date";

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // month starts from 0
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        },
    },

    {
        id: "activePeriod",
        header: "Active Period",
        accessorFn: (row) => row.created_at, // original date is kept for sorting
        cell: ({ row }) => {
            const createdStr = row.original.created_at as string;
            if (!createdStr) return "N/A";

            const createdDate = new Date(createdStr);
            if (isNaN(createdDate.getTime())) return "Invalid";

            const now = new Date(); // current date & time

            let months =
                (now.getFullYear() - createdDate.getFullYear()) * 12 +
                (now.getMonth() - createdDate.getMonth());

            // if date of current month is not passed, then reduce 1 month
            if (now.getDate() < createdDate.getDate()) {
                months--;
            }
            months = Math.max(0, months); // if negative, then 0
            return months === 0 ? "Less than 1 month" : `${months} month ${months > 1 ? 's' : ''}`;
        },
    },

    {
        accessorKey: "is_locked",
        header: "Status",
        // Added custom cell rendering for status with color coding
        cell: ({ row }) => {
            const status = row.getValue("is_locked") as boolean;
            return (
                <p className={`px-3 py-1 rounded-full inline-block text-sm 
                ${status ? "bg-[#FDBABA] text-[#B3261E]" : "bg-[#D7EFD5] text-[#279300]"}`}>
                    {status ? "Locked" : "Active"}
                </p>
            );
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const business = row.original;

            const router = useRouter();
            const handleEdit = () => {
                router.push(`/super-admin/edit-business/${business.id}/`);
            };

            const handleDelete = async () => {
                try {
                    const response = await api.delete(`/api/business/${business.id}/delete/?delete_user=true`);
                    window.location.reload(); // Simple reload
                    toast.success("Deleted", {
                        description: "Business Deleted.",
                    });
                    console.log("Business Deleted", response.data);
                    // We may want to refresh the table data here or use a state management solution
                    // to update the UI immediately
                }
                catch (error) {
                    console.error("Error deleting", error);
                    toast.error("Delete failed", {
                        description: "Could not delete the business. Please try again."
                    });
                }
            };

            const handleLock = async () => {
                try {
                    const response = await api.patch(`/api/business/${business.id}/update/`,
                        {
                            is_locked: !business.is_locked
                        },
                    );
                    console.log("Lock status updated:", response.data);
                    // We may want to refresh the table data here or use a state management solution
                    // to update the UI immediately
                    window.location.reload(); // Simple reload
                    toast.success(business.is_locked ? "Account Unlocked" : "Account Locked");
                }
                catch (error) {
                    console.error("Error updating lock status:", error);
                    toast.error("Failed to update status");
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleEdit}
                        // onClick={() => { redirect(`/super-admin/edit-business/${business.id}`) }}
                        className="h-8 w-8 flex items-center justify-center rounded-sm 
                        hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <SquarePen className="h-4 w-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="h-8 w-8 flex items-center justify-center rounded-sm  
                        text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={handleLock}
                        className="h-8 w-8 flex items-center justify-center rounded-sm 
                        hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        {business.is_locked ? (<LockOpen className="h-4 w-4" />) :
                            (
                                <LockKeyhole className="h-4 w-4" />
                            )}
                    </button>
                </div>
            );
        },
    },
];


// Your actions column doesn’t show a field from the data—it shows custom UI.
// So instead of accessorKey, you give it an id.

// Summary:
// id: "actions" → name of the column
// Needed because the column has no accessor
// Used internally by the table (sorting, rendering, visibility)









// // Fahim
// "use client"
// import { type ColumnDef } from "@tanstack/react-table"
// import { cn } from "@/lib/utils";
// import { LockKeyhole, SquarePen, Trash2 } from "lucide-react";
// import { redirect } from "next/navigation";

// // This type is used to define the shape of our data.
// // We can use a Zod schema here if we want.

// export type allBusinessesTable = {
//     id: number;
//     business_name: string,
//     country: string,
//     email: string,
//     created_date: string,
//     last_login: string,
//     status: string,
//     banner_src: string
// };

// export const columns: ColumnDef<allBusinessesTable>[] = [
//     // {
//     //     accessorKey: "business_name",
//     //     header: "Business Name",
//     // },
//     {
//         accessorKey: "business_name",
//         header: "Business Name",
//         cell: ({ row }) => {
//             const businessName = row.getValue("business_name") as string;
//             const businessPhoto = row.original.banner_src;
//             return (
//                 <div className="flex items-center gap-3">
//                     <img
//                         src={businessPhoto || "/placeholder-business.png"}
//                         alt={businessName}
//                         className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <p>{businessName}</p>
//                 </div>
//             );
//         },
//     },
//     {
//         accessorKey: "country",
//         header: "Country",
//     },
//     {
//         accessorKey: "email",
//         header: "Email",
//     },
//     {
//         accessorKey: "created_date",
//         header: "Created Date",
//     },
//     {
//         accessorKey: "last_login",
//         header: "Last Login",
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         // Added custom cell rendering for status with color coding
//         cell: ({ row }) => {
//             const status = row.getValue("status") as string;
//             const isActive = status.toLowerCase() === "active";

//             return (
//                 <p className={`px-3 py-1 rounded-full inline-block text-sm
//                 ${isActive ? "bg-[#D7EFD5] text-[#279300]" : "bg-[#FDBABA] text-[#B3261E]"}`}>
//                     {status}
//                 </p>
//             );
//         },
//     },
//     {
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => {
//             const business = row.original;

//             const handleEdit = () => {
//                 console.log("Edit business:", business.id);
//             };

//             const handleDelete = () => {
//                 console.log("Delete business:", business.id);
//             };

//             const handleLock = () => {
//                 console.log("Lock business:", business.id);
//             };

//             return (
//                 <div className="flex items-center gap-2">
//                     <button
//                         // onClick={handleEdit}
//                         onClick={() => { redirect("/super-admin/edit-business") }}
//                         className="h-8 w-8 flex items-center justify-center rounded-sm
//                         hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
//                     >
//                         <SquarePen className="h-4 w-4" />
//                     </button>
//                     <button
//                         onClick={handleDelete}
//                         className="h-8 w-8 flex items-center justify-center rounded-sm
//                         text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
//                     >
//                         <Trash2 className="h-4 w-4" />
//                     </button>
//                     <button
//                         onClick={handleLock}
//                         className="h-8 w-8 flex items-center justify-center rounded-sm
//                         hover:bg-gray-400 hover:text-white transition-colors cursor-pointer"
//                     >
//                         <LockKeyhole className="h-4 w-4" />
//                     </button>
//                 </div>
//             );
//         },
//     },
// ];


// // Your actions column doesn’t show a field from the data—it shows custom UI.
// // So instead of accessorKey, you give it an id.

// // Summary:
// // id: "actions" → name of the column
// // Needed because the column has no accessor
// // Used internally by the table (sorting, rendering, visibility)


