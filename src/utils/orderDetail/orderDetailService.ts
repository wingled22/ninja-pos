import axios, { AxiosResponse } from "axios";
import OrderDetail from "./IOrderDetail";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/OrderDetail",
});

const getOrderDetails = async (): Promise<OrderDetail[]> => {
  try {
    const res: AxiosResponse<OrderDetail[]> = await apiClient.get("GetAllOrderDetails");
    return res.data;
  } catch (e) {
    console.log("An error occured:", e);
    return [];
  }
};

const orderDetailService = {
  getOrderDetails,
};

export default orderDetailService;
