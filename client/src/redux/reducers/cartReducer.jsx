import {
  ADD_TO_CART,
  DEC_QTY_IN_CART,
  INC_QTY_IN_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
} from "../constants";

let initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if product already exists in cart
      const existingProduct = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        return state;
      }
      // Add new product with minimum order quantity
      return [
        ...state,
        {
          ...action.payload,
          qty: action.payload.minQty,
          currentPrice: action.payload.pricePerUnit * action.payload.minQty,
        },
      ];
    case REMOVE_ALL_FROM_CART:
      return [];
    case REMOVE_FROM_CART:
      return state.filter((item) => item._id !== action.payload);
    case INC_QTY_IN_CART:
      return state.map((item) => {
        if (item._id === action.payload) {
          const newQty = item.qty + 1;
          return {
            ...item,
            qty: newQty,
            currentPrice: item.pricePerUnit * newQty,
          };
        }
        return item;
      });
    case DEC_QTY_IN_CART:
      return state.map((item) => {
        if (item._id === action.payload) {
          // Don't allow quantity to go below minimum order quantity
          const newQty = Math.max(item.minQty, item.qty - 1);
          return {
            ...item,
            qty: newQty,
            currentPrice: item.pricePerUnit * newQty,
          };
        }
        return item;
      });
    default:
      return state;
  }
};
