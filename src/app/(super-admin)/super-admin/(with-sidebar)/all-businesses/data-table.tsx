// Fahim
"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable }
    from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from 'antd';
import { useView } from "@/app/(super-admin)/ListGridContext";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    total: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}


export function DataTable<TData>({ columns, data, total, currentPage, onPageChange }: DataTableProps<TData>) {
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel()
    });
    const { grid, list } = useView();
    return (
        <div>
            {list && (
                <div>
                    {/* <p className="font-poppins text-[#515151] mt-6">Showing {" "}
                        {table.getRowModel().rows.length} of {total} businesses</p> */}
                    <div className="overflow-x-auto rounded-md border mt-8">
                        {/* ShadCN */}
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
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell,
                                                        cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center
                                        text-red-500">
                                            No Business Data Found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-8">
                        {/* Ant Design */}
                        {/* <Pagination
                            current={currentPage}
                            pageSize={8}
                            total={total}
                            align="center"
                            onChange={(page) => onPageChange(page)}
                        /> */}

                        <Pagination className="font-poppins"
                            current={currentPage}
                            total={total}
                            pageSize={8}
                            align="center"
                            onChange={(page) => onPageChange(page)}
                            showSizeChanger={false}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        />
                        {/* Pagination should never be inside <Table>, <TableBody>, or <TableRow>. */}
                    </div>
                </div>
            )}
        </div>
    )
}








// // Fahim
// "use client"
// import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable }
//     from "@tanstack/react-table"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Pagination } from 'antd';
// import { useView } from "@/app/(super-admin)/ListGridContext";

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
// }

// export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
//     const table = useReactTable({
//         data, columns, getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel()
//     });
//     const { grid, list } = useView();
//     return (
//         <div>
//             {list && (
//                 <div>
//                     <p className="font-poppins text-[#515151] mt-6">Showing {" "}
//                         {table.getRowModel().rows.length} of {data.length} businesses</p>
//                     <div className="overflow-x-auto rounded-md border mt-8">
//                         {/* ShadCN */}
//                         <Table>
//                             <TableHeader className="bg-[#BFD7FD] text-[#000000] font-poppins">
//                                 {table.getHeaderGroups().map((headerGroup) => (
//                                     <TableRow key={headerGroup.id}>
//                                         {headerGroup.headers.map((header) => {
//                                             return (
//                                                 <TableHead key={header.id}>
//                                                     {header.isPlaceholder
//                                                         ? null
//                                                         : flexRender(
//                                                             header.column.columnDef.header,
//                                                             header.getContext()
//                                                         )}
//                                                 </TableHead>
//                                             )
//                                         })}
//                                     </TableRow>
//                                 ))}
//                             </TableHeader>
//                             <TableBody className="font-poppins">
//                                 {table.getRowModel().rows?.length ? (
//                                     table.getRowModel().rows.map((row) => (
//                                         <TableRow
//                                             key={row.id}
//                                             data-state={row.getIsSelected() && "selected"}
//                                         >
//                                             {row.getVisibleCells().map((cell) => (
//                                                 <TableCell key={cell.id}>
//                                                     {flexRender(cell.column.columnDef.cell,
//                                                         cell.getContext())}
//                                                 </TableCell>
//                                             ))}
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={columns.length} className="h-24 text-center
//                                         text-red-500">
//                                             No Business Data Found.
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </div>

//                     <div className="mt-8">
//                         {/* Ant Design */}
//                         <Pagination className="font-poppins text-[#000000]"
//                             defaultCurrent={1}
//                             total={data.length}
//                             align="center"
//                             onChange={(page) => table.setPageIndex(page - 1)}
//                         />
//                         {/* Pagination should never be inside <Table>, <TableBody>, or <TableRow>. */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }