const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const { getPlatformStatistics } = require("../services/statisticsService");
const { createOrder } = require("../services/razorpayService");

// Add Order
const addOrder = async (req, res) => {
  try {
    const { orders, totalAmount } = req.body;
    const userId = req.user?._id || req.body.userId;

    if (!Array.isArray(orders)) {
      return res.status(400).json({ error: "Orders must be an array" });
    }

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Create Razorpay order
    const razorpayOrder = await createOrder(totalAmount);

    // Add userId and Razorpay orderId to each order
    const ordersWithUserId = orders.map(order => ({
      ...order,
      userId,
      razorpayOrderId: razorpayOrder.id,
    }));

    // Save orders
    const savedOrders = await Order.insertMany(ordersWithUserId);

    // Update product stocks
    for (const order of ordersWithUserId) {
      await Product.findByIdAndUpdate(
        order.productId,
        { $inc: { quantity: -order.orderQty } },
        { new: true }
      );
    }

    // Get updated statistics
    const statistics = await getPlatformStatistics();

    res.status(201).json({
      message: "Orders placed successfully",
      orders: savedOrders,
      razorpayOrder,
      statistics,
    });
  } catch (error) {
    console.error("Error placing orders:", error);
    res.status(500).json({ error: "Failed to place orders" });
  }
};

// Retrieve Order by Seller ID
const showOrdersBySeller = async (req, res) => {
  try {
    let data = await Order.find({ sellerId: req.sellerId })
      .populate({
        path: "productId",
        select: "image category name measuringUnit pricePerUnit",
      })
      .populate({ path: "userId", select: "name email contact" })
      .lean();

    console.log(data);

    data = data
      .filter((order) => order.productId)
      .filter(
        (order) =>
          order.orderLocation.coordinates[0] &&
          order.orderLocation.coordinates[1]
      )
      .map((order) => {
        const totalPrice = order.orderQty * order.productId?.pricePerUnit;
        return { ...order, totalAmount: totalPrice };
      });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Get updated statistics
    const statistics = await getPlatformStatistics();

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
      statistics,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

module.exports = {
  addOrder,
  showOrdersBySeller,
  updateOrderStatus,
};
