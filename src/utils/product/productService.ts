import axios, { AxiosResponse, AxiosError } from "axios";
import Product from "./IProduct";
import ProductModel from "./IProductModel";
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

const addProducts = async (product: ProductModel): Promise<Product> => {
	try {
	  const res: AxiosResponse<Product> = await apiClient.post("", product);
	  return res.data;
	} catch (e: any) {
	  console.log("Something went wrong!", e);
	  throw new Error("Failed to add product:"+e)
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

const deactivateProduct = async (Id: number): Promise<Product | null> => {
	try {
		const res: AxiosResponse<Product> = await apiClient.put(`/DeactivateProduct/${Id}`);
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
  addProducts,
  deleteProduct,
  updateProducts,
  deactivateProduct,
};

export default productService;
