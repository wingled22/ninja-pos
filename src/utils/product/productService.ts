import axios, { AxiosResponse } from "axios";
import Product from "./IProduct";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/Product",
});

const getProducts = async (): Promise<Product[]> => {
  try {
    const res: AxiosResponse<Product[]> = await apiClient.get("/GetProducts");
    return res.data;
  } catch (e) {
    console.log("An error occured", e);
    return [];
  }
};

const updateProducts = async (
  productId: number,
  product: { productName: string; productCategory: string }
): Promise<Product> => {
  try {
    const res = await apiClient.put(
      `/UpdateProduct/${productId}`,
      product, // Send only the fields being updated.
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (e: any) {
    console.error("Something went wrong!", e.response?.data || e.message);
    throw new Error("Failed to update product: " + (e.response?.data?.message || e.message));
  }
};




const productService = {
  getProducts,
  updateProducts,
};

export default productService;
