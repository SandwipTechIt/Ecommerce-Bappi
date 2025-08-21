import React, { useState } from 'react';
import FormField from './FormField';

const VariantForm = ({ variants, onChange, onAdd, onRemove }) => {
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value
    };
    onChange(updatedVariants);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Product Variants</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <i className="fas fa-plus mr-1"></i> Add Variant
        </button>
      </div>
      
      {variants.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No variants added yet. Click "Add Variant" to add one.</p>
      ) : (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-md font-medium text-gray-800 dark:text-white">Variant #{index + 1}</h4>
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Size"
                  type="text"
                  name={`variant-size-${index}`}
                  value={variant.size || ''}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  placeholder="Enter size"
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                    In Stock
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`variant-stock-${index}`}
                      checked={variant.stock || false}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`variant-stock-${index}`} className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Available in stock
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariantForm;