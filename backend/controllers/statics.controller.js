import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";
import Statics from "../models/statics.model.js";


async function getTodaysOrderCount() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const count = await OrderModel.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    return count;
  } catch (error) {
    console.error('Error fetching today\'s order count:', error);
    throw error; // Or handle as needed
  }
}


const getTotalCompletedOrdersSubtotal = async () => {
  try {
    const result = await OrderModel.aggregate([
      {
        $match: {
          status: "completed"
        }
      },
      {
        $group: {
          _id: null,
          totalSubtotal: { $sum: "$subtotal" }
        }
      }
    ]);
    return result.length > 0 ? result[0].totalSubtotal : 0;
  } catch (error) {
    console.error('Error calculating total subtotal:', error);
    throw error;
  }
};


export const getStaticData = async (req, res) => {
  try {
    const totalProducts = await ProductModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();

    const pendingOrders = await OrderModel.countDocuments({
      status: "pending",
    });
    const completedOrders = await OrderModel.countDocuments({
      status: "completed",
    });
    const cancelledOrders = await OrderModel.countDocuments({
      status: "cancelled",
    });
    const statics = await Statics.findOne();

    // Get last 12 months orders count
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const monthlyOrders = await OrderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: twelveMonthsAgo,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Month names array
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format the results and fill missing months with 0
    const result = [];
    const currentDate = new Date(twelveMonthsAgo);

    for (let i = 0; i < 12; i++) {
      const year = currentDate.getFullYear();
      const monthIndex = currentDate.getMonth(); // 0-11

      const monthData = monthlyOrders.find(
        (item) => item._id.year === year && item._id.month === monthIndex + 1
      );

      result.push({
        month: `${monthNames[monthIndex]} ${year}`,
        count: monthData ? monthData.count : 0,
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }


    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      todayOrders: await getTodaysOrderCount(),
      lifetimeOrder: statics?.order || 0,
      lifetimeRevenue: await getTotalCompletedOrdersSubtotal(),
      monthlyOrders: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch static data" });
  }
};



export const getAllStatics = async (req, res) => {
  try {
    const statics = await Statics.find();
    res.json(statics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch static data" });
  }
};
