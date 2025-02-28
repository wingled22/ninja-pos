import axios, { AxiosResponse } from "axios";
import ProductSku from "./IProductSku";
import ProductSkuModel from "./IProductSkuModel";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/api/ProductSKU",
});

const getSkuByProductId = async (productId: number): Promise<ProductSku[]> => {
  try {
    const res: AxiosResponse<ProductSku[]> = await apiClient.get(
      `/GetSKU/${productId}`
    );
    return res.data;
  } catch (e) {
    console.log("An error occurred", e);
    return [];
  }
};

const getProductSku = async (): Promise<ProductSku[]> => {
  try {
    const res: AxiosResponse<ProductSku[]> = await apiClient.get(
      "/GetProductSku"
    );
    return res.data;
  } catch (e) {
    console.log("An error occured", e);
    return [];
  }
};

const createProductSKU = async (
  productSKU: ProductSkuModel
): Promise<ProductSku> => {
  try {
    // const res: AxiosResponse<ProductSku> = await apiClient.post(`/CreateSKU?ProductId=${productSKU.productId}&Name=${productSKU.name}&CodeName=${productSKU.codeName}&Price=${productSKU.price}&Quantity=${productSKU.quantity}&Unit=${productSKU.unit}`, productSKU);
    const res: AxiosResponse<ProductSku> = await apiClient.post(
      "",
      productSKU
    );
    return res.data;
  } catch (e: any) {
    console.log("Something went wrong!", e);
    throw new Error("Failed to add product:" + e);
  }
};

const productSkuService = {
  getSkuByProductId,
  getProductSku,
  createProductSKU,
};

export default productSkuService;
