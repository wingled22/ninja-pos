import axios, { AxiosResponse } from "axios";
import ProductSku from "./IProductSku";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/ProductSKU",
});

const getSkuByProductId = async (productId: number): Promise<ProductSku[]> => {
  try {
    const res: AxiosResponse<ProductSku[]> = await apiClient.get(`/GetSKU/${productId}`);
    return res.data;
  } catch (e) {
    console.log("An error occurred", e);
    return [];
  }
};

const productSkuService = {
  getSkuByProductId,
};

export default productSkuService;
