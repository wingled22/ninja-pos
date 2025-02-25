import axios, { AxiosResponse } from "axios";
import ProductSku from "./IProductSku";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/ProductSku",
});

const getProductSku = async (): Promise<ProductSku[]> => {
  try {
    const res: AxiosResponse<ProductSku[]> = await apiClient.get("/GetProductSku");
    return res.data;
  } catch (e) {
    console.log("An error occured", e);
    return [];
  }
};

const productSkuService = {
    getProductSku,
};

export default productSkuService;
