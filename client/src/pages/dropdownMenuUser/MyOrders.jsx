import React from "react";
import { useSelector } from "react-redux";

function MyOrders() {
  const orders = useSelector((state) => state.cartReducer);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-red-100 py-10 px-4 md:px-8">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10 tracking-wide">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg font-medium">
            You have no orders yet.
          </p>
        </div>
      ) : (
        <ul className="space-y-8 max-w-4xl mx-auto">
          {orders.map((order) => (
            <li
              key={order._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 border border-red-200"
            >
              <div className="flex items-center space-x-6 w-full md:w-auto">
                <div className="h-28 w-28 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                  <img
                    src={order.image}
                    alt="Order"
                    className="h-full w-full object-cover object-center transform hover:scale-105 transition duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {order.name}
                  </h3>
                  <p className="text-sm text-gray-500">{order.brand}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Quantity:{" "}
                    <span className="font-medium">
                      {order.qty} {order.unit}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Min. Order:{" "}
                    <span className="font-medium">
                      {order.minQty} {order.unit}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-0 text-right w-full md:w-auto">
                <p className="text-lg font-bold text-red-600">
                  Rs. {order.currentPrice}
                </p>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="font-semibold text-gray-800">
                    Rs. {order.currentPrice * order.qty}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrders;
