// src/pages/SettingsPage.jsx
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SettingsPage = () => {
  const handleToast = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 py-10">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-10 border-b-4 border-red-300 pb-3">
          <span className="text-black">User </span>
          <span className="text-red-600">Settings</span>
        </h1>

        {/* General Preferences */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">General Preferences</h2>
          <div className="space-y-4 text-gray-800">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Enable product recommendations")}
              />
              <span>Enable product recommendations</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Auto-apply coupons and offers")}
              />
              <span>Auto-apply coupons and offers</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Allow public reviews on purchases")}
              />
              <span>Allow public reviews on purchases</span>
            </label>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Notification Preferences</h2>
          <div className="space-y-4 text-gray-800">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Email me about order updates")}
              />
              <span>Email me about order updates</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Send SMS for promotions")}
              />
              <span>Send SMS for promotions</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Notify me when new products are available")}
              />
              <span>Notify me when new products are available</span>
            </label>
          </div>
        </div>

        {/* Payment and Delivery Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Payment & Delivery</h2>
          <div className="space-y-4 text-gray-800">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Use UPI as preferred payment method")}
              />
              <span>Use UPI as preferred payment method</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Save address for faster checkout")}
              />
              <span>Save address for faster checkout</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="accent-red-500 w-5 h-5"
                onChange={() => handleToast("Enable COD availability alerts")}
              />
              <span>Enable COD availability alerts</span>
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Terms & Conditions</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            By using this platform, you agree to abide by our marketplace policies, agricultural regulations,
            and fair trade principles. All transactions should be conducted legally and transparently.
            The platform holds the right to suspend or restrict accounts violating policies. Buyers are
            encouraged to purchase responsibly and leave constructive feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
