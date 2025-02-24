import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import Product from "./IProduct";
import ProductModel from "./IProductModel";
import axios, { AxiosError } from "axios";


interface ProductState {
  products: Product[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ProductState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get products
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
	"client/deleteClient",
	async (Id: number, thunkAPI) => {
		try {
			return await productService.deleteProduct(Id);
			return Id;
		} catch (e: unknown) {
			let message = "An unknown error occurred";
			if (e instanceof AxiosError) {
				message =
					(e.response && e.response.data && e.response.data.message) ||
					e.message ||
					e.toString();
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addProducts = createAsyncThunk(
  "product/addProducts",
  async (product: ProductModel, thunkAPI) => {
    try {
      return await productService.addProducts(product);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      //adding new product
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Success adding product!";
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully deleted product";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;
