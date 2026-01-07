// Fahim
"use client"
import { type ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils";
import { LockKeyhole, SquarePen, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

// This type is used to define the shape of our data.
// We can use a Zod schema here if we want.

export type allBusinessesTable = {
    id: number;
    business_name: string,
    country: string,
    email: string,
    created_date: string,
    last_login: string,
    status: string,
    banner_src: string
};

export const columns: ColumnDef<allBusinessesTable>[] = [
    // {
    //     accessorKey: "business_name",
    //     header: "Business Name",
    // },
    {
        accessorKey: "business_name",
        header: "Business Name",
        cell: ({ row }) => {
            const businessName = row.getValue("business_name") as string;
            const businessPhoto = row.original.banner_src;
            return (
                <div className="flex items-center gap-3">
                    <img
                        src={businessPhoto || "/placeholder-business.png"}
                        alt={businessName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{businessName}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "created_date",
        header: "Created Date",
    },
    {
        accessorKey: "last_login",
        header: "Last Login",
    },
    {
        accessorKey: "status",
        header: "Status",
        // Added custom cell rendering for status with color coding
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const isActive = status.toLowerCase() === "active";

            return (
                <p className={`px-3 py-1 rounded-full inline-block text-sm 
                ${isActive ? "bg-[#D7EFD5] text-[#279300]" : "bg-[#FDBABA] text-[#B3261E]"}`}>
                    {status}
                </p>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const business = row.original;

            const handleEdit = () => {
                console.log("Edit business:", business.id);
            };

            const handleDelete = () => {
                console.log("Delete business:", business.id);
            };

            const handleLock = () => {
                console.log("Lock business:", business.id);
            };

            return (
                <div className="flex items-center gap-2">
                    <button
                        // onClick={handleEdit}
                        onClick={() => { redirect("/super-admin/edit-business") }}
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
                        <LockKeyhole className="h-4 w-4" />
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
