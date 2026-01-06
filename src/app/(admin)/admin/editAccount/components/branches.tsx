"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, Pencil, Trash2, Plus } from "lucide-react";
import { LocationData } from "../.././interfaces";
import AddBranchModal from "./addBranchesModal";

interface BranchLocationsProps {
    data: LocationData[];
    setData: React.Dispatch<React.SetStateAction<LocationData[]>>;
}

export default function Branches({ data, setData }: BranchLocationsProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isData, setIsData] = useState<LocationData | undefined>(undefined);

    // CHANGE 1: Search by ID instead of array index for reliability
    const handleEdit = (id: string) => {
        const temp = data.find((item) => item.id === id);
        setIsData(temp);
        setIsModalOpen(true);
    };

    // CHANGE 2: Filter by ID to ensure the correct item is removed
    const handleDelete = (id: string) => {
        const updatedLocations = data.filter((item) => item.id !== id);
        setData(updatedLocations);
    };

    // CHANGE 3: Reset isData to undefined so the modal opens empty for new branches
    const handleAddBranch = () => {
        setIsData(undefined);
        setIsModalOpen(true);
    };

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
                        key={location.id} // CHANGE 4: Use location.id as key instead of index
                        className="bg-white border border-blue-400 rounded-lg p-5 hover:bg-blue-100 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-base font-semibold text-gray-900 mb-3">{location.name}</h2>
                                <div className="flex items-start gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-gray-600">
                                        <div>{location.address}</div>
                                        <div>{location.city}, {location.country}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-3">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{location.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{location.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => handleEdit(location.id)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(location.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddBranchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={data}
                editable={isData}
                setData={setData}
            />
        </div>
    );
}