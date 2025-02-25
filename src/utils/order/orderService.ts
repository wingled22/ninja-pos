import axios, { AxiosResponse } from "axios";
import Order from "./IOrder";
import OrderModel from "./IOrderModel";

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

const createOrder = async (orderData: OrderModel[]): Promise<OrderModel[]> => {
  try {
    const res: AxiosResponse<OrderModel[]> = await apiClient.post("CreateOrder", orderData);
    return res.data;
  } catch (e) {
    console.log("An error occurred while adding order:", e);
    return [];
  }
};

const orderService = {
  getOrders,
  createOrder
};

export default orderService;
