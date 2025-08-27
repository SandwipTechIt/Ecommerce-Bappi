import mongoose from "mongoose";

const courierSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true,
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        fee: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true,
});


export default mongoose.model("Courier", courierSchema);
