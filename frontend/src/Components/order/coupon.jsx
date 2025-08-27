import { useState } from 'react';
import { postApi } from '../../api';

const CouponValidator = ({ subtotal, onCouponApply, appliedCoupon }) => {
    const [couponCode, setCouponCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState('');

    const handleValidateCoupon = async () => {
        if (!couponCode.trim()) {
            setError('Please enter a coupon code');
            return;
        }

        setIsValidating(true);
        setError('');

        try {
            const response = await postApi('/validateCoupon', {
                code: couponCode.trim(),
                subtotal: subtotal
            });

            if (response.valid) {
                onCouponApply(response.coupon);
                setError('');
            }
        } catch (err) {
            setError(err.message || 'Invalid coupon code');
            onCouponApply(null);
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode('');
        setError('');
        onCouponApply(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleValidateCoupon();
        }
    };

    return (
        <div className="bg-white/50 rounded-lg shadow-md py-4 px-2 w-full mt-2">
            <h2 className="text-xl font-bold mb-4">Coupon Code</h2>
            
            {!appliedCoupon ? (
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter coupon code"
                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#e75c3a] uppercase"
                            disabled={isValidating}
                        />
                        <button
                            onClick={handleValidateCoupon}
                            disabled={isValidating || !couponCode.trim()}
                            className="px-4 py-2 bg-[#e75c3a] text-white rounded hover:bg-[#d14d2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isValidating ? 'Validating...' : 'Apply'}
                        </button>
                    </div>
                    
                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                            <p className="font-medium text-green-800">
                                Coupon Applied: {appliedCoupon.code}
                            </p>
                            <p className="text-sm text-green-600">
                                {appliedCoupon.discountType === 'percentage' 
                                    ? `${appliedCoupon.discountValue}% discount`
                                    : `৳${appliedCoupon.discountValue} discount`
                                }
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-green-800">
                                -৳{appliedCoupon.discountAmount}
                            </p>
                            <button
                                onClick={handleRemoveCoupon}
                                className="text-sm text-red-600 hover:text-red-800 underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponValidator;