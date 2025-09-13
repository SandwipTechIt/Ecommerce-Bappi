import React, { useState, useEffect } from 'react';
import { CrossIcon } from '../../constants/icons';

const OfferBox = ({ sloganData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the offer box after 1 second
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Hide the offer box after 5 seconds (1 second delay + 4 seconds display)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBackdropClick = (e) => {
    // Close when clicking on the backdrop (outside the image)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Don't render if not visible or no slogan data
  if (!isVisible || !sloganData) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-full max-h-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1"
          aria-label="Close offer"
        >
          <CrossIcon className="w-4 h-4 text-gray-600" />
        </button>

        {/* Just the Image */}
        <img
          src={sloganData.image}
          alt="Special Offer"
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};

export default OfferBox;
