import axios, { AxiosResponse } from "axios";
import OrderDetail from "./IOrderDetail";
// import OrderDetailModel from "./IOrderDetailModel";

const apiClient = axios.create({
    baseURL: "http://localhost:5228/OrderDetail",
});

const getOrderDetails = async (): Promise<OrderDetail[]> => {
    try {
        const res: AxiosResponse<OrderDetail[]> = await apiClient.get("/GetAllOrderDetails");
        return res.data;
    } catch (e) {
        console.log("An error occured:", e);
        return [];
    }
};

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
    getOrderDetails,
    getOrderDetailByOrderId,
};

export default orderService;