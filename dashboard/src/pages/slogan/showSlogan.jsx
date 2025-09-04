import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import FormField from '../../components/product/FormField';
import ImageUpload from '../../components/product/ImageUpload';
import ErrorMessage from '../../components/product/ErrorMessage';
import { getApi, postApi } from '../../api';

export default function EditSlogan() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        text: '',
        description: '',
        sloganImage: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [existingImage, setExistingImage] = useState('');
    const [removeExistingImage, setRemoveExistingImage] = useState(false);
    
    // Fetch slogan data using React Query
    const { data: slogan, isLoading, error } = useQuery({
        queryKey: ['slogan'],
        queryFn: () => getApi("getSlogan"),
    });

    useEffect(() => {
        if (slogan) {
            setFormData({
                text: slogan.text,
                description: slogan.description,
                sloganImage: []
            });
            setExistingImage(slogan.image);
            setRemoveExistingImage(false);
        }
    }, [slogan]);

    // Update mutation using React Query
    const mutation = useMutation({
        mutationFn: (updatedData) => postApi("createSlogan", updatedData),
        onSuccess: (data) => {
            alert('Slogan updated successfully');
            console.log({data});
            
            setExistingImage(data.image);
            setRemoveExistingImage(false);
        },
        onError: (err) => {
            setSubmitError(err.message || 'Failed to update slogan');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleImageChange = (images) => {
        // Only keep the last image if multiple are selected
        const newImages = images.length > 0 ? [images[images.length - 1]] : [];
        setFormData({ ...formData, sloganImage: newImages });
        
        // If a new image is uploaded, mark existing image for removal
        if (existingImage && newImages.length > 0) {
            setRemoveExistingImage(true);
        }
        
        if (errors.sloganImage) {
            setErrors({ ...errors, sloganImage: '' });
        }
    };

    const handleRemoveImage = (index) => {
        // If removing the existing image
        if (existingImage && index === 0) {
            setExistingImage('');
            setRemoveExistingImage(true);
        } 
        // If removing a newly uploaded image
        else {
            const newImages = [...formData.sloganImage];
            newImages.splice(index - (existingImage ? 1 : 0), 1);
            setFormData({ ...formData, sloganImage: newImages });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (formData.text.trim() && !formData.description.trim()) newErrors.description = 'if text is provided, description is required';
        if (formData.description.trim() && !formData.text.trim()) newErrors.text = 'if description is provided, text is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!validate()) return;
        setIsSubmitting(true);
        
        const data = new FormData();
        data.append('text', formData.text);
        data.append('description', formData.description);
        
        // Append new image if uploaded
        if (formData.sloganImage.length > 0) {
            data.append('sloganImage', formData.sloganImage[0]);
        }
        
        // Flag to remove existing image
        if (removeExistingImage) {
            data.append('removeImage', 'true');
        }
        
        try {
            await mutation.mutateAsync(data);
        } catch (err) {
            // Error is handled by mutation's onError
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        if (slogan) {
            setFormData({
                text: slogan.text,
                description: slogan.description,
                sloganImage: []
            });
            setExistingImage(slogan.image);
            setRemoveExistingImage(false);
        }
        setErrors({});
        setSubmitError('');
    };

    // Combine existing image and new images for display
    const displayImages = existingImage ? [existingImage, ...formData.sloganImage] : [...formData.sloganImage];

    if (isLoading) {
        return (
            <div className="min-h-screen py-8 flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-3xl text-blue-500"></i>
                    <p className="mt-2 text-gray-600">Loading slogan data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen py-8 flex items-center justify-center">
                <div className="text-center bg-red-50 p-6 rounded-lg">
                    <i className="fas fa-exclamation-circle text-3xl text-red-500"></i>
                    <p className="mt-2 text-red-600">Error loading slogan: {error.message}</p>
                    <button 
                        onClick={() => navigate('/allSlogans')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to Slogans
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="bgGlass shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Slogan</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 py-5">
                        {submitError && <ErrorMessage message={submitError} />}
                        <div className="grid grid-cols-1 gap-6">
                            <FormField
                                label="Slogan Text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                placeholder="Enter slogan text"
                                error={errors.text}
                            />
                            <FormField
                                label="Slogan Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter slogan description"
                                error={errors.description}
                                isTextarea={true}
                            />
                            
                            <ImageUpload
                                label="Slogan Image"
                                name="sloganImage"
                                images={displayImages}
                                onChange={handleImageChange}
                                onRemove={handleRemoveImage}
                                required={false}
                                error={errors.sloganImage}
                                existingImage={existingImage}
                            />
                        </div>
                        <div className="flex justify-end space-x-3 mt-8">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || mutation.isLoading}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isSubmitting || mutation.isLoading ? (
                                    <span className="flex items-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i> Updating...
                                    </span>
                                ) : (
                                    'Update Slogan'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}