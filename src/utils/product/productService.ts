import axios, { AxiosResponse } from "axios";
import Product from "./IProduct";
import ProductModel from "./IProductModel";

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

const addProducts = async (product: ProductModel): Promise<Product> => {
  try {
    const res: AxiosResponse<Product> = await apiClient.post("", product);
    return res.data;
  } catch (e: any) {
    console.log("Something went wrong!", e);
    throw new Error("Failed to add product:"+e)
  }
};

const productService = {
  getProducts,
  addProducts,
};

export default productService;
