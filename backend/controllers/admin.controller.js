import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const loginAdmin = async (req, res) => {

    console.log(req.body);
    

    try {
        const admin = await Admin.findOne({ name: req.body.name });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        if (admin.password !== req.body.password) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // const token = jwt.sign({ id: admin._id }, "secret", { expiresIn: "1h" });
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //     maxAge: 60 * 60 * 1000
        // });
        res.status(200).json(admin);
       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

