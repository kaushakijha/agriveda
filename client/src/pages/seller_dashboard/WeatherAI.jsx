import React, { useState } from "react";
import { useAI } from "../../hooks/ai/useAI";
import { notify } from "../../utils/helper/notification";
import { FaSearch, FaTemperatureHigh, FaWater, FaWind } from "react-icons/fa";
import { motion } from "framer-motion";

const WeatherAI = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const { getWeatherRecommendations } = useAI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      notify("Please enter a location", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await getWeatherRecommendations(location);
      setWeatherData(response);
      notify("Weather analysis completed", "success");
    } catch (error) {
      notify(error.message || "Failed to get weather recommendations", "error");
    } finally {
      setLoading(false);
    }
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
            Weather-Based Agricultural Assistant
          </h1>
          <p className="text-gray-600 mb-6">
            Get personalized weather information and agricultural
            recommendations for your location
          </p>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location (e.g., city, state)"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaSearch />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {weatherData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <FaTemperatureHigh />
                    Weather Conditions
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Temperature:</span>{" "}
                      {weatherData.weather.temperature}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Humidity:</span>{" "}
                      {weatherData.weather.humidity}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Precipitation:</span>{" "}
                      {weatherData.weather.precipitation}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Wind Speed:</span>{" "}
                      {weatherData.weather.windSpeed}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <FaWater />
                    Irrigation Recommendations
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Schedule:</span>{" "}
                      {weatherData.irrigation.schedule}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Method:</span>{" "}
                      {weatherData.irrigation.method}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Duration:</span>{" "}
                      {weatherData.irrigation.duration}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                  Fertilizer & Mineral Recommendations
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Recommended Fertilizers:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {weatherData.fertilizers.map((fertilizer, index) => (
                        <li key={index} className="text-gray-600">
                          {fertilizer}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Required Minerals:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {weatherData.minerals.map((mineral, index) => (
                        <li key={index} className="text-gray-600">
                          {mineral}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-purple-800 mb-4">
                  Additional Recommendations
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {weatherData.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherAI;
