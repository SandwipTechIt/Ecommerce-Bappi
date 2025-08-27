import mongoose from "mongoose";

const courierStatusSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true,
    }
});


export default mongoose.model("CourierStatus", courierStatusSchema);
