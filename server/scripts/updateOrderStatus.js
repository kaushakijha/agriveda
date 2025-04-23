const mongoose = require("mongoose");
const Order = require("../models/orderSchema");

const MONGODB_URI =
  "MONGO_DB_URL =mongodb+srv://kaushakijha27:PzNrgqDfB49hfqTM@cluster0.kutrz8y.mongodb.net/";

async function updateOrderStatus() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    const result = await Order.updateMany(
      { status: { $exists: false } },
      { $set: { status: "completed" } }
    );

    console.log(`Updated ${result.modifiedCount} orders with status field`);
  } catch (error) {
    console.error("Error updating order status:", error);
  } finally {
    await mongoose.connection.close();
  }
}

updateOrderStatus();
