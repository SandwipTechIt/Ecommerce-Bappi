import Category from "../models/category.model.js";
import {
    cleanupUploadedFiles,
    deleteImage,
    getImageUrl,
} from "../utils/imageUtils.js";


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate required fields
        if (!name) {
            // Clean up uploaded files if validation fails
            if (req.files.categoryImage) {
                await cleanupUploadedFiles(req.files.categoryImage);
            }
            return res.status(400).json({
                success: false,
                message: "Name and price are required fields",
            });
        }

        // Check if category image is uploaded
        if (req.files.categoryImage.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Category image is required",
            });
        }

        // Prepare product data
        const categoryData = {
            name,
        };


        // Set category image
        categoryData.categoryImage = req.files.categoryImage[0].filename;




        // Create product in database
        const category = await Category.create(categoryData);

        // Prepare response with full image URLs
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const responseCategory = {
            ...category.toObject(),
            categoryImage: getImageUrl(category.categoryImage, baseUrl),
        };
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: responseCategory,
        });
    } catch (error) {
        console.error("Error creating category:", error);

        // Clean up uploaded files if database operation fails
        if (req.files.categoryImage) {
            await deleteImage(req.files.categoryImage[0].filename);
        }

        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message,
        });
    }
};



export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const responseCategories = categories.map((category) => ({
            ...category.toObject(),
            categoryImage: getImageUrl(category.categoryImage, baseUrl),
        }));
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: responseCategories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message,
        });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        await deleteImage(category.categoryImage);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message,
        });
    }
};
