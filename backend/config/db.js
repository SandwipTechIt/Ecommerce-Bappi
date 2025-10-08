// const URL = "mongodb://localhost:27017/Ecommerce";
const URL = "mongodb://mdshahid:MDshahid7384%40@163.227.239.104:27017/Ecommerce?authSource=admin"; // for VPS
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // await mongoose.connect(URL);
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin' // <-- Add this if your user is in the 'admin' database
        })
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
