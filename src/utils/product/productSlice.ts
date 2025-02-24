import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import Product from "./IProduct";

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

export const updateProducts = createAsyncThunk(
  "product/updateProduct",
  async (
    { productId, productName, productCategory }: { 
      productId: number; 
      productName: string; 
      productCategory: string; 
    },
    thunkAPI
  ) => {
    try {
      return await productService.updateProducts(productId, { productName, productCategory });
    } catch (e: any) {
      const message = e?.response?.data?.message || e.message || e.toString();
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

      .addCase(updateProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully updated product";
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;
