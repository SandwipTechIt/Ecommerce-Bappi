import Product from "../models/product.model.js";
import { cleanupUploadedFiles, deleteMultipleImages, getImageUrl } from "../utils/imageUtils.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, categories, price, discount, variants, status } = req.body;
        
        // Validate required fields
        if (!name || !price) {
            // Clean up uploaded files if validation fails
            if (req.files) {
                await cleanupUploadedFiles(req.files);
            }
            return res.status(400).json({
                success: false,
                message: 'Name and price are required fields'
            });
        }

        // Check if primary image is uploaded
        if (!req.files || !req.files.primaryImage || req.files.primaryImage.length === 0) {
            // Clean up any uploaded additional images
            if (req.files) {
                await cleanupUploadedFiles(req.files);
            }
            return res.status(400).json({
                success: false,
                message: 'Primary image is required'
            });
        }

        // Prepare product data
        const productData = {
            name,
            description,
            categories,
            price: parseFloat(price),
            discount: discount ? parseFloat(discount) : 0,
            status: status || 'draft'
        };

        // Handle variants if provided
        if (variants) {
            try {
                productData.variants = typeof variants === 'string' ? JSON.parse(variants) : variants;
            } catch (error) {
                await cleanupUploadedFiles(req.files);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid variants format'
                });
            }
        }

        // Set primary image
        productData.primaryImage = req.files.primaryImage[0].filename;

        // Set additional images if provided
        if (req.files.images && req.files.images.length > 0) {
            productData.images = req.files.images.map(file => file.filename);
        }

        // Create product in database
        const product = await Product.create(productData);

        // Prepare response with full image URLs
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const responseProduct = {
            ...product.toObject(),
            primaryImage: getImageUrl(product.primaryImage, baseUrl),
            images: product.images.map(img => getImageUrl(img, baseUrl))
        };

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: responseProduct
        });

    } catch (error) {
        console.error('Error creating product:', error);
        
        // Clean up uploaded files if database operation fails
        if (req.files) {
            await cleanupUploadedFiles(req.files);
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the product first to get image filenames
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Collect all image filenames for deletion
        const imagesToDelete = [];
        if (product.primaryImage) {
            imagesToDelete.push(product.primaryImage);
        }
        if (product.images && product.images.length > 0) {
            imagesToDelete.push(...product.images);
        }

        // Delete the product from database
        await Product.findByIdAndDelete(id);

        // Delete associated images
        if (imagesToDelete.length > 0) {
            const deleteResult = await deleteMultipleImages(imagesToDelete);
            console.log('Image deletion result:', deleteResult);
        }

        res.status(200).json({
            success: true,
            message: 'Product and associated images deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).select("-images -__v -variants -categories -updatedAt");
        
        // Add full image URLs to response
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const productsWithImageUrls = products.map(product => ({
            ...product.toObject(),
            primaryImage: getImageUrl(product.primaryImage, baseUrl),
            // images: product.images.map(img => getImageUrl(img, baseUrl))
        }));

        res.status(200).json(productsWithImageUrls);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, discount, variants, status, imagesToDelete } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            if (req.files) await cleanupUploadedFiles(req.files);
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // 1. Handle image deletions
        const parsedImagesToDelete = imagesToDelete ? JSON.parse(imagesToDelete) : [];
        if (parsedImagesToDelete.length > 0) {
            const filenamesToDelete = parsedImagesToDelete.map(url => url.split('/').pop());
            await deleteMultipleImages(filenamesToDelete);

            // Remove from product model
            if (filenamesToDelete.includes(product.primaryImage)) {
                product.primaryImage = null;
            }
            product.images = product.images.filter(img => !filenamesToDelete.includes(img));
        }

        // 2. Handle new image uploads
        if (req.files) {
            // New primary image
            if (req.files.primaryImage && req.files.primaryImage[0]) {
                // If there was an old primary image, delete it
                if (product.primaryImage) {
                    await deleteMultipleImages([product.primaryImage]);
                }
                product.primaryImage = req.files.primaryImage[0].filename;
            }
            // New additional images
            if (req.files.images && req.files.images.length > 0) {
                const newImageFilenames = req.files.images.map(file => file.filename);
                product.images.push(...newImageFilenames);
            }
        }

        // 3. Update other product data
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price ? parseFloat(price) : product.price;
        product.discount = discount ? parseFloat(discount) : product.discount;
        product.status = status || product.status;
        if (variants) {
            product.variants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        }

        // Save the updated product
        const updatedProduct = await product.save();

        // Prepare response
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const responseProduct = {
            ...updatedProduct.toObject(),
            primaryImage: getImageUrl(updatedProduct.primaryImage, baseUrl),
            images: updatedProduct.images.map(img => getImageUrl(img, baseUrl))
        };

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: responseProduct
        });

    } catch (error) {
        console.error('Error updating product:', error);
        if (req.files) await cleanupUploadedFiles(req.files);
        res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Add full image URLs to response
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const productWithImageUrls = {
            ...product.toObject(),
            primaryImage: getImageUrl(product.primaryImage, baseUrl),
            images: product.images.map(img => getImageUrl(img, baseUrl))
        };

        res.status(200).json({
            success: true,
            data: productWithImageUrls
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error.message
        });
    }
};