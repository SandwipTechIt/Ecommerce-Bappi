import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import connectDB from "./config/db.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the images directory
app.use("/images", express.static("images"));

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

import productRoutes from "./routes/product.route.js";
import adminRoutes from "./routes/admin.routes.js";
import orderRoutes from "./routes/order.routes.js";
import staticsRoutes from "./routes/statics.routes.js";

app.use(productRoutes);
app.use(adminRoutes);
app.use(orderRoutes);
app.use(staticsRoutes);

app.get("/test", (req, res) => {
  console.log("Test");
  try {
    // res.status(200).json({
    //     success: true,
    //     message: "Test passed",
    //     data: "Hello, Shorif Art Backend!",
    // });
    throw new Error("Test failed");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
