const URL = "mongodb://localhost:27017/Ecommerce";
// const URL = "mongodb://163.227.239.242:27017/shorifArtDb";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
