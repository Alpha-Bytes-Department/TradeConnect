// Fahim
import SettingsPage from "@/app/(super-admin)/components/Settings/SettingsPage";
export default function Settings() {
    return (
        <div className="p-6 bg-[#F6F6F6]">
            <h1 className="font-poppins font-medium text-[#0B0B0B] text-2xl">Settings</h1>
            <p className="font-poppins text-[#626262] text-sm">Manage system settings and
                configuration</p>
            <SettingsPage />
        </div>
    );
}
