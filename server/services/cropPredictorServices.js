const axios = require("axios");

async function cropPredictorServices(
  soil,
  altitude,
  temperature,
  humidity,
  rainfall
) {
  try {
    const prompt = `As an agricultural expert, analyze these environmental factors and suggest suitable crops:
    - Soil Type: ${soil}
    - Altitude: ${altitude} km
    - Temperature: ${temperature}°C
    - Humidity: ${humidity}%
    - Rainfall: ${rainfall} mm

    Please provide:
    1. List of suitable crops for these conditions
    2. Brief explanation for each crop's suitability
    3. Any special considerations or requirements
    4. Potential challenges and solutions`;

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD6JHfYuqBegzN3xEGUo1mY0gj7F-m8VOk`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: prompt }] }],
      },
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in crop prediction:", error);
    throw new Error("Failed to generate crop prediction");
  }
}

module.exports = {
  cropPredictorServices,
};
