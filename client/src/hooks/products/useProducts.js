import useHttpClient from "../api/useHttpClient";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_MAIN_PRODUCT_DASHBOARD_DATA,
  GET_PLATFORM_STATISTICS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_DASHBOARD_DATA,
  GET_SELLER_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../constants/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { addProductData } from "../../redux/actions";

const useProducts = () => {
  const { sendRequest, sendAuthorizedRequest, isLoading, setIsLoading } =
    useHttpClient();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productReducer);

  const getProductsByCategory = async (
    category,
    page,
    products_per_page,
    lng,
    lat
  ) => {
    try {
      const products = await sendRequest(
        GET_PRODUCTS_BY_CATEGORY(category, page, products_per_page, lng, lat)
      );
      return products.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getProductUserDashboardData = async (productId) => {
    try {
      const dashProductData = await sendRequest(
        GET_PRODUCT_DASHBOARD_DATA(productId)
      );

      // dispatch(
      //   addProductData({
      //     ...productData,
      //     sellerId: dashProductData.data.sellerId,
      //   })
      // );

      return dashProductData.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSellerProducts = async () => {
    try {
      let products = await sendAuthorizedRequest(
        "seller",
        GET_SELLER_PRODUCTS,
        "GET"
      );
      return products.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      let res = await sendAuthorizedRequest(
        "seller",
        UPDATE_PRODUCT(productId),
        "PUT",
        productData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (productData) => {
    try {
      let res = await sendAuthorizedRequest(
        "seller",
        ADD_PRODUCT,
        "POST",
        productData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      let res = await sendAuthorizedRequest(
        "seller",
        DELETE_PRODUCT(productId),
        "DELETE"
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getProductStocksById = async (productId) => {
    try {
      let res = await sendAuthorizedRequest(
        "seller",
        GET_PRODUCT_STOCKS_BY_ID(productId),
        "GET"
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDashboardDetails = async (productId) => {
    try {
      let res = await sendAuthorizedRequest(
        "seller",
        GET_PRODUCT_DASHBOARD_DETAILS(productId),
        "GET"
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMainProductDashboardData = async (productId) => {
    try {
      let res = await sendRequest(
        GET_MAIN_PRODUCT_DASHBOARD_DATA(productId),
        "GET"
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProductsByCategory,
    getProductUserDashboardData,
    getSellerProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    getProductStocksById,
    getProductDashboardDetails,
    getMainProductDashboardData,
    isLoading,
    setIsLoading,
  };
};

export default useProducts;
