import Slogan from "../models/slogan.model.js";

import { deleteImage, getImageUrl } from "../utils/imageUtils.js";

export const createSlogan = async (req, res) => {
    console.log(req.files);
    console.log(typeof req.files);
    
    try {
        const { text, description } = req.body;
        let backup = null;
        // Prepare product data
        const sloganData = {
            image: Array.isArray(req.files?.sloganImage) ? req.files?.sloganImage[0]?.filename : '',
            text,
            description,
        };




        backup = await Slogan.findOneAndDelete({});
        if (backup && backup.image) {
            await deleteImage(backup.image);
        }
        // Create product in database
        const slogan = await Slogan.create(sloganData);

        // Prepare response with full image URLs
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const responseSlogan = {
            ...slogan.toObject(),
            image: getImageUrl(slogan.image, baseUrl),
        };
        res.status(201).json({
            success: true,
            message: "Slogan created successfully",
            data: responseSlogan,
        });
    } catch (error) {
        console.error("Error creating slogan:", error);

        // Clean up uploaded files if database operation fails
        if (Array.isArray(req.files?.sloganImage) && req.files?.sloganImage.length > 0) {
            await deleteImage(req.files?.sloganImage[0]?.filename);
        }

        res.status(500).json({
            success: false,
            message: "Failed to create slogan",
            error: error.message,
        });
    }
};


export const getSlogan = async (req, res) => {
    try {
        const slogan = await Slogan.findOne();
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const responseSlogan = {
            ...slogan.toObject(),
            image: getImageUrl(slogan.image, baseUrl),
        };
        res.status(200).json(responseSlogan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

