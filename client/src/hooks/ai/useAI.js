import { useState } from "react";
import useHttpClient from "../api/useHttpClient";
import { CROP_PREDICTOR } from "../../constants/apiEndpoints";
import { notify } from "../../utils/helper/notification";
import axios from "axios";

export const useAI = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loading, setLoading] = useState(false);

  const predictCrops = async (formData) => {
    try {
      const resp = await sendRequest(
        CROP_PREDICTOR(
          formData.soil,
          formData.altitude,
          formData.temperature,
          formData.humidity,
          formData.rainfall
        ),
        "GET",
        null,
        null,
        false
      );

      if (!resp.data.success) {
        notify(resp.data.message, "error");
        return "";
      }

      return resp.data.message;
    } catch (error) {
      console.error("Error in crop prediction:", error);
      notify(
        "Failed to generate crop prediction. Please try again later.",
        "error"
      );
      return "";
    }
  };

  const getWeatherRecommendations = async (location) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/ai/weather`, {
        location,
      });
      return response.data;
    } catch (error) {
      notify(
        error.response?.data?.message ||
          "Failed to get weather recommendations",
        "error"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getWeatherRecommendations,
    isLoading,
    predictCrops,
  };
};
