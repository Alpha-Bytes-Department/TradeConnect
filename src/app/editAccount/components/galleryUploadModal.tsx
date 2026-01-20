import { Upload } from "lucide-react";
import React, { useState, useRef, ChangeEvent } from "react";
import api from "@/app/api";

interface GalleryUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    currentGallery: { id: string; image: string }[];
    maxImages?: number;
}

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    currentGallery,
    maxImages = 10,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const remainingSlots = maxImages - currentGallery.length;

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const availableSlots = remainingSlots - selectedFiles.length;

        if (files.length > availableSlots) {
            alert(
                `You can only add ${availableSlots} more image(s). Maximum ${maxImages} images allowed.`
            );
            return;
        }

        const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);
        if (validFiles.length !== files.length) {
            alert("Some files were skipped because they exceed 5MB");
        }

        setSelectedFiles((prev) => [...prev, ...validFiles]);

        // Reset input
        if (e.target) {
            e.target.value = "";
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleConfirm = async () => {
        if (selectedFiles.length === 0) return;

        setIsUploading(true);

        try {
            console.log('Starting upload of', selectedFiles.length, 'images...');

            // Create FormData to send files
            const formData = new FormData();

            // Append each file to FormData
            selectedFiles.forEach((file) => {
                formData.append('images', file);
            });

            // Make API call to upload images
            const uploadResponse = await api.post('business/gallery/bulk-upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload completed successfully:', uploadResponse.data.data);

            // Small delay to ensure server has processed the upload
            await new Promise(resolve => setTimeout(resolve, 500));

            console.log('Reloading gallery from parent...');

            // Call parent's onConfirm to reload gallery
            await onConfirm();

            console.log('Gallery reload completed');

            // Reset state
            setSelectedFiles([]);

            // Close modal after everything completes
            onClose();
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Failed to upload images. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setSelectedFiles([]);
        onClose();
    };

    const formatFileSize = (bytes: number): string => {
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Add Gallery Images
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Upload images to showcase your business
                        </p>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                        disabled={isUploading}
                    >
                        <svg
                            className="w-6 h-6"
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

                {/* Content */}
                <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
                    {/* Current Gallery Images */}
                    {currentGallery.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Current Gallery ({currentGallery.length}/{maxImages})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentGallery.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="bg-gray-50 border border-gray-200 rounded-lg p-2"
                                    >
                                        <div className="relative aspect-video rounded overflow-hidden bg-gray-100">
                                            <img
                                                src={image.image}
                                                alt={`Current gallery ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload Area */}
                    {selectedFiles.length < remainingSlots && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Add New Images
                            </h3>
                            <div
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                className="border-2 border-dashed border-blue-300 rounded-lg p-16 hover:border-blue-400 transition-colors cursor-pointer hover:bg-blue-100"
                            >
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="fc aspect-square bg-gray-200 p-4 rounded-full">
                                        <Upload color={'#808080ff'} size={52} />
                                    </div>
                                    <p className="text-base font-medium text-gray-700 mb-2">
                                        Click to add more images
                                    </p>
                                    <p className="text-md text-gray-500 mb-2">
                                        Any ratio accepted | Max 5MB | PNG, JPG
                                    </p>
                                    <p className="text-md font-medium text-blue-600">
                                        {remainingSlots - selectedFiles.length} Slots Remaining
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isUploading}
                    />

                    {/* Selected Images */}
                    {selectedFiles.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm text-gray-700">
                                    {selectedFiles.length}{" "}
                                    {selectedFiles.length === 1 ? "Image" : "Images"} selected
                                </p>
                                {selectedFiles.length < remainingSlots && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                        disabled={isUploading}
                                    >
                                        Add More
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex flex-col gap-4 overflow-hidden relative"
                                    >
                                        {/* Image Preview */}
                                        <div className="relative aspect-video rounded overflow-hidden flex-shrink-0 bg-gray-100">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="absolute top-2 left-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                                                aria-label="Remove image"
                                                disabled={isUploading}
                                            >
                                                <svg
                                                    className="w-4 h-4 text-gray-700"
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

                                        {/* File Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Tips */}
                    <div className="bg-blue-100 border border-blue-700 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <svg
                                className="w-5 h-5 text-blue-800 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                                    Gallery Tips
                                </h3>
                                <ul className="space-y-1 text-sm text-blue-800">
                                    <li>
                                        • Upload high-quality images that showcase your business
                                    </li>
                                    <li>• Include images of your team, workspace, or products</li>
                                    <li>• Images should be professional and well-lit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-start gap-3">
                    <button
                        onClick={handleConfirm}
                        disabled={selectedFiles.length === 0 || isUploading}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Upload />
                        {isUploading ? 'Uploading...' : 'Upload Images'}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                        disabled={isUploading}
                    >
                        <svg
                            className="w-5 h-5"
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
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryUploadModal;