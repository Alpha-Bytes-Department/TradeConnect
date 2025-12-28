// Fahim
import CreateBusinessForm from "../../components/createBusiness/CreateBusinessForm";
export default function CreateBusiness() {
    return (
        <div className="p-6 bg-[#F6F6F6]">
            <h1 className="font-poppins font-medium text-[#0B0B0B] text-2xl">Create New Business</h1>
            <p className="font-poppins text-[#626262] text-sm">Add a new business account
                to the directory</p>
            <CreateBusinessForm />
        </div>
    );
}
