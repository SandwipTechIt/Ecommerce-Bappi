import React, { useState, useRef } from 'react';

import {postApi} from '../../api';
import { useNavigate } from 'react-router';

const AddReview = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Handle image selection
    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate file types
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));
        
        if (invalidFiles.length > 0) {
            alert('Please select only image files (JPEG, PNG, GIF, WebP)');
            return;
        }

        // Validate file sizes (5MB each)
        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            alert('Each image must be less than 5MB');
            return;
        }

        // Limit to 10 images total
        const totalImages = selectedImages.length + files.length;
        if (totalImages > 10) {
            toast.error('Maximum 10 images allowed');
            return;
        }

        // Add new files to existing selection
        const newImages = [...selectedImages, ...files];
        setSelectedImages(newImages);

        // Create previews for new files
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews(prev => [...prev, {
                    id: Date.now() + Math.random(),
                    url: e.target.result,
                    file: file,
                    name: file.name
                }]);
            };
            reader.readAsDataURL(file);
        });

        // Clear file input
        e.target.value = '';
    };


    const navigate = useNavigate();

    // Remove image from selection
    const removeImage = (indexToRemove) => {
        setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    // Handle image upload
    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            toast.error('Please select at least one image');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            
            // Append images
            selectedImages.forEach(image => {
                formData.append('reviewImage', image);
            });

            const response = await postApi('createReview', formData);

            if (response.success) {
                alert('Review images uploaded successfully!');
                // Reset form
                setSelectedImages([]);
                setImagePreviews([]);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                navigate('/allReview');
            } else {
                alert(response.message || 'Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Network error. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    // Clear all selected images
    const clearAll = () => {
        setSelectedImages([]);
        setImagePreviews([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ color: '#333', marginBottom: '10px' }}>Upload Review Images</h2>
            </div>

            {/* File Upload Section */}
            <div style={{ 
                borderRadius: '8px', 
                padding: '40px 20px', 
                textAlign: 'center',
                marginBottom: '20px',
            }} className='bgGlass'>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                
                <div className='flex flex-col items-center justify-center gap-2'>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#ccc" style={{ marginBottom: '10px' }}>
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>
                        Drag and drop images here or click to browse
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '500'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Select Images
                </button>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '15px'
                    }}>
                        <h3 style={{ margin: '0', color: '#333' }}>
                            Selected Images ({imagePreviews.length}/10)
                        </h3>
                        <button
                            type="button"
                            onClick={clearAll}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Clear All
                        </button>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: '15px'
                    }}>
                        {imagePreviews.map((preview, index) => (
                            <div key={preview.id} style={{ 
                                position: 'relative',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                backgroundColor: 'white'
                            }}>
                                <img
                                    src={preview.url}
                                    alt={`Preview ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '120px',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                                <div style={{ 
                                    padding: '8px',
                                    fontSize: '12px',
                                    color: '#666',
                                    textAlign: 'center',
                                    borderTop: '1px solid #eee'
                                }}>
                                    {preview.name.length > 20 ? 
                                        preview.name.substring(0, 20) + '...' : 
                                        preview.name
                                    }
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(220, 53, 69, 0.9)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title="Remove image"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Button */}
            {selectedImages.length > 0 && (
                <div style={{ textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={isUploading}
                        style={{
                            padding: '15px 30px',
                            backgroundColor: isUploading ? '#6c757d' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: isUploading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            minWidth: '150px'
                        }}
                    >
                        {isUploading ? 'Uploading...' : `Upload ${selectedImages.length} Image${selectedImages.length > 1 ? 's' : ''}`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddReview;