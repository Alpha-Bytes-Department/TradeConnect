'use client';

import { PlusCircle, PlusCircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LocationData {
  id: string,
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
}

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LocationData[];
  editable?: LocationData;
  setData: (data: LocationData[]) => void;
}

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Bangladesh',
  // Add more countries as needed
];

export default function AddBranchModal({
  isOpen,
  onClose,
  data,
  editable,
  setData,
}: AddBranchModalProps) {
  const [formData, setFormData] = useState<LocationData>({
    id: '',
    name: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LocationData, string>>>({});

  useEffect(() => {
    if (editable) {
      setFormData(editable);
    } else {
      setFormData({
        id:'',
        name: '',
        address: '',
        city: '',
        country: '',
        email: '',
        phone: '',
      });
    }
  }, [data, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LocationData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Branch name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Full address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (!editable) {
        // Generate a unique ID for new branches
        const newBranch = { ...formData, id: Date.now().toString() };
        setData([...data, newBranch]);
      } else {
        // CHANGE: Use map to update the specific item while keeping all others
        const updatedData = data.map((item) =>
          item.id === editable.id ? formData : item
        );
        setData(updatedData);
      }

      onClose();
    }
  };

  const handleChange = (field: keyof LocationData, value: string) => {
  
    setFormData((prev) => ({ ...prev, [field]: field === 'phone' ? value.replace(/[^\d+]/g, ""):value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Add New Branch
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add a new branch location to your business
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5">
          {/* Branch Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.x. New York Office, Downtown Branch"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Street address, building number"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* City and Country Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-all ${errors.country ? 'border-red-500' : 'border-gray-300'
                    } ${!formData.country ? 'text-gray-400' : 'text-gray-900'}`}
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Phone Number and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                maxLength={15}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 555-0123"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="branch@company.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <PlusCircleIcon/>
            {data ? 'Update Branch' : 'Add Branch'}
          </button>
        </div>
      </div>
    </div>
  );
}