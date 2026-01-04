'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LocationData } from '../../accounts/page';

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  location?: LocationData;
  setLocations: React.Dispatch<React.SetStateAction<LocationData[]>>;
}

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Switzerland',
  'Austria',
  'Belgium',
  'Portugal',
  'Greece',
  'Poland',
  'Czech Republic',
  'Ireland',
  'New Zealand',
  'Singapore',
  'South Korea',
  'Thailand',
  'Vietnam',
  'Philippines',
  'Malaysia',
  'Indonesia',
  'Turkey',
  'South Africa',
  'Egypt',
  'Nigeria',
  'Kenya',
  'Argentina',
  'Chile',
  'Colombia',
  'Peru',
  'Venezuela',
  'Ukraine',
  'Romania',
  'Hungary',
  'Slovakia',
  'Bulgaria',
  'Croatia',
  'Serbia',
  'Slovenia',
];

export default function AddBranchModal({
  isOpen,
  onClose,
  location,
  setLocations,
}: AddBranchModalProps) {
  const [formData, setFormData] = useState<LocationData>({
    name: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (location) {
      setFormData(location);
    } else {
      setFormData({
        name: '',
        address: '',
        city: '',
        country: '',
        email: '',
        phone: '',
      });
    }
  }, [location, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.address || !formData.city ||
      !formData.country || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (location) {
      // Update existing location
      setLocations((prev) =>
        prev.map((loc) =>
          loc === location ? formData : loc
        )
      );
    } else {
      // Add new location
      setLocations((prev) => [...prev, formData]);
    }

    onClose();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      country: '',
      email: '',
      phone: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Branch
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Add a new branch location to your business
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Branch Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Branch Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.x. New York Office, Downtown Branch"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Full Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Full Address*
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, building number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* City and Country Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Country*
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
                required
              >
                <option value="" disabled>
                  Select country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone Number and Email Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 555-0123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="branch@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <span className="flex items-center gap-2">
              <X size={16} />
              Cancel
            </span>
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.33334V12.6667M3.33334 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add Branch
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}