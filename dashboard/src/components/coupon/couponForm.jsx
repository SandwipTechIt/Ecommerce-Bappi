// CouponForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CouponForm = ({ initialData, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    isActive: true,
  });
  
  const [formErrors, setFormErrors] = useState({});

  // Populate form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        discountType: initialData.discountType || 'percentage',
        discountValue: initialData.discountValue || '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.code.trim()) {
      errors.code = 'Coupon code is required';
    } else if (formData.code.length < 3) {
      errors.code = 'Code must be at least 3 characters';
    }
    
    if (!formData.discountValue) {
      errors.discountValue = 'Discount value is required';
    } else if (formData.discountType === 'percentage' && 
              (formData.discountValue <= 0 || formData.discountValue > 100)) {
      errors.discountValue = 'Percentage must be between 1 and 100';
    } else if (formData.discountType === 'fixed' && formData.discountValue <= 0) {
      errors.discountValue = 'Fixed amount must be greater than 0';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData = {
        ...formData,
        code: formData.code.trim().toUpperCase(),
        discountValue: Number(formData.discountValue),
      };
      
      onSubmit(submissionData);
    }
  };

  return (
    <div className="max-w-md mx-auto bgGlass rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="flex items-center mb-6">
        <i className="fas fa-ticket-alt text-blue-600 text-2xl mr-3"></i>
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? 'Edit Coupon' : 'Create New Coupon'}
        </h2>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-hashtag text-gray-400"></i>
            </div>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`pl-10 w-full rounded-lg border ${
                formErrors.code ? 'border-red-500' : 'border-[#00BCD4]'
              } focus:outline-none focus:ring-2 focus:ring-[#00BCD4] p-3`}
              placeholder="SUMMER25"
            />
          </div>
          {formErrors.code && (
            <p className="mt-1 text-sm text-red-600">{formErrors.code}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center p-3 border border-[#00BCD4] rounded-lg cursor-pointer hover:bg-[#00BCD4]/50 ${formData.discountType === 'percentage' ? 'bg-[#9af0fb]/50' : ''}`}>
              <input
                type="radio"
                name="discountType"
                value="percentage"
                checked={formData.discountType === 'percentage'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Percentage (%)</span>
            </label>
            <label className={`flex items-center p-3 border border-[#00BCD4] rounded-lg cursor-pointer hover:bg-[#9af0fb]/50 ${formData.discountType === 'fixed' ? 'bg-[#9af0fb]/50' : ''}`}>
              <input
                type="radio"
                name="discountType"
                value="fixed"
                checked={formData.discountType === 'fixed'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Fixed Amount ($)</span>
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
            Discount Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-tag text-gray-400"></i>
            </div>
            <input
              type="text"
              id="discountValue"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              className={`pl-10 w-full rounded-lg border ${
                formErrors.discountValue ? 'border-red-500' : 'border-[#00BCD4]'
              } focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4] p-3`}
              placeholder={formData.discountType === 'percentage' ? '10' : '200'}
              min="0"
              step="0.01"
            />
          </div>
          {formErrors.discountValue && (
            <p className="mt-1 text-sm text-red-600">{formErrors.discountValue}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                {initialData ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                {initialData ? 'Update Coupon' : 'Create Coupon'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

CouponForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default CouponForm;