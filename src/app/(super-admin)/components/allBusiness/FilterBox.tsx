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
import axios from "axios";

interface FilterFormData {
    search: string;
    country: string;
    status: string;
    sortBy: string;
}


// const fetchCountries = async () => {
//   try {
//     const response = await axios.get(
//       'https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/core/countries/',
//       {
//         headers: {
//           'ngrok-skip-browser-warning': 'true'
//         }
//       }
//     );

//     console.log("success");
//     console.log(response.data.countries);
//     return response.data.countries;

//   } catch (error:any) {
//     console.log("failed");
//     console.error('Error fetching data:', error);
//     // You can also check for specific error types
//     if (error.response) {
//       // Server responded with error status
//       console.error('Response error:', error.response.data);
//     } else if (error.request) {
//       // Request made but no response
//       console.error('No response received:', error.request);
//     } else {
//       // Something else happened
//       console.error('Error:', error.message);
//     }
//   }
// };

// // Call the function
// fetchCountries();

export default function FilterBox() {
    const { list, grid, setList, setGrid } = useView();

    const countryList = axios.get('https://rihanna-preacquisitive-eleanore.ngrok-free.dev/api/core/countries/')
        .then(response => {
            console.log("success");
            // Handle the successful response
            console.log(response); // The actual data payload from the server
        })
        .catch(error => {
            console.log("failed");
            // Handle the error
            console.error('Error fetching data:', error); // Axios rejects promises for HTTP errors
        });

    const { register, setValue, watch, handleSubmit } = useForm<FilterFormData>({
        defaultValues: {
            search: "",
            country: "",
            status: "",
            sortBy: "a-z"
        }
    });

    const onSubmit = (data: FilterFormData) => {
        console.log("Form data:", data);
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#FFFFFF] border rounded-md mt-6 p-4">
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
                                <SelectLabel>Countries</SelectLabel>
                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                <SelectItem value="Germany">Germany</SelectItem>
                                <SelectItem value="France">France</SelectItem>
                                <SelectItem value="Taiwan">Taiwan</SelectItem>
                                <SelectItem value="China">China</SelectItem>
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
                    <Select
                        defaultValue="a-z"
                        onValueChange={(value) => setValue("sortBy", value)}
                    >
                        <SelectTrigger className="w-[200px] cursor-pointer">
                            <SelectValue placeholder="A-Z" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="a-z">A-Z</SelectItem>
                                <SelectItem value="z-a">Z-A</SelectItem>
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
        </form>
    );
}
