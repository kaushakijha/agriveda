const axios = require("axios");

const weatherServices = {
  getWeatherRecommendations: async (location) => {
    try {
      console.log("Fetching weather data for location:", location);

      // Get weather data from OpenWeatherMap API
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b0970f75fefd5fee0722fa48ddb44f6e&units=metric`
      );

      if (!weatherResponse.data || !weatherResponse.data.main) {
        throw new Error("Invalid weather data received");
      }

      const weatherData = weatherResponse.data;
      console.log("Weather API response:", weatherData);

      // Construct a detailed prompt for Gemini AI
      const prompt = `As an agricultural expert, analyze the following weather conditions in ${location}:
      - Temperature: ${weatherData.main.temp}°C
      - Humidity: ${weatherData.main.humidity}%
      - Weather: ${weatherData.weather[0].description}
      - Wind Speed: ${weatherData.wind.speed} m/s
      
      Please provide detailed agricultural recommendations including:
      1. Weather Analysis: Current conditions and their impact on crops
      2. Irrigation Schedule: Optimal timing and methods
      3. Fertilizer Recommendations: Types and application timing
      4. Required Minerals: Essential nutrients for current conditions
      5. Additional Tips: Pest control, crop protection, etc.
      
      Format the response as a JSON object with this structure:
      {
        "weather": {
          "temperature": "string",
          "humidity": "string",
          "precipitation": "string",
          "windSpeed": "string"
        },
        "irrigation": {
          "schedule": "string",
          "method": "string",
          "duration": "string"
        },
        "fertilizers": ["string"],
        "minerals": ["string"],
        "recommendations": ["string"]
      }`;

      // Call Gemini AI API with basic version
      const geminiResponse = await axios.post(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyDxQJ8J8J8J8J8J8J8J8J8J8J8J8J8J8", // Replace with your API key
          },
        }
      );

      if (
        !geminiResponse.data ||
        !geminiResponse.data.candidates ||
        !geminiResponse.data.candidates[0]
      ) {
        throw new Error("Invalid response from Gemini AI");
      }

      // Parse and return the response
      const result = JSON.parse(
        geminiResponse.data.candidates[0].content.parts[0].text
      );

      // Add current weather data to the result
      result.currentWeather = {
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
        location: location,
      };

      return result;
    } catch (error) {
      console.error("Weather service error:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });

      if (error.response?.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OpenWeatherMap API key configuration."
        );
      } else if (error.response?.status === 404) {
        throw new Error("Location not found. Please enter a valid city name.");
      } else if (error.response?.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      } else {
        throw new Error(
          `Failed to get weather recommendations: ${error.message}`
        );
      }
    }
  },
};

module.exports = weatherServices;
