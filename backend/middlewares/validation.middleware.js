import { cleanupUploadedFiles } from "../utils/imageUtils.js";

/**
 * Validate product creation data
 */
export const validateProductData = async (req, res, next) => {
    try {
        const { name, price, description, categories, discount, variants, status } = req.body;
        const errors = [];

        // Required field validations
        if (!name || name.trim().length === 0) {
            errors.push('Product name is required');
        } else if (name.trim().length < 2) {
            errors.push('Product name must be at least 2 characters long');
        } else if (name.trim().length > 200) {
            errors.push('Product name must not exceed 200 characters');
        }

        if (!price) {
            errors.push('Product price is required');
        } else {
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice) || parsedPrice < 0) {
                errors.push('Product price must be a valid positive number');
            } else if (parsedPrice > 999999.99) {
                errors.push('Product price must not exceed 999,999.99');
            }
        }

        // Optional field validations
        if (description && description.length > 2000) {
            errors.push('Product description must not exceed 2000 characters');
        }

        // if (discount) {
        //     const parsedDiscount = parseFloat(discount);
        //     if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
        //         errors.push('Discount must be a number between 0 and 100');
        //     }
        // }

        // if (categories && categories.trim().length > 0) {
        //     // Basic ObjectId format validation (24 hex characters)
        //     const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        //     if (!objectIdRegex.test(categories.trim())) {
        //         errors.push('Categories must be a valid ObjectId');
        //     }
        // }

        if (variants) {
            try {
                const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
                if (!Array.isArray(parsedVariants)) {
                    errors.push('Variants must be an array');
                } else {
                    parsedVariants.forEach((variant, index) => {
                        if (!variant.size || isNaN(variant.size) || variant.size <= 0) {
                            errors.push(`Variant ${index + 1}: Size must be a positive number`);
                        }
                        if (variant.stock !== undefined && typeof variant.stock !== 'boolean') {
                            errors.push(`Variant ${index + 1}: Stock must be a boolean value`);
                        }
                    });
                }
            } catch (error) {
                errors.push('Variants must be valid JSON format');
            }
        }

        // if (status && !['active', 'inactive', 'draft', 'archived'].includes(status)) {
        //     errors.push('Status must be one of: active, inactive, draft, archived');
        // }

        // If there are validation errors, clean up uploaded files and return error
        if (errors.length > 0) {
            if (req.files) {
                await cleanupUploadedFiles(req.files);
            }
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        next();
    } catch (error) {
        console.error('Validation middleware error:', error);
        if (req.files) {
            await cleanupUploadedFiles(req.files);
        }
        res.status(500).json({
            success: false,
            message: 'Validation error occurred',
            error: error.message
        });
    }
};

/**
 * Validate MongoDB ObjectId format
 */
export const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product ID format'
        });
    }
    
    next();
};
