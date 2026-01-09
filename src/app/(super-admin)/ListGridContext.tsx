// // Fahim
// "use client";
// import { createContext, useContext, useState, ReactNode } from "react";

// type AuthType = {
//     accessToken?: string;
//     user?: any;
//     is_superuser?: boolean;
//     // Add other auth properties as needed
// };

// type ViewContextType = {
//     grid: boolean;
//     list: boolean;
//     isLogoutOpen: boolean;
//     setGrid: (value: boolean) => void;
//     setList: (value: boolean) => void;
//     setIsLogoutOpen: (value: boolean) => void;
//     auth:AuthType;
//     setAuth: (value: AuthType) => void;
// };

// const ViewContext = createContext<ViewContextType | null>(null);

// export function ViewProvider({ children }: { children: ReactNode }) {
//     const [list, setList] = useState(true);
//     const [grid, setGrid] = useState(false);
//     const [isLogoutOpen, setIsLogoutOpen] = useState(false);
//     const [auth,setAuth]=useState({});

//     return (
//         <ViewContext.Provider value={{ list, grid, setList, setGrid, isLogoutOpen, setIsLogoutOpen,auth,setAuth
//          }}>
//             {children}
//         </ViewContext.Provider>
//     );
// };

// export const useView = () => {
//     const context = useContext(ViewContext);
//     if (!context) {
//         throw new Error("useView must be used inside ViewProvider");
//     }
//     return context;
// };




// Fahim
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthType = {
    accessToken?: string;
    user?: any;
    is_superuser?: boolean;
};

type ViewContextType = {
    grid: boolean;
    list: boolean;
    isLogoutOpen: boolean;
    setGrid: (value: boolean) => void;
    setList: (value: boolean) => void;
    setIsLogoutOpen: (value: boolean) => void;
    auth: AuthType;
    setAuth: (value: AuthType) => void;
};

const ViewContext = createContext<ViewContextType | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
    const [list, setList] = useState(true);
    const [grid, setGrid] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    // Initialize auth from localStorage
    const [auth, setAuth] = useState<AuthType>(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            return token ? { accessToken: token } : {};
        }
        return {};
    });

    // Sync auth changes to localStorage
    useEffect(() => {
        if (auth.accessToken) {
            localStorage.setItem('accessToken', auth.accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
    }, [auth]);

    return (
        <ViewContext.Provider value={{
            list, grid, setList, setGrid,
            isLogoutOpen, setIsLogoutOpen,
            auth, setAuth
        }}>
            {children}
        </ViewContext.Provider>
    );
}

export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useView must be used inside ViewProvider");
    }
    return context;
};