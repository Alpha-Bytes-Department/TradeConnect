import React, { useRef, ChangeEvent } from 'react';

import { EditData } from '../page';

interface ImagesProps {
    editData: EditData;
    setEditData: React.Dispatch<React.SetStateAction<EditData>>;
}

const Images: React.FC<ImagesProps> = ({ editData, setEditData }) => {
    const logoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setEditData((prev) => ({
                ...prev,
                images: {
                    ...prev.images,
                    logo: file,
                },
            }));
        } else if (file) {
            alert('File size must be less than 5MB');
        }
    };

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setEditData((prev) => ({
                ...prev,
                images: {
                    ...prev.images,
                    banner: file,
                },
            }));
        } else if (file) {
            alert('File size must be less than 5MB');
        }
    };

    const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const currentGalleryLength = editData.images.gallery.length;
        const remainingSlots = 10 - currentGalleryLength;

        if (files.length > remainingSlots) {
            alert(`You can only add ${remainingSlots} more image(s). Maximum 10 images allowed.`);
            return;
        }

        const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);
        if (validFiles.length !== files.length) {
            alert('Some files were skipped because they exceed 5MB');
        }

        setEditData((prev) => ({
            ...prev,
            images: {
                ...prev.images,
                gallery: [...prev.images.gallery, ...validFiles],
            },
        }));
    };

    const removeGalleryImage = (index: number) => {
        setEditData((prev) => ({
            ...prev,
            images: {
                ...prev.images,
                gallery: prev.images.gallery.filter((_, i) => i !== index),
            },
        }));
    };

    const getFilePreview = (file: File | null): string => {
        if (!file) return '';
        return URL.createObjectURL(file);
    };

    return (
        <div className="w-full mx-auto space-y-8">
            {/* Logo Section */}
            <div>
                <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                    Business Logo<span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-4">
                    {/* Current Logo Preview */}
                    {editData.images.logo && (
                        <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                            <img
                                src={getFilePreview(editData.images.logo)}
                                alt="Business logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Upload Area */}
                    <div
                        onClick={() => logoInputRef.current?.click()}
                        className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <svg
                                className="w-12 h-12 text-gray-400 mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="text-base font-medium text-gray-700 mb-1">
                                Click to upload new logo
                            </p>
                            <p className="text-sm text-gray-500">
                                PNG, JPG, up to 5MB (Square recommended)
                            </p>
                        </div>
                    </div>
                    <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleLogoChange}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Banner Section */}
            <div>
                <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                    Business Banner<span className="text-red-500">*</span>
                </label>
                {/* Current Banner Preview */}
                {editData.images.banner && (
                    <div className="w-full h-56 rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
                        <img
                            src={getFilePreview(editData.images.banner)}
                            alt="Business banner"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Upload Area */}
                <div
                    onClick={() => bannerInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-16 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <svg
                            className="w-12 h-12 text-gray-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="text-base font-medium text-gray-700 mb-1">
                            Click to upload new Banner
                        </p>
                        <p className="text-sm text-gray-500">
                            PNG, JPG, up to 5MB (1200x400 recommended)
                        </p>
                    </div>
                </div>
                <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleBannerChange}
                    className="hidden"
                />
            </div>

            {/* Gallery Section */}
            <div>
                <label htmlFor="country" className="text-sm text-gray-700 mb-2">
                    Gallery Images
                </label>

                {/* Gallery Grid */}
                {editData.images.gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {editData.images.gallery.map((image, index) => (
                            <div key={index} className="relative group">
                                <div className="aspect-[16/10] rounded-lg overflow-hidden border-2 border-gray-200">
                                    <img
                                        src={getFilePreview(image)}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all"
                                    aria-label="Remove image"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add More Images */}
                {editData.images.gallery.length < 10 && (
                    <div
                        onClick={() => galleryInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-16 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <svg
                                className="w-12 h-12 text-gray-400 mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="text-base font-medium text-gray-700 mb-1">
                                Click to add more images
                            </p>
                            <p className="text-sm text-gray-500">
                                Add up to 10 images to showcase your business
                            </p>
                        </div>
                    </div>
                )}
                <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    onChange={handleGalleryChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default Images;