import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import {
  cleanupUploadedFiles,
  deleteMultipleImages,
  getImageUrl,
} from "../utils/imageUtils.js";


function getProductsData() {
  const products = [];
  const timestamp = Date.now();
  
  for (let i = 1; i <= 11; i++) {
    // Create multiple images array for better handling
    const additionalImages = [];
    
    // Add second image if it exists
    if (i <= 11) { // Assuming you have images up to 11
      additionalImages.push(`${i} (2).jpg`);
    }
    
    products.push({
      "name": `Breathable Sports Soft Sole Shoe ${i}`,
      "description": "Crafted with a lightweight, breathable upper, this shoe keeps your feet cool and dry, no matter how intense your workout gets. The flexible, soft sole provides a cushioned feel and excellent shock absorption, reducing impact on your joints and letting you move with natural ease. Whether you're running, training, or just on your feet all day, you'll experience superior comfort and support.",
      "category": "Casual",
      "price": 2800,
      "discount": 2000,
      "isStock": true,
      "stock": 0,
      "variants": [
        {
          "size": 34,
          "stock": true,
        },
        {
          "size": 35,
          "stock": true,
        },
        {
          "size": 36,
          "stock": true,
        },
        {
          "size": 37,
          "stock": true,
        }
      ],
      "primaryImage": `${i} (1).jpg`,
      "images": additionalImages,
      "status": "limited stock",
      "slug": `breathable-sports-soft-sole-shoe-${i}-${timestamp}`
    });
  }
  return products;
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, discount, variants, status, isStock, stock } =
      req.body;

    // Validate required fields
    if (!name || !discount) {
      // Clean up uploaded files if validation fails
      if (req.files) {
        await cleanupUploadedFiles(req.files);
      }
      return res.status(400).json({
        success: false,
        message: "Name and discount price are required fields",
      });
    }

    // Check if primary image is uploaded
    if (
      !req.files ||
      !req.files.primaryImage ||
      req.files.primaryImage.length === 0
    ) {
      // Clean up any uploaded additional images
      if (req.files) {
        await cleanupUploadedFiles(req.files);
      }
      return res.status(400).json({
        success: false,
        message: "Primary image is required",
      });
    }

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      price: price ? parseInt(price) : 0,
      discount: parseInt(discount),
      isStock: isStock !== undefined ? isStock : true,
      stock: stock ? parseInt(stock) : 0,
      status: status,
    };

    // Handle variants if provided
    if (variants) {
      try {
        productData.variants =
          typeof variants === "string" ? JSON.parse(variants) : variants;
      } catch (error) {
        await cleanupUploadedFiles(req.files);
        return res.status(400).json({
          success: false,
          message: "Invalid variants format",
        });
      }
    }

    // Set primary image
    productData.primaryImage = req.files.primaryImage[0].filename;

    // Set additional images if provided
    if (req.files.images && req.files.images.length > 0) {
      productData.images = req.files.images.map((file) => file.filename);
    }

    // Create product in database
    const product = await Product.create(productData);

    // Prepare response with full image URLs
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const responseProduct = {
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      images: product.images.map((img) => getImageUrl(img, baseUrl)),
    };
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: responseProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // Clean up uploaded files if database operation fails
    if (req.files) {
      await cleanupUploadedFiles(req.files);
    }

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product first to get image filenames
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const OrderDlete = await Order.deleteMany({ productID: id });
    // Collect all image filenames for deletion
    const imagesToDelete = [];
    if (product.primaryImage) {
      imagesToDelete.push(product.primaryImage);
    }
    if (product.images && product.images.length > 0) {
      imagesToDelete.push(...product.images);
    }

    // Delete the product from database
    await Product.findByIdAndDelete(id);

    // Delete associated images
    if (imagesToDelete.length > 0) {
      const deleteResult = await deleteMultipleImages(imagesToDelete);
    }

    res.status(200).json({
      success: true,
      message: "Product and associated images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // // Check if sample products already exist
    // const existingProductsCount = await Product.countDocuments();
    
    // // Only insert sample data if no products exist
    // if (existingProductsCount === 0) {
    //   const productsData = getProductsData();
    //   await Product.insertMany(productsData);
    // }

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select("-images -__v -variants -categories -updatedAt");

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      // images: product.images.map(img => getImageUrl(img, baseUrl))
    }));

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};


