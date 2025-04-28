import React, { useState } from "react";
import Spinner from "../../components/loading/Spinner";
import { FaSyncAlt, FaUpload } from "react-icons/fa";
import useHttpClient from "../../hooks/api/useHttpClient";

const CropDiseaseAI = () => {
  const [prediction, setPrediction] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { sendRequest, isLoading } = useHttpClient();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    console.log("Selected Image: ", selectedImage);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      console.log("FormData: ", formData);

      const response = await sendRequest(
        "/ai/disease",
        "POST",
        formData,
        { "Content-Type": "multipart/form-data" },
        false
      );
      console.log("Response: ", response);

      setPrediction(response.data.message);
    } catch (error) {
      console.error("Error in disease prediction:", error);
      alert("Failed to analyze the image. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      {/* Header Section */}
      <header className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-green-800">
          CropDisease AI
        </h1>
        <p className="text-xl font-light text-green-700">
          AI-powered plant disease detection and treatment recommendations
        </p>
      </header>

      {/* Input Section */}
      <section className="relative z-10 w-full max-w-2xl bg-white text-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-800">
          Upload Plant Image
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Plant Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setPreviewUrl("");
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !selectedImage}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
              isLoading || !selectedImage
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <Spinner width="w-5" color="#ffffff" />
            ) : (
              <>
                <FaSyncAlt className="inline-block mr-2" /> Analyze Disease
              </>
            )}
          </button>
        </form>
      </section>

      {/* Prediction Section */}
      {prediction && (
        <section className="relative z-10 w-full max-w-2xl bg-white text-gray-800 rounded-2xl shadow-md mt-8 p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Disease Analysis:
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {prediction}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default CropDiseaseAI;