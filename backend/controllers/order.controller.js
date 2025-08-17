import Order from "../models/order.model.js";
import Product from "../models/product.model.js";


export const createOrder = async (req, res) => {

    const { number, productID, size } = req.body;
    try {

        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        const orderExists = await Order.findOne({ number, productID, size, status: "pending" });
        if (orderExists) {
            return res.status(400).json({ error: "Order already exists" });
        }

        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).populate({
            path: "productID",
            select: "primaryImage",
        })
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate({
            path: "productID",
            select: "-description -__v -variants -categories",
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
