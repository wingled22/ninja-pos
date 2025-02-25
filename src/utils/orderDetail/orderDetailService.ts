import axios, { AxiosResponse } from "axios";
import OrderDetail from "./IOrderDetail";
// import OrderDetailModel from "./IOrderDetailModel";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/OrderDetail",
});

const getOrderDetailByOrderId = async (orderId: number): Promise<OrderDetail[]> => {
  try {
    const res: AxiosResponse<OrderDetail[]> = await apiClient.get(`/GetOrderDetails/${orderId}`);
    return res.data;
  } catch (e) {
    console.log("An error occurred", e);
    return [];
  };
};

const orderService = {
  getOrderDetailByOrderId
};

export default orderService;
