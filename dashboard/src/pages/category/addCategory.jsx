import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FormField from '../../components/product/FormField';
import ImageUpload from '../../components/product/ImageUpload';
import ErrorMessage from '../../components/product/ErrorMessage';
import { postApi } from '../../api';

export default function AddCategory() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        categoryImage: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleImageChange = (images) => {
        setFormData({ ...formData, categoryImage: images });
        if (errors.categoryImage) {
            setErrors({ ...errors, categoryImage: '' });
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...formData.categoryImage];
        newImages.splice(index, 1);
        setFormData({ ...formData, categoryImage: newImages });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Category name is required';
        if (formData.categoryImage.length === 0) newErrors.categoryImage = 'Category image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!validate()) return;

        setIsSubmitting(true);
        const data = new FormData();
        data.append('name', formData.name.charAt(0).toUpperCase() + formData.name.slice(1));
        if (formData.categoryImage.length > 0) {
            data.append('categoryImage', formData.categoryImage[0]);
        }

        try {
            const res = await postApi('/createCategory', data);
            if (res.success) {
                // reset
                setFormData({ name: '', categoryImage: [] });
                navigate('/allCategories');
                alert('Category created successfully');
            } else {
                setSubmitError(res.message || 'Failed to create category');
            }
        } catch (err) {
            setSubmitError(err.message || 'Failed to create category');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({ name: '', categoryImage: [] });
        setErrors({});
        setSubmitError('');
    };

    return (
        <div className="min-h-screen py-8">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="bgGlass shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Category</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-5">
                        {submitError && <ErrorMessage message={submitError} />}

                        <div className="grid grid-cols-1 gap-6">
                            <FormField
                                label="Category Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                required={true}
                                error={errors.name}
                            />

                            <ImageUpload
                                label="Category Image"
                                name="categoryImage"
                                images={formData.categoryImage}
                                onChange={handleImageChange}
                                onRemove={handleRemoveImage}
                                required={true}
                                error={errors.categoryImage}
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
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i> Creating...
                                    </span>
                                ) : (
                                    'Create Category'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
