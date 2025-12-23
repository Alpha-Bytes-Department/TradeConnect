'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Shield, X } from 'lucide-react';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [match,setMatch]  = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(newPassword===confirmPassword){
            setMatch(false)
            setIsSubmitting(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsSubmitting(false);
        }
        else{
            setMatch(true)
        }

        
    };

    const handleCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="w-full min-h-screen bg-white flex justify-start items-center">
            <div className="max-w-4xl ">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-2">
                        Change Password
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Update your account password for security
                    </p>
                </div>

                {/* Password Security Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 rounded-xl p-3 flex-shrink-0">
                            <Shield className="w-8 h-8 text-blue-600" strokeWidth={2} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-blue-900 mb-3">
                                Password Security Tips
                            </h2>
                            <ul className="space-y-2 text-blue-800">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Use at least 8 characters</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Include uppercase and lowercase letters</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Add numbers and special characters</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Avoid common words or personal information</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
                        {/* Current Password */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-900 mb-3">
                                Current Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-900 mb-3">
                                New Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter New password"
                                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-8">
                            <label className="block text-lg font-medium text-gray-900 mb-3">
                                Confirm Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm New password"
                                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {match && <p className="m-3 text-red-600 text-md font-semibold">Passwords don't match.</p>}
                        </div>

                        {/* Buttons */}
                        <div className=" md:w-[70%] flex flex-col md:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full fc bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg gl"
                            >
                                <Lock className="w-5 h-5" />
                                {isSubmitting ? 'Updating...' : 'Update Password'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="w-full fc bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-lg glr"
                            >
                                <X className="w-5 h-5 font-semibold" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>

                {/* Important Notice */}
                <div className="bg-white border rounded-2xl p-6">
                    <p className="text-gray-800 text-base leading-relaxed">
                        <span className="font-bold">Important:</span> After changing your password, you will remain logged in on this device. However, you'll need to use your new password when logging in from other devices.
                    </p>
                </div>
            </div>
        </div>
    );
}