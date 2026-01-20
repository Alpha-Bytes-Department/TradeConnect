// Fahim
import Modal from "@/components/ui/modal";
import { useView } from "../../ListGridContext";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function LogOutModal() {
    const { isLogoutOpen, setIsLogoutOpen } = useView();

    const handleLogout = () => {
        console.log("Logged out successfully!");
        localStorage.removeItem('accessToken');
        setIsLogoutOpen(false);
        redirect("/");
    };

    return (
        <Modal
            isOpen={isLogoutOpen}
            onClose={() => setIsLogoutOpen(false)}
            title="Confirm Logout"
            size="sm"
        >
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-10 w-10 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Logout Confirmation
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Are you sure you want to logout? You will need to sign in
                            again to access your account.
                        </p>
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 border 
                                border-orange-200 dark:border-orange-800 rounded-md p-3">
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                        Any unsaved changes will be lost. Make sure to save your work
                        before logging out.
                    </p>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button onClick={() => setIsLogoutOpen(false)} variant="secondary"
                        className="cursor-pointer">
                        Stay Logged In
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="default"
                        className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </Modal>
    );
}