import CouponModel from "../models/coupon.model.js";


export const createCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, isActive } = req.body;
        const coupon = await CouponModel.create({ code, discountType, discountValue, isActive });
        res.status(201).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCoupon = async (req, res) => {
    try {
        const coupons = await CouponModel.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await CouponModel.findById(id);
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, discountType, discountValue, isActive } = req.body;
        const coupon = await CouponModel.findByIdAndUpdate(id, { code, discountType, discountValue, isActive }, { new: true });
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await CouponModel.findByIdAndDelete(id);
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code, subtotal } = req.body;
        
        if (!code || !subtotal) {
            return res.status(400).json({ error: "Coupon code and subtotal are required" });
        }

        const coupon = await CouponModel.findOne({ 
            code: code.toUpperCase(), 
            isActive: true 
        });

        if (!coupon) {
            return res.status(404).json({ error: "Invalid or expired coupon code" });
        }

        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
            discountAmount = (subtotal * coupon.discountValue) / 100;
        } else if (coupon.discountType === 'fixed') {
            discountAmount = Math.min(coupon.discountValue, subtotal);
        }

        res.status(200).json({
            valid: true,
            coupon: {
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                discountAmount: Math.round(discountAmount * 100) / 100
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
