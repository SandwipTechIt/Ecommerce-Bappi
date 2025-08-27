import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {
    try {
        const { name, subject, number, email, message } = req.body;

        const newMessage = await Message.create({
            name,
            subject,
            number,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create message",
            error: error.message
        });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
            error: error.message
        });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        res.status(200).json({
            success: true,
            message: "Message fetched successfully",
            data: message
        });
    } catch (error) {
        console.error("Error fetching message:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch message",
            error: error.message
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Message deleted successfully",
            data: deletedMessage
        });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete message",
            error: error.message
        });
    }
};
