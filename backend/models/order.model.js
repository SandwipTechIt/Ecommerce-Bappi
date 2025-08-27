import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, max: 10 },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    
    // Courier information
    courier: {
        id: { type: String },
        name: { type: String },
        fee: { type: Number, default: 0 }
    },
    
    // Coupon information
    coupon: {
        code: { type: String },
        discountType: { type: String, enum: ['percentage', 'fixed'] },
        discountValue: { type: Number },
        discountAmount: { type: Number, default: 0 }
    },
    
    // Pricing breakdown
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    
    note: { type: String },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
}, { timestamps: true });

OrderSchema.index({ name: 'text', number: 'text' });
OrderSchema.index({ productID: 'text' });



export default mongoose.model('Order', OrderSchema);