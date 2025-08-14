import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, max: 10 },
    note: { type: String },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
}, { timestamps: true });


OrderSchema.index({ name: 'text', number: 'text' });
OrderSchema.index({ productID: 'text' });



export default mongoose.model('Order', OrderSchema);