// Fahim
"use client"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { HiOutlineSearch } from "react-icons/hi";
import { SlList } from "react-icons/sl";
import { BsGrid3X3Gap } from "react-icons/bs";
import { useView } from "../../ListGridContext";
import { useFilter } from "../../FilterContext";
import axios from "axios";
import { useEffect, useState } from "react";

interface FilterFormData {
    search: string;
    country: string;
    status: string;
    sortBy: string;
}

// Country type definition
type Country = {
    id: string;
    name: string;
    flag: string;
};

// Add props interface to receive currentPage from parent
interface FilterBoxProps {
    currentPage: number;
}


// Add props parameter
export default function FilterBox({ currentPage }: FilterBoxProps) {
    const { list, grid, setList, setGrid } = useView();
    const { setBusinesses, setTotal, setLoading } = useFilter();
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        axios.get("https://squishiest-punctually-daxton.ngrok-free.dev/api/core/countries/",
            {
                headers: { "ngrok-skip-browser-warning": "true" },
            }
        )
            .then(response => {
                setCountries(response?.data?.countries || []);
            })
            .catch(error => {
                console.log("failed");
                console.log(error);
                console.error('Error fetching data:', error.status);
            });
    }, []);

    const { register, setValue, watch } = useForm<FilterFormData>({
        defaultValues: {
            search: "",
            country: "",
            status: "",
            sortBy: "a-z"
        }
    });

    // Watch individual fields instead of entire form object
    const Search = watch("search");
    const Country = watch("country");
    const Status = watch("status");
    const SortBy = watch("sortBy");


    // Fetch filtered data whenever form values or currentPage change
    useEffect(() => {
        const fetchFilteredBusinesses = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No access token found");
                return;
            }

            // Set loading to true in context
            setLoading(true);

            try {
                // Build query params from individual watched values.
                // According to backend query params name.
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    search: Search || "",
                    country: Country || "",
                    sort_by: SortBy || "",
                    status: Status || ""
                });

                // Fetch data with query params
                const response = await axios.get(
                    `https://squishiest-punctually-daxton.ngrok-free.dev/api/business/all/?${params.toString()}`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Set businesses data to context
                setBusinesses(response?.data?.results?.businesses || []);
                // Set total count to context
                setTotal(response?.data?.count || 0);

                console.log("Filtered Data:", response?.data?.results?.businesses);
            }
            catch (error) {
                console.error("Error fetching filtered businesses:", error);
                // Set empty array on error
                setBusinesses([]);
                setTotal(0);
            }
            finally {
                // Set loading to false in context
                setLoading(false);
            }
        };

        fetchFilteredBusinesses();
    }, [Search, Country, Status, SortBy, currentPage]); // Watch individual primitive values


    return (
        <div className="bg-[#FFFFFF] border rounded-md mt-6 p-4">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <div className="relative xl:col-span-2">
                    <Input
                        type="text"
                        id="search"
                        placeholder="Search Businesses or Services"
                        className="font-poppins bg-[#FFFFFF] text-[#7A7A7A] text-base pl-10"
                        {...register("search")}
                    />
                    <HiOutlineSearch className="absolute top-3 left-2.5 w-6 h-5" />
                </div>

                <div>
                    <Select onValueChange={(value) => setValue("country", value)}>
                        <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="All Countries" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>All Countries</SelectLabel>
                                {countries.map(item => (
                                    <SelectItem key={item.id} value={item.name}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select onValueChange={(value) => setValue("status", value)}>
                        <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="locked">Locked</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 mt-5">
                <div className="flex items-center gap-2">
                    <p>Sort by:</p>
                    <Select onValueChange={(value) => setValue("sortBy", value)}>
                        <SelectTrigger className="w-[200px] cursor-pointer">
                            <SelectValue placeholder="A-Z" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="a-z">A-Z</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-6">
                    <SlList className={`w-5 h-5 cursor-pointer 
                    ${list ? "bg-[#BFD7FD] p-2 w-8 h-8 rounded-lg" : ""}`}
                        onClick={() => {
                            setList(true);
                            setGrid(false)
                        }}
                    />
                    <BsGrid3X3Gap className={`w-5 h-5 cursor-pointer 
                    ${grid ? "bg-[#BFD7FD] p-2 w-8 h-8 rounded-lg" : ""}`}
                        onClick={() => {
                            setGrid(true);
                            setList(false);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}