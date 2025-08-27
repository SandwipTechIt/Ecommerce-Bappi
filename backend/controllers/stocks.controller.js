import Product from "../models/product.model.js";
import { getImageUrl } from "../utils/imageUtils.js";



export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Product.find().sort({ createdAt: -1 }).select("name stock primaryImage");

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const stocksWithImageUrls = stocks.map((stock) => ({
      ...stock.toObject(),
      primaryImage: getImageUrl(stock.primaryImage, baseUrl),
    }));
    res.status(200).json(stocksWithImageUrls);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stocks",
      error: error.message,
    });
  }
};
export const getStock = async (req, res) => {
  try {
    const { ID } = req.body;

    // Validate required fields
    if (!ID) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required field",
      });
    }

    // Get stock from database
    const stock = await Stock.findOne({ productID: ID }).populate("productID");

    res.status(200).json(stock);
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock",
      error: error.message,
    });
  }
};

export const updateStock = async (req, res) => {
  const { stock } = req.body;
  console.log(stock);

  try {
    // Update stock in database

    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "No Product Found",
        error: error.message,
      });
    }
    // const newProduct = product;
    // newProduct.stock = stock;
    const stockData = await Product.findByIdAndUpdate(
      req.params.id, // id (string or ObjectId)
      { stock: stock }, // use update operators (avoid full replacement)
      { new: true } // return the updated document
    );

    res.status(200).json(stockData);
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update stock",
      error: error.message,
    });
  }
};


export const deleteStock = async (ID) => {
  try {
    // Validate required fields
    if (!ID) {
      return;
    }

    // Delete stock from database
    const stock = await Stock.deleteOne({ productID: ID }).populate(
      "productID"
    );

    return stock;
  } catch (error) {
    console.error("Error creating stock:", error);
  }
};
