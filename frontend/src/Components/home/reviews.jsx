import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../api";
import { LoadingSpinner } from "../Ui/Loader";

export default function TrustedPartners() {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const { data: reviews, isLoading, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => getApi('getReviews').then(res => res.data)
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    const images = reviews.map(review => review.image);
    const duplicatedCertificates = [...images, ...images];

    const openImagePopup = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeImagePopup = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <>
            <div id="certificates" className="py-4 md:py-12 bg-white">
            <div className="w-full flex  justify-center md:justify-start">
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-double border-gray-400">What Our Customers Say</h2>
                </div>
                <div className="container relative overflow-hidden">
                    <div
                        className="flex"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div
                            className="flex gap-8 py-4 animate-marquee"
                            style={{
                                animationPlayState: isHovered ? 'paused' : 'running',
                                animationDuration: `${reviews.length * 5}s`
                            }}
                        >
                            {duplicatedCertificates.map((cert, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-60 h-60 overflow-hidden bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                                    onClick={() => openImagePopup(cert)}
                                >
                                    <img
                                        src={cert}
                                        alt={`Certificate ${index + 1}`}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
                </div>
                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: marquee linear infinite;
                    }
                `}</style>
            </div>

            {/* Image Popup Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/50 bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closeImagePopup}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-opacity-75 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeImagePopup();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Certificate Full View"
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}