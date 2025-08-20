import mongoose from "mongoose";

const staticSchema = new mongoose.Schema({
  amount: { type: Number, required: true, default: 0 },
  order: { type: Number, required: true, default: 0 },
});

export default mongoose.model("Statics", staticSchema);
