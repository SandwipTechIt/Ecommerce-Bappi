import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Statics from "../models/statics.model.js";
import Transaction from "../models/transaction.model.js";
import { getImageUrl } from "../utils/imageUtils.js";

export const createOrder = async (req, res) => {
  const { number, productID, size } = req.body;
  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const orderExists = await Order.findOne({
      number,
      productID,
      size,
      status: "pending",
    });
    if (orderExists) {
      return res.status(400).json({ error: "Order already exists" });
    }

    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate({
      path: "productID",
      select: "primaryImage",
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const ordersWithImageUrls = orders.map((order) => ({
      ...order.toObject(),
      primaryImage: getImageUrl(order.productID.primaryImage, baseUrl),
    }));
    res.status(200).json(ordersWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "productID",
      select: "-description -__v -variants -categories",
    });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const orderWithImageUrl = {
      ...order.toObject(),
      primaryImage: getImageUrl(order.productID.primaryImage, baseUrl),
    };
    res.status(200).json(orderWithImageUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({
      path: "productID",
      select: "name discount",
    });

    console.log(order);

    if (order?.status === "completed") {
      const quantity = Number(order.quantity);
      const totalPrice = Number(order.productID.discount) * quantity;
      await Transaction.create({
        title: order.productID.name,
        amount: totalPrice,
        type: "income",
      });
      await Statics.findOneAndUpdate(
        {},
        {
          $inc: {
            amount: totalPrice,
            order: quantity,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }
    if (order?.status === "pending" || order?.status === "cancelled") {
      const quantity = Number(order.quantity);
      const totalPrice = Number(order.productID.discount) * quantity;
      await Transaction.create({
        title: order.productID.name + " " + order.status,
        amount: totalPrice,
        type: "expense",
      });
      await Statics.findOneAndUpdate(
        {},
        {
          $dec: {
            amount: totalPrice,
            order: quantity,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
