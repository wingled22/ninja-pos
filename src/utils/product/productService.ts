import axios, { AxiosResponse, AxiosError } from "axios";
import Product from "./IProduct";
import { toast } from "react-toastify";

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

const deleteProduct = async (Id: number): Promise<Product | null> => {
	try {
		const res: AxiosResponse<Product> = await apiClient.delete(`/DeleteProduct/${Id}`);
		toast.success("Client deleted successfully");
		return res.data; 
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			toast.error(`Failed to delete product: ${e.response?.data?.message || e.message}`);
		} else {
			toast.error("Unexpected error occurred while deleting product.");
		}
		throw e; 
	}
};

const productService = {
  getProducts,
  deleteProduct,
};

export default productService;