export const stockOutProducts = async (req, res) => {
  try {
    const products = await Product.find({ isStock: false })
      .sort({ createdAt: -1 })
      .select("-images -__v -variants -categories -updatedAt");

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      // images: product.images.map(img => getImageUrl(img, baseUrl))
    }));

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const getAllProductsWithDetails = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select("-__v -updatedAt");

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      images: product.images.map((img) => getImageUrl(img, baseUrl)),
    }));

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
export const getAllProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id })
      .sort({ createdAt: -1 })
      .select("-__v -updatedAt");

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      images: product.images.map((img) => getImageUrl(img, baseUrl)),
    }));

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      price,
      discount,
      variants,
      status,
      imagesToDelete,
      isStock,
      stock,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      if (req.files) await cleanupUploadedFiles(req.files);
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 1. Handle image deletions
    const parsedImagesToDelete = imagesToDelete
      ? JSON.parse(imagesToDelete)
      : [];
    if (parsedImagesToDelete.length > 0) {
      const filenamesToDelete = parsedImagesToDelete.map((url) =>
        url.split("/").pop()
      );
      await deleteMultipleImages(filenamesToDelete);

      // Remove from product model
      if (filenamesToDelete.includes(product.primaryImage)) {
        product.primaryImage = null;
      }
      product.images = product.images.filter(
        (img) => !filenamesToDelete.includes(img)
      );
    }

    // 2. Handle new image uploads
    if (req.files) {
      // New primary image
      if (req.files.primaryImage && req.files.primaryImage[0]) {
        // If there was an old primary image, delete it
        if (product.primaryImage) {
          await deleteMultipleImages([product.primaryImage]);
        }
        product.primaryImage = req.files.primaryImage[0].filename;
      }
      // New additional images
      if (req.files.images && req.files.images.length > 0) {
        const newImageFilenames = req.files.images.map((file) => file.filename);
        product.images.push(...newImageFilenames);
      }
    }

    // 3. Update other product data
    product.name = name || product.name;
    product.description = description;
    product.category = category || product.category;
    product.price = parseInt(price) || "";
    product.discount = discount ? parseInt(discount) : product.discount;
    product.status = status ;
    product.isStock = isStock !== undefined ? isStock : product.isStock;
    product.stock = stock ? parseInt(stock) : product.stock;
    if (variants) {
      product.variants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
    }


    // Save the updated product
    const updatedProduct = await product.save();

    // Prepare response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const responseProduct = {
      ...updatedProduct.toObject(),
      primaryImage: getImageUrl(updatedProduct.primaryImage, baseUrl),
      images: updatedProduct.images.map((img) => getImageUrl(img, baseUrl)),
    };

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: responseProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    if (req.files) await cleanupUploadedFiles(req.files);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productWithImageUrls = {
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      images: product.images.map((img) => getImageUrl(img, baseUrl)),
    };

    res.status(200).json({
      success: true,
      data: productWithImageUrls,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productWithImageUrls = {
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      images: product.images.map((img) => getImageUrl(img, baseUrl)),
    };

    res.status(200).json(productWithImageUrls);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export const getAllProductWithOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("name price discount primaryImage");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const orders = await Order.find({ productID: id });
    const productWithOrders = {
      ...product.toObject(),
      orders,
    };
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productWithImageUrls = {
      ...productWithOrders,
      primaryImage: getImageUrl(productWithOrders.primaryImage, baseUrl),
    };
    res.status(200).json(productWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};



// export const getTopSellingProducts = async (req, res) => {
//   try {
//     /* ------------------------------------------------------------------ */
//     /* 1. Aggregation pipeline – count sold units per product             */
//     /* ------------------------------------------------------------------ */
//     const topSold = await Order.aggregate([
//       { $match: { status: { $in: ["pending", "completed"] } } }, // cancelled orders ignored
//       { $group: { _id: "$productID", totalSold: { $sum: "$quantity" } } },
//       { $sort: { totalSold: -1 } },
//       { $limit: 10 },
//       {
//         $lookup: {
//           from: "products",
//           localField: "_id",
//           foreignField: "_id",
//           as: "product",
//         },
//       },
//       { $unwind: "$product" },
//       { $replaceRoot: { newRoot: "$product" } },
//     ]);

//     /* ------------------------------------------------------------------ */
//     /* 2. If we have sales → respond                                      */
//     /* ------------------------------------------------------------------ */
//     if (topSold.length) return res.status(200).json({ success: true, data: topSold });

//     /* ------------------------------------------------------------------ */
//     /* 3. No sales yet → random 10 products                               */
//     /* ------------------------------------------------------------------ */
//     const randomProducts = await Product.aggregate([{ $sample: { size: 10 } }]);

//     return res.status(200).json({
//       success: true,
//       message: "No sales yet – returning random products",
//       data: randomProducts,
//     });
//   } catch (err) {
//     console.error("getTopSellingProducts:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching products",
//     });
//   }
// };

export const getProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .select("-images -__v -variants -categories -updatedAt");

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      // images: product.images.map(img => getImageUrl(img, baseUrl))
    }));

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
export const getProductsWithDetails = async (req, res) => {
  try {
    const products = await Product.find()
      .select("-__v -updatedAt");

    // Add full image URLs to response
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      images: product.images.map((img) => getImageUrl(img, baseUrl)),
    }));

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};


