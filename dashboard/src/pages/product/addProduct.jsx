import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import FormField from '../../components/product/FormField';
import TextAreaField from '../../components/product/TextAreaField';
import SelectField from '../../components/product/SelectField';
import ImageUpload from '../../components/product/ImageUpload';
import VariantForm from '../../components/product/VariantForm';
import ErrorMessage from '../../components/product/ErrorMessage';
import { postApi } from '../../api';

const CreateProduct = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '0',
        variants: [{ size: '', stock: true }],
        primaryImage: [],
        images: [],
        status: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Handle image changes
    const handlePrimaryImageChange = (images) => {
        setFormData({
            ...formData,
            primaryImage: images
        });

        if (errors.primaryImage) {
            setErrors({
                ...errors,
                primaryImage: ''
            });
        }
    };

    const handleImagesChange = (images) => {
        setFormData({
            ...formData,
            images: images
        });
    };

    const handleRemovePrimaryImage = (index) => {
        const newImages = [...formData.primaryImage];
        newImages.splice(index, 1);
        setFormData({
            ...formData,
            primaryImage: newImages
        });
    };

    const handleRemoveImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({
            ...formData,
            images: newImages
        });
    };

    // Handle variant changes
    const handleVariantsChange = (variants) => {
        setFormData({
            ...formData,
            variants
        });
    };

    const handleAddVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { size: '', stock: true }]
        });
    };

    const handleRemoveVariant = (index) => {
        const newVariants = [...formData.variants];
        newVariants.splice(index, 1);
        setFormData({
            ...formData,
            variants: newVariants
        });
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (formData.discount < 0) {
            newErrors.discount = 'Discount cannot be negative';
        }

        if (formData.primaryImage.length === 0) {
            newErrors.primaryImage = 'Primary image is required';
        }

        // Validate variants
        const variantErrors = formData.variants.map(variant => {
            const variantError = {};
            if (!variant.size && variant.size !== 0) {
                variantError.size = 'Size is required';
            }
            return variantError;
        });

        if (variantErrors.some(error => Object.keys(error).length > 0)) {
            newErrors.variants = variantErrors;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('categories', formData.categories);
        data.append('price', formData.price);
        data.append('discount', formData.discount);
        data.append('status', formData.status);
        data.append('variants', JSON.stringify(formData.variants));

        if (formData.primaryImage.length > 0) {
            data.append('primaryImage', formData.primaryImage[0]);
        }

        formData.images.forEach(image => {
            data.append('images', image);
        });

        try {
            const response = await postApi('/createProduct', data);

            if (response.success) {
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    discount: '0',
                    variants: [{ size: '', stock: true }],
                    primaryImage: [],
                    images: [],
                    status: ''
                });
                navigate('/allProducts');
                alert('Product created successfully');
            } else {
                setSubmitError(response.message || 'An unknown error occurred');
            }
        } catch (error) {
            setSubmitError(error.message || 'Failed to create product');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            variants: [{ size: '', stock: true }],
            primaryImage: [],
            images: [],
            status: ''
        });
        setErrors({});
        setSubmitError('');
    };

    return (
        <div className="min-h-screen  py-8">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bgGlass shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Product</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-5">
                        {submitError && <ErrorMessage message={submitError} />}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <FormField
                                    label="Product Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    required={true}
                                    error={errors.name}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <TextAreaField
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                                    rows={4}
                                />
                            </div>

                            <FormField
                                label="Price (৳)"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                required={true}
                                min="0"
                                step="false"
                                error={errors.price}
                            />
                            <FormField
                                label="Status"
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                placeholder="Enter product status"
                                error={errors.status}
                            />

                            {/* <SelectField
                label="Category"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                options={statusOptions}
              /> */}
                        </div>

                        <VariantForm
                            variants={formData.variants}
                            onChange={handleVariantsChange}
                            onAdd={handleAddVariant}
                            onRemove={handleRemoveVariant}
                        />

                        <ImageUpload
                            label="Primary Image"
                            name="primaryImage"
                            images={formData.primaryImage}
                            onChange={handlePrimaryImageChange}
                            onRemove={handleRemovePrimaryImage}
                            required={true}
                            error={errors.primaryImage}
                        />

                        <ImageUpload
                            label="Additional Images"
                            name="images"
                            images={formData.images}
                            onChange={handleImagesChange}
                            onRemove={handleRemoveImage}
                            multiple={true}
                        />

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
                                    'Create Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;