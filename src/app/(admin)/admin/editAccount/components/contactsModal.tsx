'use client';

import { useState } from 'react';
import { X, Star, ChevronDown } from 'lucide-react';
import { Contact } from '../../accounts/page';

interface AddContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Contact) => void;
}


const roles = [
    'Chief Executive Officer (CEO)',
    'Chief Technology Officer (CTO)',
    'Chief Operating Officer (COO)',
    'Chief Financial Officer (CFO)',
    'Managing Director',
    'General Manager',
    'Sales Manager',
    'Marketing Manager',
    'Operations Manager',
    'Other',
];

export default function AddContactModal({ isOpen, onClose, onSubmit }: AddContactModalProps) {
    const [formData, setFormData] = useState<Contact>({
        id: new Date().toISOString(),
        name: '',
        position: '',
        email: '',
        phone: '',
        isPrimary: false,
    });

    const [otherPosition, setOtherPosition]=useState<string>('')

    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formData.position === 'Other' ? onSubmit({ ...formData, position: otherPosition }) : onSubmit(formData)
        // Reset form
        setFormData({
            id: new Date().toISOString(),
            name: '',
            position: '',
            email: '',
            phone: '',
            isPrimary: false,
        });
        onClose();
    };

    const handleCancel = () => {
        setFormData({
            id: new Date().toISOString(),
            name: '',
            position: '',
            email: '',
            phone: '',
            isPrimary: false,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform animate-slideUp">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                                    Add Contact Person
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Add a new contact person to your business profile
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-6">
                        <div className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.x. John Smith"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Role/Position */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role/Position<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left flex items-center justify-between bg-white"
                                    >
                                        <span className={formData.position ? 'text-gray-900' : 'text-gray-400'}>
                                            {formData.position || 'Select a role'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    {isRoleDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto animate-fadeIn">
                                            {roles.map((role) => (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({ ...formData, position:role });
                                                        setIsRoleDropdownOpen(false);
                                                    }}
                                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {
                                        (formData.position==='Other')&&(
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 my-2">
                                                    Add Position<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={otherPosition}
                                                    onChange={(e) => setOtherPosition(e.target.value) }
                                                    placeholder="e.x. Chief Executive Officer(CEO)"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="e.x. john.smit@company.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    maxLength={15}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^\d+]/g,'') })}
                                    placeholder="e.x. +0158 246 987 654"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Primary Contact Checkbox */}
                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={formData.isPrimary}
                                            onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                            className="w-5 h-5 border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                Set as Primary Contact
                                            </span>
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                            The primary contact will be highlighted and displayed first in your business
                                            profile
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-5 py-2.5 text-sm font-medium text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-sm hover:shadow-md"
                            >
                                Add Contact
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
        </>
    );
}