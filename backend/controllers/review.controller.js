import Review from "../models/review.model.js";
import {
    cleanupUploadedFiles,
    deleteImage,
    getImageUrl,
} from "../utils/imageUtils.js";

export const createReview = async (req, res) => {
    try {

        let images = null;
        if (req.files.reviewImage && req.files.reviewImage.length > 0) {
            images = req.files.reviewImage.map((file) => {
                return {
                    image: file.filename,
                }
            });
        }


        if (!images) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
        const responseReview = await Review.insertMany(images);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: responseReview,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const responseReviews = reviews.map((review) => ({
            ...review.toObject(),
            image: getImageUrl(review.image, baseUrl),
        }));
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: responseReviews,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
            error: error.message,
        });
    }
};


export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }
        await deleteImage(review.image);
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete review",
            error: error.message,
        });
    }
};


