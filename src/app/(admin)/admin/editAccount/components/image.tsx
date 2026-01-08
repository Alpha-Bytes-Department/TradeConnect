import React, { useRef, useState, ChangeEvent, useEffect } from 'react';
import GalleryUploadModal from './galleryUploadModal';
import { PlusCircleIcon } from 'lucide-react';

// This handles the UI rendering safely without memory leaks
const SafeImg = ({ src, alt, className }: { src: File | string | null; alt: string; className: string }) => {
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        if (!src) return;
        if (typeof src === 'string') {
            setPreview(src);
            return;
        }
        const url = URL.createObjectURL(src);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [src]);

    return preview ? <img src={preview} alt={alt} className={className} /> : null;
};

interface ImagesProps {
    // Updated to allow Files (new uploads) and strings (existing URLs)
    data: { banner: File | string | null; gallery: (File | string)[] };
    setData: React.Dispatch<React.SetStateAction<any>>;
}

const Images: React.FC<ImagesProps> = ({ data, setData }) => {
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size <= MAX_SIZE) {
                setData((prev: any) => ({
                    ...prev,
                    banner: file, // Fixed: removed .images nesting
                }));
            } else {
                alert('File size must be less than 5MB');
            }
        }
    };

    const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const currentGalleryLength = data.gallery.length;
        const remainingSlots = 10 - currentGalleryLength;

        if (files.length > remainingSlots) {
            alert(`You can only add ${remainingSlots} more image(s). Maximum 10 images allowed.`);
            return;
        }

        const validFiles = files.filter((file) => file.size <= MAX_SIZE);
        if (validFiles.length !== files.length) {
            alert('Some files were skipped because they exceed 5MB');
        }

        setData((prev: any) => ({
            ...prev,
            gallery: [...prev.gallery, ...validFiles], // Fixed: removed .images nesting
        }));
    };

    const handleGalleryUploadFromModal = (files: File[]) => {
        setData((prev: any) => ({
            ...prev,
            gallery: [...prev.gallery, ...files], // Fixed: removed .images nesting
        }));
    };

    const removeGalleryImage = (index: number) => {
        setData((prev: any) => ({
            ...prev,
            gallery: prev.gallery.filter((_: any, i: number) => i !== index),
        }));
    };

    return (
        <div className="w-full mx-auto space-y-8">
            {/* Banner Section */}
            <div>
                <label className="text-sm text-gray-700 mb-2">
                    Business banner<span className="text-red-500">*</span>
                </label>
                {data.banner && (
                    <div className="w-full h-56 rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
                        <SafeImg
                            src={data.banner}
                            alt="Business banner"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div
                    onClick={() => bannerInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-16 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-base font-medium text-gray-700 mb-1">Click to upload new Banner</p>
                        <p className="text-sm text-gray-500">PNG, JPG, up to 5MB (1200x400 recommended)</p>
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
                <label className="text-sm text-gray-700 mb-2">Gallery Images</label>

                {data.gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {data.gallery.map((image, index) => (
                            <div key={index} className="relative col-span-2 md:col-span-1 group">
                                <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                                    <SafeImg
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-3 right-3 w-6 h-6 bg-white shadow-md shadow-gray-500 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all"
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {data.gallery.length < 10 && (
                    <div
                        onClick={() => setIsGalleryModalOpen(true)}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-16 hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="bg-orange-500 rounded-full shadow-md hover:shadow-lg shadow-orange-500 text-white flex items-center justify-center h-20 w-20 mb-10">
                                <PlusCircleIcon size={45} strokeWidth={1} />
                            </div>
                            <p className="text-base font-medium text-gray-700 mb-1">Add gallery images.</p>
                            <p className="text-sm text-gray-500">Add up to 10 images to showcase your business</p>
                        </div>
                    </div>
                )}
            </div>

            <GalleryUploadModal
                isOpen={isGalleryModalOpen}
                onClose={() => setIsGalleryModalOpen(false)}
                onConfirm={handleGalleryUploadFromModal}
                currentGalleryLength={data.gallery.length}
                maxImages={10}
            />
        </div>
    );
};

export default Images;