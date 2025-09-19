import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../api";
import { LoadingSpinner } from "../Ui/Loader";

export default function Reviews() {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    
    const { data: reviews, isLoading, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => getApi('getReviews').then(res => res.data)
    });

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const goToNextImage = () => {
        if (!reviews) return;
        const images = reviews.map(review => review.image);
        setSelectedImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevImage = () => {
        if (!reviews) return;
        const images = reviews.map(review => review.image);
        setSelectedImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Handle touch events for swipe
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNextImage();
        } else if (isRightSwipe) {
            goToPrevImage();
        }
    };

    const openImagePopup = (image) => {
        if (!reviews) return;
        const images = reviews.map(review => review.image);
        const imageIndex = images.findIndex(img => img === image);
        setSelectedImageIndex(imageIndex);
        document.body.style.overflow = 'hidden';
    };

    const closeImagePopup = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedImageIndex === null) return;
            
            if (e.key === 'ArrowLeft') {
                goToPrevImage();
            } else if (e.key === 'ArrowRight') {
                goToNextImage();
            } else if (e.key === 'Escape') {
                closeImagePopup();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [selectedImageIndex, reviews]); // Added reviews as dependency

    // Early returns after all hooks are declared
    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;
    if (!reviews) return <div>No reviews found</div>;

    const images = reviews.map(review => review.image);
    const duplicatedCertificates = [...images, ...images];

    return (
        <>
            <div id="certificates" className="py-4 md:py-12 bg-white">
                <div className="w-full flex justify-center md:justify-start">
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
            {selectedImageIndex !== null && (
                <div 
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
                    onClick={closeImagePopup}
                >
                    <div 
                        className="relative max-w-4xl max-h-full"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-opacity-75 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeImagePopup();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Previous button */}
                        <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-opacity-75 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevImage();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Next button */}
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-opacity-75 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNextImage();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Image */}
                        <img
                            src={images[selectedImageIndex]}
                            alt="Certificate Full View"
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}