export const getTopSellingProducts = async (req, res) => {
  try {
    /* 1. Aggregate sold quantities */
    const topSold = await Order.aggregate([
      { $match: { status: { $in: ["pending", "completed"] } } },
      { $group: { _id: "$productID", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          pipeline: [
            { $project: { images: 0, __v: 0, variants: 0, updatedAt: 0 } }
          ],
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $replaceRoot: { newRoot: "$product" } },
    ]);

   
    const baseUrl = `${req.protocol}://${req.get("host")}`;


    // /* 2. Has sales → respond */
    if (topSold.length > 4) {
      const topSoldWithImageUrls = topSold.map((product) => ({
        ...product,
        primaryImage: getImageUrl(product.primaryImage, baseUrl),
        // images: product.images.map(img => getImageUrl(img, baseUrl))
      }));
      return res.status(200).json({ success: true, data: topSoldWithImageUrls });
    }

    // /* 3. No sales → random 10 products */
    const randomProducts = await Product.aggregate([
      { $sample: { size: 10 } },
      { $project: { images: 0, __v: 0, variants: 0, updatedAt: 0 } }
    ]);

    // const baseUrl = `${req.protocol}://${req.get("host")}`;
    const randomProductsWithImageUrls = randomProducts.map((product) => ({
      ...product,
      primaryImage: getImageUrl(product.primaryImage, baseUrl),
      // images: product.images.map(img => getImageUrl(img, baseUrl))
    }));
    return res.status(200).json({
      success: true,
      data: randomProductsWithImageUrls,
    });
  } catch (err) {
    console.error("getTopSellingProducts:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};
export const latestProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .select("-images -__v -variants -categories -updatedAt")
            .limit(10);

        // Add full image URLs to response
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const productsWithImageUrls = products.map((product) => ({
            ...product.toObject(),
            primaryImage: getImageUrl(product.primaryImage, baseUrl),
            // images: product.images.map(img => getImageUrl(img, baseUrl))
        }));

        res.status(200).json(productsWithImageUrls);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};
    