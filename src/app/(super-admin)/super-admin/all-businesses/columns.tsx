// Fahim
"use client"
import { type ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils";
import { LockKeyhole, SquarePen, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type allBusinessesTable = {
    id: number;
    business_name: string,
    country: string,
    email: string,
    created_date: string,
    last_login: string,
    status: string,
};

export const columns: ColumnDef<allBusinessesTable>[] = [
    {
        accessorKey: "business_name",
        header: "Business Name",
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
                        onClick={handleEdit}
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
