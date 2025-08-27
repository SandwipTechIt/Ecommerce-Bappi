import Courier from "../models/courier.model.js";


// assumes Courier is a Mongoose model already imported
export const createCourier = async (req, res) => {
    const { isActive, items } = req.body;
    let backup = null;
  
    try {
      // Remove the existing courier doc (there's only one) and keep it
      backup = await Courier.findOneAndDelete({});
  
      // Try to create the new courier
      const newCourier = await Courier.create({ isActive, items });
  
      return res.status(201).json({
        success: true,
        message: "Courier created successfully",
        data: newCourier
      });
    } catch (error) {
      // Creation failed — try to restore the backup
      try {
        if (backup) {
          // convert to plain object if needed
          const doc = typeof backup.toObject === "function" ? backup.toObject() : backup;
          await Courier.create(doc);
        }
      } catch (restoreError) {
        console.error("Failed to restore courier backup:", restoreError);
        return res.status(500).json({
          success: false,
          message: "Failed to create courier and failed to restore previous data.",
          originalError: error.message,
          restoreError: restoreError.message
        });
      }
  
      // Successful restore (or nothing to restore)
      return res.status(500).json({
        success: false,
        message: "Failed to create courier; previous data has been restored.",
        error: error.message
      });
    }
  };
  
export const getCourier = async (req, res) => {
    try {
        const courier = await Courier.findOne();
        
        if (!courier) {
            return res.status(404).json({
                success: false,
                message: "No courier found"
            });
        }
        
        res.status(200).json({
            success: true,
            data: courier
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

export const updateCourier = async (req, res) => {
    try {
        const { isActive, items } = req.body;
        const courier = await Courier.findByIdAndUpdate(
            req.params.id, 
            { isActive, items }, 
            { new: true }
        );
        
        if (!courier) {
            return res.status(404).json({
                success: false,
                message: "Courier not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Courier updated successfully",
            data: courier
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};
