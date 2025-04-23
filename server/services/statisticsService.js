const Product = require("../models/productSchema");
const Order = require("../models/orderSchema");
const Seller = require("../models/sellerSchema");

const getPlatformStatistics = async () => {
  try {
    // Get total number of farmers (sellers)
    const farmersConnected = await Seller.countDocuments();
    console.log("Farmers connected:", farmersConnected);

    // Get all orders and log their status
    const allOrders = await Order.find({}, { status: 1 });
    console.log(
      "All orders:",
      allOrders.map((order) => order.status)
    );

    // Get total number of successful transactions (completed orders)
    const successfulTransactions = await Order.countDocuments({
      status: "completed",
    });
    console.log("Successful transactions:", successfulTransactions);

    // Get all products and their locations
    const allProducts = await Product.find({}, { "location.city": 1 });
    console.log(
      "All products with cities:",
      allProducts.map((p) => p.location?.city)
    );

    // Get unique cities covered by products
    const citiesCovered = await Product.distinct("location.city");
    console.log("Unique cities:", citiesCovered);

    // If any of the values are undefined or null, set them to 0
    const statistics = {
      farmersConnected: farmersConnected || 0,
      successfulTransactions: successfulTransactions || 0,
      citiesCovered: citiesCovered ? citiesCovered.length : 0,
    };

    console.log("Final statistics:", statistics);
    return statistics;
  } catch (error) {
    console.error("Error fetching platform statistics:", error);
    // Return default values in case of error
    return {
      farmersConnected: 0,
      successfulTransactions: 0,
      citiesCovered: 0,
    };
  }
};

module.exports = {
  getPlatformStatistics,
};
