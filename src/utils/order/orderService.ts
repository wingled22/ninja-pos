import axios, { AxiosResponse } from "axios";
import Order from "./IOrder";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/Order",
});

const getOrders = async (): Promise<Order[]> => {
  try {
    const res: AxiosResponse<Order[]> = await apiClient.get("GetAllOrders");
    return res.data;
  } catch (e) {
    console.log("An error occured:", e);
    return [];
  }
};

const orderService = {
  getOrders,
};

export default orderService;
