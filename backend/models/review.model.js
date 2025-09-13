import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    image: { type: String },
});

export default mongoose.model("Review", reviewSchema);
