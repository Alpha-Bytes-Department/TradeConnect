'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleEditAccount = () => {
        router.push('/admin/withoutSidebar/editAccount');
        setIsOpen(false);
    };

    const handleLogOut = () => {
        localStorage.removeItem('access_token')
        setIsOpen(false);
        router.push('/');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
            
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 px-2 z-50">
                    <button
                        onClick={handleEditAccount}
                        className="fc w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-300"
                    >
                        Edit Account
                    </button>

                    <button
                        onClick={handleLogOut}
                        className="fc w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}