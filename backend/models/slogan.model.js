import mongoose from "mongoose";

const sloganSchema = new mongoose.Schema({
    image: { type: String },
    text: { type: String },
    description: { type: String },
});

export default mongoose.model("Slogan", sloganSchema);
