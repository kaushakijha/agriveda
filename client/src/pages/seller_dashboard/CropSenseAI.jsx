import React, { useState } from "react";
import { useAI } from "../../hooks/ai/useAI";
import { notify } from "../../utils/helper/notification";
import { motion } from "framer-motion";

const CropSenseAI = () => {
  const [formData, setFormData] = useState({
    soil: "",
    altitude: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const { predictCrops } = useAI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await predictCrops(formData);
      setPrediction(result);
      notify("Crop prediction generated successfully", "success");
    } catch (error) {
      notify(error.message || "Failed to generate prediction", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            CropSense AI Assistant
          </h1>
          <p className="text-gray-600 mb-6">
            Get personalized crop recommendations based on your location's
            conditions
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Soil Type</label>
                <input
                  type="text"
                  name="soil"
                  value={formData.soil}
                  onChange={handleChange}
                  placeholder="Enter soil type"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Altitude (m)</label>
                <input
                  type="number"
                  name="altitude"
                  value={formData.altitude}
                  onChange={handleChange}
                  placeholder="Enter altitude"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Enter temperature"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Humidity (%)</label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="Enter humidity"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="Enter rainfall"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                "Generate Prediction"
              )}
            </button>
          </form>

          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-green-50 rounded-xl"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Recommended Crops
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{prediction}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CropSenseAI;
