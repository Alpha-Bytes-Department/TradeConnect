// Fahim
"use client"
import { type ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type dashboardLatestBusiness = {
    id: number;
    business_name: string,
    country: string,
    last_login: string,
    status: string,
};

export const columns: ColumnDef<dashboardLatestBusiness>[] = [
    {
        accessorKey: "business_name",
        header: "Business Name",
    },
    {
        accessorKey: "country",
        header: "Country",
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
        header: "Actions",

    }
]


// Your actions column doesn’t show a field from the data—it shows custom UI.
// So instead of accessorKey, you give it an id.

// Summary:
// id: "actions" → name of the column
// Needed because the column has no accessor
// Used internally by the table (sorting, rendering, visibility)
