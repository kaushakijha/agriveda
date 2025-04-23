const { cropPredictorServices } = require("../services/cropPredictorServices");
const {
  diseasePredictorServices,
} = require("../services/diseasePredictorServices");
const weatherServices = require("../services/weatherServices");

// Crop Prediction
const predictCrops = async (req, res) => {
  try {
    const { soil, altitude, temperature, humidity, rainfall } = req.query;

    // Validate required parameters
    if (!soil || !altitude || !temperature || !humidity || !rainfall) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    // Convert and validate numeric parameters
    const altitudeNum = parseFloat(altitude);
    const temperatureNum = parseFloat(temperature);
    const humidityNum = parseFloat(humidity);
    const rainfallNum = parseFloat(rainfall);

    if (
      isNaN(altitudeNum) ||
      isNaN(temperatureNum) ||
      isNaN(humidityNum) ||
      isNaN(rainfallNum)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid numeric parameters",
      });
    }

    // Validate parameter ranges
    if (altitudeNum < 0 || altitudeNum > 10) {
      return res.status(400).json({
        success: false,
        message: "Altitude must be between 0 and 10 km",
      });
    }

    if (temperatureNum < -50 || temperatureNum > 50) {
      return res.status(400).json({
        success: false,
        message: "Temperature must be between -50 and 50°C",
      });
    }

    if (humidityNum < 0 || humidityNum > 100) {
      return res.status(400).json({
        success: false,
        message: "Humidity must be between 0 and 100%",
      });
    }

    if (rainfallNum < 0 || rainfallNum > 1000) {
      return res.status(400).json({
        success: false,
        message: "Rainfall must be between 0 and 1000 mm",
      });
    }

    // Get prediction from Gemini AI
    const result = await cropPredictorServices(
      soil,
      altitudeNum,
      temperatureNum,
      humidityNum,
      rainfallNum
    );

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error("Error in crop prediction:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate crop prediction. Please try again later.",
    });
  }
};

// Plant Disease Detection
const detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const result = await diseasePredictorServices(req.file.buffer);

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error("Error in disease detection:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze the plant image. Please try again later.",
    });
  }
};

const getWeatherRecommendations = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    console.log("Getting weather recommendations for:", location);
    const result = await weatherServices.getWeatherRecommendations(location);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Weather controller error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  predictCrops,
  detectDisease,
  getWeatherRecommendations,
};
