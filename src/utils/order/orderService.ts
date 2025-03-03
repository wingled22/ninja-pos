import axios, { AxiosResponse } from "axios";
import Order from "./IOrder";
import OrderModel from "./IOrderModel";
import OrderUpdateModel from "./IOrderUpdateModel";

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

const updateOrder = async (orderUpdate: OrderUpdateModel[]): Promise<OrderUpdateModel[]> => {
  try {
    const res: AxiosResponse<OrderUpdateModel[]> = await apiClient.post("UpdateOrder", orderUpdate);
    return res.data;
  } catch (e) {
    console.log("An error occurred while updating order:", e);
    throw e;
  }
};

const orderService = {
  getOrders,
  createOrder,
  updateOrder,
};

export default orderService;
