// CreateCouponPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import CouponForm from '../../components/coupon/couponForm';
import { postApi } from '../../api';

const CreateCouponPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (couponData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await postApi("createCoupon", couponData);
      navigate("/allCoupon");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create coupon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <CouponForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default CreateCouponPage;