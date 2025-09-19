import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import FormField from '../../components/product/FormField';
import TextAreaField from '../../components/product/TextAreaField';
import SelectField from '../../components/product/SelectField';
import ImageUpload from '../../components/product/ImageUpload';
import VariantForm from '../../components/product/VariantForm';
import ErrorMessage from '../../components/product/ErrorMessage';
import { getApi, postApi } from '../../api';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/shared/Loader';

const CreateProduct = () => {
    const navigate = useNavigate();
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        isStock: true,
        category: '',
        variants: [{ size: '', stock: true }],
        primaryImage: [],
        images: [],
        status: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const { data: categories, isLoading, Error: categoryError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await getApi('/getAllCategories'),
        
    })

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Handle checkbox inputs
        const val = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: val
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

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            category: value
        });
        // Clear error when user selects a category
        if (errors.category) {
            setErrors({
                ...errors,
                category: ''
            });
        }
    };

    // Validate form - updated to include discount validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!formData.discount || formData.discount <= 0) {
            newErrors.discount = 'Discount price cannot be negative';
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
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!validateForm()) {
            return;
        }
        console.log(formData);

        setIsSubmitting(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('discount', formData.discount);
        data.append('isStock', formData.isStock);
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
                    discount: '',
                    isStock: true,
                    category: '',
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

    const handleReset = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            discount: '',
            isStock: true,
            category: '',
            variants: [{ size: '', stock: true }],
            primaryImage: [],
            images: [],
            status: ''
        });
        setErrors({});
        setSubmitError('');
    };


    if (isLoading) {
        return <Loader />
    }

    if (categoryError) {
        return <ErrorMessage msg={categoryError?.message} retry={refetch} />
    }


    console.log(formData);
    return (
        <div className="min-h-screen py-8">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bgGlass shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Product</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 py-5">
                        {submitError && <ErrorMessage message={submitError} />}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    label="Product Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    required={true}
                                    error={errors.name}
                                />
                                <TextAreaField
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                                    rows={4}
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FormField
                                    label="Regular Price"
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter product price"
                                    error={errors.price}
                                />
                                <FormField
                                    label="Discount Price"
                                    type="text"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    placeholder="Enter discount price"
                                    required={true}
                                    error={errors.discount}
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
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 rounded-lg">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isStock"
                                    name="isStock"
                                    checked={formData.isStock}
                                    onChange={handleChange}
                                    className="h-6 w-6 text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <label htmlFor="isStock" className="ml-2 block text-lg text-gray-900 dark:text-white ">
                                    In Stock
                                </label>
                            </div>
                            <SelectField
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleCategoryChange}
                                options={categories?.data?.map(category => ({
                                    value: category.name,
                                    label: category.name
                                })) || []}
                                required={true}
                                error={errors.category}
                            />
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2 col-span-1 md:col-span-2 md:gap-6">
                            </div> */}
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 col-span-1 md:col-span-2 md:gap-6">
                        <div className='w-full'>
                            <VariantForm
                                variants={formData.variants}
                                onChange={handleVariantsChange}
                                onAdd={handleAddVariant}
                                onRemove={handleRemoveVariant}
                                error={errors.variants}
                            />
                        </div>
                            <ImageUpload
                                label="Primary Image"
                                name="primaryImage"
                                images={formData.primaryImage}
                                onChange={handlePrimaryImageChange}
                                onRemove={handleRemovePrimaryImage}
                                required={true}
                                error={errors.primaryImage}
                            />
                        </div>

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