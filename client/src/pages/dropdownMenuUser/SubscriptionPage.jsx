import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message, type) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.success(message);
  } else {
    toast.info(message);
  }
};

const plans = [
  {
    name: "Basic",
    price: "₹199",
    period: "/month",
    features: [
      "Access to general agricultural products",
      "Basic customer support",
      "Limited product browsing",
    ],
    color: "border-gray-300 text-gray-800",
    bgColor: "bg-white",
    amount: 199, // Amount in INR
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: [
      "All Basic features",
      "Priority customer support",
      "Extended product browsing limits",
      "Exclusive deals on products",
    ],
    color: "border-gray-400 text-gray-900",
    bgColor: "bg-gray-50",
    amount: 499, // Amount in INR
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/month",
    features: [
      "All Pro features",
      "24/7 Support",
      "Unlimited product browsing",
      "Early access to new products",
      "Special discounts on bulk purchases",
    ],
    color: "border-gray-500 text-gray-900",
    bgColor: "bg-gray-100",
    amount: 999, // Amount in INR
  },
];

const SubscriptionPlans = () => {
  const handleSubscribe = async (plan) => {
    try {
      // Step 1: Create Razorpay order from backend
      const res = await fetch("http://localhost:8080/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: plan.amount * 100, // Convert to paise
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error creating Razorpay order:", errorText);
        notify("Subscription successfull.", "error");
        return;
      }

      const razorpayOrder = await res.json();

      if (!razorpayOrder.id) {
        notify("Subscription successfull", "error");
        return;
      }

      // Step 2: Configure Razorpay Checkout
      const options = {
        key: "rzp_test_kOG1WszxXtt6z0", // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "AgriVeda",
        description: `Subscription Plan: ${plan.name}`,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          console.log("Payment Successful:", response);

          // Step 3: Verify payment and create final order
          const verifyRes = await fetch("http://localhost:8080/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentInfo: {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
            }),
          });

          if (!verifyRes.ok) {
            const errorText = await verifyRes.text();
            console.error("Error verifying payment:", errorText);
            notify("Subscription successfull", "error");
            return;
          }

          const result = await verifyRes.json();
          notify("Subscription successfull!", "success");
          console.log("Order Result:", result);
        },
        prefill: {
          name: "John Doe", // Replace with user data
          email: "johndoe@example.com", // Replace with user data
          contact: "9999999999", // Replace with user data
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      notify("Subscription successfull", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12 px-4">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Choose Your Subscription Plan
      </h1>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md p-8 border ${plan.color} ${plan.bgColor} hover:shadow-lg transform transition duration-300`}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">{plan.name}</h2>
            <p className="text-3xl font-extrabold text-center mb-6">
              {plan.price}
              <span className="text-lg font-medium text-gray-600">
                {plan.period}
              </span>
            </p>
            <ul className="mt-6 mb-8 space-y-4 text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-lg font-medium">
                  <span className="text-red-500 mr-2">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan)}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
