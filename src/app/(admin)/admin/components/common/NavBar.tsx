// Fahim
"use client"
import { LogOut, Moon, Settings, SquareMenu, Sun, User } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//     DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { SidebarSeparator, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import Link from "next/link";
import Image from "next/image";
// import { useTheme } from "next-themes";

export default function Navbar() {
    // const { theme, setTheme } = useTheme();
    // const { toggleSidebar } = useSidebar();

    return (
        <div>
            <nav className="flex items-center justify-between min-h-21">
                {/*Left*/}
                <SidebarTrigger />
                {/* <Button variant="outline" onClick={toggleSidebar}>Custom Button</Button> */}

                {/*Right*/}
                <div className="flex justify-end items-center gap-3">
                    <div className="relative w-12 h-12">
                        <Image src={"/dashboard-images/AdminPhoto.jpg"} alt="admin-photo" fill className="rounded-full object-cover" />
                    </div>
                    <div>
                        <h1 className="font-poppins text-[#252525]">Admin</h1>
                        <p className="font-poppins text-[#595959]">admin@business.com</p>
                    </div>
                </div>

                {/* <div className="flex items-center gap-4"> */}
                {/* Theme Menu */}
                {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all 
                            dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 
                            transition-all dark:scale-100 dark:rotate-0" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}

                {/* User Menu */}
                {/* <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="w-[1.2rem] h-[1.2rem] mr-2" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="w-[1.2rem] h-[1.2rem] mr-2" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                                <LogOut className="w-[1.2rem] h-[1.2rem] mr-2" />
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}

                {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SquareMenu />
                                <span className="sr-only">Open Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Top</DropdownMenuItem>
                            <DropdownMenuItem>Bottom</DropdownMenuItem>
                            <DropdownMenuItem>Right</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div> */}
            </nav>
            <SidebarSeparator />
        </div>
    );
}