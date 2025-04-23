const Product = require("../models/productSchema");
const Review = require("../models/reviewSchema");
const { uploadImageToCloudinary } = require("../services/cloudinaryServices");
const { calculateDistance } = require("../services/locationServices");
const Order = require("../models/orderSchema");
const Seller = require("../models/sellerSchema");
const { getPlatformStatistics } = require("../services/statisticsService");

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      brand,
      name,
      category,
      description,
      pricePerUnit,
      measuringUnit,
      minimumOrderQuantity,
      deliveryRadius,
      location,
      quantity,
    } = req.body;

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(req.file);

    // Create new product
    const product = new Product({
      image: imageUrl,
      brand,
      name,
      category,
      description,
      pricePerUnit,
      measuringUnit,
      minimumOrderQuantity,
      deliveryRadius,
      location,
      quantity,
      sellerId: req.sellerId,
    });

    // Save product
    await product.save();

    // Get updated statistics
    const statistics = await getPlatformStatistics();

    res.status(201).json({
      message: "Product added successfully",
      product,
      statistics,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get Product Data By Category
const getProductDataByCategory = async (req, res) => {
  try {
    let page = req.query.page;
    let products_per_page = req.query.products_per_page;

    let skip = (page - 1) * products_per_page;

    const totalProduct = await Product.countDocuments({
      category: req.params.category,
    });

    const hasMore = totalProduct > page * products_per_page ? true : false;

    let products =
      (await Product.find({ category: req.params.category })
        .sort({ date: -1 })
        .skip(skip)
        .limit(products_per_page)
        .select(
          "name image brand measuringUnit pricePerUnit minimumOrderQuantity location sellerId deliveryRadius quantity"
        )
        .lean()) || [];

    let deliverableProducts = [];
    let nonDeliverableProducts = [];

    products.map((product) => {
      let userCoordinates = [
        parseFloat(req.params.lng),
        parseFloat(req.params.lat),
      ];

      console.log(userCoordinates, product.location.coordinates);

      const distance = calculateDistance(
        userCoordinates,
        product.location.coordinates
      );

      console.log(distance, product.deliveryRadius);

      if (distance <= product.deliveryRadius) {
        deliverableProducts.push(product);
      } else {
        nonDeliverableProducts.push(product);
      }
    });

    res
      .status(200)
      .send({ deliverableProducts, nonDeliverableProducts, hasMore });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Product Data By ID
const getProductDataById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId)
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location.coordinates sellerId"
      )
      .lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Get Product Data By Seller ID
const getProductDataBySellerId = async (req, res) => {
  try {
    let data = await Product.find({ sellerId: req.sellerId })
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location.coordinates sellerId deliveryRadius category shelfLife quantity"
      )
      .lean();

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    let data = await Product.findByIdAndDelete(req.params.productId);
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const uploadedImage = req.file;

    if (uploadedImage) {
      try {
        let cloudRes = await uploadImageToCloudinary(uploadedImage.buffer);
        req.body.image = cloudRes.secure_url;
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message:
            "There was a problem communicating with Cloudinary during the image upload.",
        });
      }
    }

    let data = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Get Product Stocks By ID
const getProductStocksById = async (req, res) => {
  try {
    let data = await Product.findById(req.params.productId)
      .select("quantity")
      .lean();

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Get Product Dashboard Data
const getProductDashboardData = async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId)
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location.coordinates sellerId"
      )
      .lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let reviews = await Review.find({ productId: req.params.productId })
      .select("stars heading description date")
      .lean();

    res.status(200).send({ ...product, reviews });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Get Main Product Data By ID
const getMainProductDataById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId)
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location.coordinates sellerId"
      )
      .lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = {
  addProduct,
  getProductDataByCategory,
  getProductDataById,
  getProductDataBySellerId,
  deleteProduct,
  updateProduct,
  getProductStocksById,
  getProductDashboardData,
  getMainProductDataById,
};
