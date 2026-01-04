"use client";

import React from "react";
import { MapPin, Mail, Phone, Pencil, Trash2, Plus } from "lucide-react";
import { LocationData } from "../../accounts/page";


interface BranchLocationsProps {
    data: LocationData[];
    setData: React.Dispatch<React.SetStateAction<LocationData[]>>;
}

export default function Branches({
    data,
    setData,
}: BranchLocationsProps) {
    const handleEdit = (index: number) => {
        // Handle edit logic
        console.log("Edit branch at index:", index);
    };

    const handleDelete = (index: number) => {
        const updatedLocations = data.filter((_, i) => i !== index);
        setData(updatedLocations);
    };

    const handleAddBranch = () => {
        // Handle add branch logic
        console.log("Add new branch");
    };

    return (
        <div className="w-full mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Branch Locations
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Manage your business branch data
                    </p>
                </div>
                <button
                    onClick={handleAddBranch}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Branch
                </button>
            </div>

            {/* Branch Cards */}
            <div className="space-y-4">
                {data.map((location, index) => (
                    <div
                        key={index}
                        className="bg-white border border-blue-400 rounded-lg p-5 hover:bg-blue-100 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                {/* Branch Name */}
                                <h2 className="text-base font-semibold text-gray-900 mb-3">
                                    {location.name}
                                </h2>

                                {/* Address */}
                                <div className="flex items-start gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-gray-600">
                                        <div>{location.address}</div>
                                        <div>
                                            {location.city}, {location.country}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="flex items-center gap-6 mt-3">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {location.email}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {location.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Edit branch"
                                >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    aria-label="Delete branch"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}