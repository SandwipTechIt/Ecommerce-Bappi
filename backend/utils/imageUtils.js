import fs from 'fs';
import path from 'path';

/**
 * Delete a single image file from the images directory
 * @param {string} filename - The filename to delete
 * @returns {Promise<boolean>} - True if deleted successfully, false otherwise
 */
export const deleteImage = async (filename) => {
    if (!filename) return false;
    
    try {
        const imagePath = path.join('./images', filename);
        
        // Check if file exists
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Image deleted: ${filename}`);
            return true;
        } else {
            console.log(`Image not found: ${filename}`);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting image ${filename}:`, error);
        return false;
    }
};

/**
 * Delete multiple image files
 * @param {string[]} filenames - Array of filenames to delete
 * @returns {Promise<{deleted: string[], failed: string[]}>} - Object with deleted and failed arrays
 */
export const deleteMultipleImages = async (filenames) => {
    const deleted = [];
    const failed = [];
    
    if (!Array.isArray(filenames)) {
        return { deleted, failed };
    }
    
    for (const filename of filenames) {
        const success = await deleteImage(filename);
        if (success) {
            deleted.push(filename);
        } else {
            failed.push(filename);
        }
    }
    
    return { deleted, failed };
};

/**
 * Clean up uploaded files in case of error during product creation
 * @param {Object} files - Multer files object
 */
export const cleanupUploadedFiles = async (files) => {
    if (!files) return;
    
    const filesToDelete = [];
    
    // Add primary image if exists
    if (files.primaryImage && files.primaryImage[0]) {
        filesToDelete.push(files.primaryImage[0].filename);
    }
    
    // Add additional images if exist
    if (files.images && files.images.length > 0) {
        files.images.forEach(file => {
            filesToDelete.push(file.filename);
        });
    }
    
    if (filesToDelete.length > 0) {
        const result = await deleteMultipleImages(filesToDelete);
        console.log('Cleanup completed:', result);
    }
};

/**
 * Get image URL for frontend
 * @param {string} filename - The filename
 * @param {string} baseUrl - Base URL of the server
 * @returns {string} - Full image URL
 */
export const getImageUrl = (filename, baseUrl = '') => {
    if (!filename) return null;
    return `${baseUrl}/images/${filename}`;
};

/**
 * Extract filename from image URL
 * @param {string} imageUrl - The image URL
 * @returns {string} - The filename
 */
export const getFilenameFromUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return path.basename(imageUrl);
};
