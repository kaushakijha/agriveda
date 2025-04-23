const express = require("express");
const {
  predictCrops,
  detectDisease,
  getWeatherRecommendations,
} = require("../controllers/aiController");
const multer = require("multer");
const weatherServices = require("../services/weatherServices");

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Test route for weather service
router.get("/test-weather", async (req, res) => {
  try {
    const location = "London"; // Test with a known city
    console.log("Testing weather service with location:", location);

    const result = await weatherServices.getWeatherRecommendations(location);
    console.log("Weather test result:", result);

    res.json({
      success: true,
      message: "Weather service test successful",
      data: result,
    });
  } catch (error) {
    console.error("Weather test error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Crop prediction route
router.get("/crop", predictCrops);

// Disease detection route
router.post("/disease", upload.single("image"), detectDisease);

// Weather recommendations route
router.post("/weather", getWeatherRecommendations);

module.exports = router;
