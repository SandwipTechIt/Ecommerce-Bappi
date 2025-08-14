import React from 'react';

const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 3,
  error 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
        {label} {required && <span className="text-red-500 dark:text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#00BCD4] dark:text-white ${
          error ? 'border-red-500' : 'border-[#00BCD4]'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextAreaField;