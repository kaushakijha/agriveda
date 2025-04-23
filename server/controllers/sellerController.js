const Seller = require("../models/sellerSchema");
const { getPlatformStatistics } = require("../services/statisticsService");

const registerSeller = async (req, res) => {
  try {
    const { email, password, name, phone, address } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ error: "Seller already exists" });
    }

    // Create new seller
    const seller = new Seller({
      email,
      password,
      name,
      phone,
      address,
    });

    // Save seller to database
    await seller.save();

    // Get updated statistics
    const statistics = await getPlatformStatistics();

    res.status(201).json({
      message: "Seller registered successfully",
      seller,
      statistics,
    });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ error: "Failed to register seller" });
  }
};

module.exports = {
  registerSeller,
};
