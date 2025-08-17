import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    stock: { type: Number, required: true, min: 0 }
})

export default mongoose.model("Stock", stockSchema);
