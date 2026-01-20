"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Pencil, Trash2, Plus } from "lucide-react";
import AddBranchModal from "./addBranchesModal";
import api from "@/app/api";

interface Country {
    id: string;
    name: string;
    flag: string;
}

interface Branch {
    id: string;
    full_name: string;
    address: string;
    city: string;
    country: Country | null;
    phone_number: string;
}

interface BranchLocationsProps {
    data: Branch[];
    setData: React.Dispatch<React.SetStateAction<Branch[]>>;
}

export default function Branches({ data, setData }: BranchLocationsProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isData, setIsData] = useState<Branch | undefined>(undefined);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [onSubmit, setOnSubmit]= useState<boolean>(false)

    const handleEdit = (id: string) => {
        const branch = data.find((item) => item.id === id);
        setIsData(branch);
        setIsModalOpen(true);
    };

    const fetchBusinessData = async () => {
        try {
            const response: any = await api.get('/business/my/');
            const businessData = response.business || response;

            if (businessData?.branches) {
                setData(businessData.branches);
            }
        } catch (err) {
            console.error('Error fetching business data:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this branch?')) {
            return;
        }

        setIsDeleting(id);

        try {
            await api.delete(`/business/branch-locations/${id}/`);

            // Reload business data to get updated branches list
            await fetchBusinessData();
        } catch (err) {
            console.error('Error deleting branch:', err);
            alert('Failed to delete branch. Please try again.');
        } finally {
            setIsDeleting(null);
        }
    };

    const handleAddBranch = () => {
        setIsData(undefined);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsData(undefined);
    };

    useEffect(()=>{
        fetchBusinessData()
        setOnSubmit(false)
    },[onSubmit])

    return (
        <div className="w-full mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Branch Locations</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage your business branch data</p>
                </div>
                <button
                    onClick={handleAddBranch}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Branch
                </button>
            </div>

            <div className="space-y-4">
                {data.map((location) => (
                    <div
                        key={location.id}
                        className="bg-white border border-blue-400 rounded-lg p-5 hover:bg-blue-100 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-base font-semibold text-gray-900 mb-3">{location.city + ' '}Office</h2>
                                <div className="flex items-start gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-gray-600">
                                        <div>
                                            {location.city}
                                            {location.country?.name ? ', ' + location.country.name : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => handleEdit(location.id)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Edit branch"
                                    disabled={isDeleting === location.id}
                                >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(location.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Delete branch"
                                    disabled={isDeleting === location.id}
                                >
                                    {isDeleting === location.id ? (
                                        <svg
                                            className="animate-spin h-4 w-4 text-red-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddBranchModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={data}
                isData={isData}
                setData={setData}
                setOnSubmit={setOnSubmit}
            />
        </div>
    );
}