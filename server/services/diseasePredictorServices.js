const axios = require("axios");

async function diseasePredictorServices(imageBuffer) {
  try {
    // Convert image buffer to base64
    const base64Image = imageBuffer.toString("base64");

    const prompt = `Analyze this plant image and provide:
    1. The disease affecting the plant (if any)
    2. Symptoms visible in the image
    3. Causes of the disease
    4. Treatment recommendations
    5. Preventive measures
    6. Additional notes or warnings

    Please provide detailed, practical advice that a farmer can implement.`;

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD6JHfYuqBegzN3xEGUo1mY0gj7F-m8VOk`,
      method: "post",
      data: {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      },
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in disease prediction:", error);
    throw new Error("Failed to analyze the plant image");
  }
}

module.exports = {
  diseasePredictorServices,
};
