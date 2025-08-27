import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        index: true,
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'],
    },
    discountValue: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});


export default mongoose.model("Coupon", couponSchema);
