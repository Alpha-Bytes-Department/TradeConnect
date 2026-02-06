// Fahim
"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <div className="overflow-x-auto rounded-md border mt-8">
            <Table>
                <TableHeader className="bg-[#BFD7FD] text-[#000000] font-poppins">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody className="font-poppins">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const isFeatured = (row.original as any)?.is_featured === true;
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={isFeatured ? "bg-[#FFF5E9] hover:bg-[#FFF5E9]" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No Results Found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}