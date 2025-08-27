// EditCouponPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import CouponForm from '../../components/coupon/couponForm';
import { getApi, putApi } from '../../api';

const EditCouponPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                setIsLoading(true);
                const response = await getApi(`getCouponById/${id}`);
                setCoupon(response);
            } catch (err) {
                setFetchError(err.response?.data?.message || 'Failed to fetch coupon data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoupon();
    }, [id]);

    const handleSubmit = async (couponData) => {
        setIsLoading(true);
        setError(null);

        try {
            await putApi(`updateCoupon/${id}`, couponData);
            navigate('/allCoupon');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update coupon. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !coupon) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-indigo-600 mb-4"></i>
                    <p className="text-lg text-gray-600">Loading coupon data...</p>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="flex items-center justify-center">
                <div className="p-8 rounded-xl shadow-md max-w-md w-full">
                    <div className="text-center">
                        <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Coupon</h2>
                        <p className="text-gray-600 mb-6">{fetchError}</p>
                        <button
                            onClick={() => navigate('/allCoupon')}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Back to Coupons
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    console.log(coupon);
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <CouponForm
                    initialData={coupon}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default EditCouponPage;