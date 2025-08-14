import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import FormField from '../../components/product/FormField';
import TextAreaField from '../../components/product/TextAreaField';
import SelectField from '../../components/product/SelectField';
import ProductImageEditor from '../../components/product/ProductImageEditor';
import VariantForm from '../../components/product/VariantForm';
import ErrorMessage from '../../components/product/ErrorMessage';
import { getApi, postApi, putApi } from '../../api';
import { useParams } from 'react-router';

const ProductEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '0',
        variants: [{ size: '', stock: true }],
        status: '',
        primaryImage: { existing: null, newFile: null }, // existing is URL, newFile is File
        images: { existing: [], newFiles: [] }, // existing are URLs, newFiles are Files
        imagesToDelete: [] // URLs of images to delete
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

    // --- Image Handlers ---

    const handleAddPrimaryImage = (files) => {
        setFormData(prev => ({
            ...prev,
            primaryImage: { ...prev.primaryImage, newFile: files[0] }
        }));
        if (errors.primaryImage) {
            setErrors(prev => ({ ...prev, primaryImage: '' }));
        }
    };

    const handleRemoveExistingPrimaryImage = () => {
        const existingUrl = formData.primaryImage.existing;
        setFormData(prev => ({
            ...prev,
            primaryImage: { ...prev.primaryImage, existing: null },
            imagesToDelete: [...prev.imagesToDelete, existingUrl]
        }));
    };

    const handleRemoveNewPrimaryImage = () => {
        setFormData(prev => ({
            ...prev,
            primaryImage: { ...prev.primaryImage, newFile: null }
        }));
    };

    const handleAddImages = (files) => {
        setFormData(prev => ({
            ...prev,
            images: { ...prev.images, newFiles: [...prev.images.newFiles, ...files] }
        }));
    };

    const handleRemoveExistingImage = (index) => {
        const imageUrl = formData.images.existing[index];
        const updatedExisting = [...formData.images.existing];
        updatedExisting.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            images: { ...prev.images, existing: updatedExisting },
            imagesToDelete: [...prev.imagesToDelete, imageUrl]
        }));
    };

    const handleRemoveNewImage = (index) => {
        const updatedNewFiles = [...formData.images.newFiles];
        updatedNewFiles.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            images: { ...prev.images, newFiles: updatedNewFiles }
        }));
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

        if (!formData.primaryImage.existing && !formData.primaryImage.newFile) {
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

        const payload = new FormData();

        // Append all fields except images and variants
        Object.keys(formData).forEach(key => {
            if (!['primaryImage', 'images', 'variants', 'imagesToDelete'].includes(key)) {
                payload.append(key, formData[key]);
            }
        });

        // Append variants and imagesToDelete as JSON strings
        payload.append('variants', JSON.stringify(formData.variants));
        payload.append('imagesToDelete', JSON.stringify(formData.imagesToDelete));

        // Append new primary image if it exists
        if (formData.primaryImage.newFile) {
            payload.append('primaryImage', formData.primaryImage.newFile);
        }

        // Append new additional images
        if (formData.images.newFiles.length > 0) {
            formData.images.newFiles.forEach(file => {
                payload.append('images', file);
            });
        }

        try {
            const response = await putApi(`/product/${id}`, payload);

            if (response.success) {
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    discount: '0',
                    variants: [{ size: '', stock: true }],
                    status: '',
                    primaryImage: { existing: null, newFile: null },
                    images: { existing: [], newFiles: [] },
                    imagesToDelete: []
                });
                navigate('/allProducts');
                alert('Product updated successfully');
            } else {
                setSubmitError(response.message || 'An unknown error occurred');
            }
        } catch (error) {
            setSubmitError(error.message || 'Failed to update product');
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
            status: '',
            primaryImage: { existing: null, newFile: null },
            images: { existing: [], newFiles: [] },
            imagesToDelete: []
        });
        setErrors({});
        setSubmitError('');
    };

        useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getApi(`/product/${id}`);
                const product = response.data;

                setFormData({
                    name: product.name || '',
                    description: product.description || '',
                    price: product.price || '',
                    discount: product.discount || '0',
                    status: product.status || '',
                    variants: product.variants && product.variants.length > 0 ? product.variants : [{ size: '', stock: true }],
                    primaryImage: { existing: product.primaryImage, newFile: null },
                    images: { existing: product.images || [], newFiles: [] },
                    imagesToDelete: []
                });
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setSubmitError('Failed to load product data.');
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    return (
        <div className="min-h-screen  py-8">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bgGlass shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
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
                                label="Price ($)"
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


                        </div>

                        <VariantForm
                            variants={formData.variants}
                            onChange={handleVariantsChange}
                            onAdd={handleAddVariant}
                            onRemove={handleRemoveVariant}
                        />

                        <ProductImageEditor
                            label="Primary Image"
                            existingImages={formData.primaryImage.existing ? [formData.primaryImage.existing] : []}
                            newImages={formData.primaryImage.newFile ? [formData.primaryImage.newFile] : []}
                            onAddImages={handleAddPrimaryImage}
                            onRemoveExistingImage={handleRemoveExistingPrimaryImage}
                            onRemoveNewImage={handleRemoveNewPrimaryImage}
                            required={true}
                            error={errors.primaryImage}
                            multiple={false}
                        />

                        <ProductImageEditor
                            label="Additional Images"
                            existingImages={formData.images.existing}
                            newImages={formData.images.newFiles}
                            onAddImages={handleAddImages}
                            onRemoveExistingImage={handleRemoveExistingImage}
                            onRemoveNewImage={handleRemoveNewImage}
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
                                    'Update Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductEdit;