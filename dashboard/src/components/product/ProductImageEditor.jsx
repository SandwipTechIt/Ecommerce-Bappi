import React, { useState, useRef } from 'react';

const ProductImageEditor = ({
  label,
  existingImages = [],
  newImages = [],
  onAddImages,
  onRemoveExistingImage,
  onRemoveNewImage,
  multiple = false,
  required = false,
  error,
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onAddImages(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAddImages(Array.from(e.target.files));
      e.target.value = ''; // Reset file input
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const allImages = [...existingImages, ...newImages];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-[#00BCD4] hover:border-[#00BCD4]'
        } ${error ? 'border-red-500' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          multiple={multiple}
          className="hidden"
          accept="image/*"
        />
        <div className="flex flex-col items-center justify-center">
          <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2 dark:text-white"></i>
          <p className="text-sm text-gray-600 dark:text-white">
            <span className="font-medium text-blue-600 dark:text-blue-200">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1 dark:text-white">
            {multiple ? 'Add more images' : 'Upload a new image'}
          </p>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>}

      {allImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingImages.map((image, index) => (
            <div key={`existing-${index}`} className="relative group">
               <div className="aspect-square rounded-md overflow-hidden border border-[#00BCD4] dark:border-gray-600">
                <img src={image} alt={`Existing ${index}`} className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => onRemoveExistingImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 opacity-100 transition-opacity"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          ))}
          {newImages.map((image, index) => (
            <div key={`new-${index}`} className="relative group">
               <div className="aspect-square rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
                 <img src={URL.createObjectURL(image)} alt={`New ${index}`} className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => onRemoveNewImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageEditor;
