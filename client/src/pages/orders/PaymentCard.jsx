import React from "react";
import useOrder from "../../hooks/orders/useOrder";
import { useSelector } from "react-redux";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";

const PaymentCard = ({
  totalAmount,
  limitForFreeDelivery,
  deliveryCharge,
  customerLatitude,
  customerLongitude,
  user,
}) => {
  const cartData = useSelector((state) => state.cartReducer);
  const { isLoading: isPaymentInitiated } = useOrder();

  const orderNow = async () => {
    if (customerLatitude === null || customerLongitude === null) {
      notify("Please allow the location access", "info");
      return;
    }

    if (!window.Razorpay) {
      notify("Razorpay SDK not loaded", "error");
      return;
    }

    const orderData = cartData.map((item) => ({
      productId: item._id,
      orderQty: item.qty,
      orderLocation: {
        coordinates: [customerLongitude, customerLatitude],
      },
      sellerId: item.sellerId,
    }));

    try {
      // Step 1: Create Razorpay order from backend
      const res = await fetch("http://localhost:8080/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount:
            (totalAmount >= limitForFreeDelivery
              ? totalAmount
              : totalAmount + deliveryCharge) * 100, // in paise
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error creating Razorpay order:", errorText);
        notify("Failed to create Razorpay order. Please try again.", "error");
        return;
      }

      const razorpayOrder = await res.json();

      if (!razorpayOrder.id) {
        notify("Failed to create Razorpay order", "error");
        return;
      }

      // Step 2: Configure Razorpay Checkout
      const options = {
        key: "rzp_test_kOG1WszxXtt6z0", // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "CropConnect",
        description: "Order Payment",
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
              orders: orderData,
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
            notify("Order failed. Please try again.", "error");
            return;
          }

          const result = await verifyRes.json();
          notify("Order placed successfully!", "success");
          console.log("Order Result:", result);
          // Optionally clear cart or navigate
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.contact || "",
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      notify("Payment failed. Please try again.", "error");
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
      <h3 className="text-xl font-semibold leading-5 text-gray-800">
        Shipping
      </h3>
      <div className="flex justify-between items-start w-full">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-8">
            <img
              loading="lazy"
              className="w-full h-full"
              alt="logo"
              src="https://i.ibb.co/L8KSdNQ/image-3.png"
            />
          </div>
          <div className="flex flex-col justify-start items-center">
            <p className="text-lg leading-6 font-semibold text-gray-800">
              CropConnect
              <br />
              <span className="font-normal">Delivery within 24 Hours</span>
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold leading-6 text-gray-800">
          Rs.
          {totalAmount >= limitForFreeDelivery
            ? totalAmount
            : totalAmount + deliveryCharge}
          .00
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
          onClick={() => {
            if (cartData.length === 0) {
              notify("First add some items to cart", "info");
            } else {
              orderNow();
            }
          }}
        >
          {isPaymentInitiated && <Spinner width="w-6" color="#ffffff" />}
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
