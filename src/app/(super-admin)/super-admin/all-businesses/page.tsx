// Fahim
import FilterBox from "../../components/newBusiness/FilterBox";
import { allBusinessesTable, columns } from "./columns";
import { DataTable } from "./data-table";
import { allBusinessesData } from "../../data";

export default async function AllBusiness() {
    const data = await getData();
    return (
        <div className="p-6 bg-[#F6F6F6]">
            <h1 className="font-medium font-poppins text-[#0B0B0B] text-3xl">All Businesses</h1>
            <p className="font-poppins text-[#626262]">Manage and monitor all registered
                businesses</p>
            <FilterBox />
            <DataTable columns={columns} data={data} />
        </div>
    );
}

const getData = async (): Promise<allBusinessesTable[]> => {
    return allBusinessesData;
}
