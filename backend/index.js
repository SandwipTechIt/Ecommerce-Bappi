import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import connectDB from "./config/db.js";
import cors from "cors";

app.set("trust proxy", true);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
import stocksRoutes from "./routes/stocks.routes.js";
import transectionRoutes from "./routes/transection.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import courierRoutes from "./routes/courier.routes.js";
import messageRoutes from "./routes/message.routes.js";
import sloganRoutes from "./routes/slogan.routes.js";
import reviewRoutes from "./routes/review.route.js";
import fbqRoutes from "./routes/fbq.routes.js";

app.use(productRoutes);
app.use(adminRoutes);
app.use(orderRoutes);
app.use(staticsRoutes);
app.use(stocksRoutes);
app.use(transectionRoutes);
app.use(categoryRoutes);
app.use(couponRoutes);
app.use(courierRoutes);
app.use(messageRoutes);
app.use(sloganRoutes);
app.use(reviewRoutes);
app.use(fbqRoutes);

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
