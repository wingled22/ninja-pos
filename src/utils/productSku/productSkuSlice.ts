import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productSkuService from "./productSkuService";
import ProductSku from "./IProductSku";

interface ProductSkuState {
  productSku: ProductSku[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ProductSkuState = {
  productSku: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get product Sku by product Id
export const getSkuByProductId = createAsyncThunk(
  "productSku/getSkuByProductId",
  async (productId: number, thunkAPI) => {
    try {
      return await productSkuService.getSkuByProductId(productId);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSkuSlice = createSlice({
  name: "productSku",
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
      .addCase(getSkuByProductId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSkuByProductId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productSku = action.payload;
      })
      .addCase(getSkuByProductId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = productSkuSlice.actions;
export default productSkuSlice.reducer;
