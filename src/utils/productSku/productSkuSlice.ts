import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productSkuService from "./productSkuService";
import ProductSku from "./IProductSku";
import ProductSkuModel from "./IProductSkuModel";

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
export const getSkuById = createAsyncThunk(
  "productSku/getSkuById",
  async (productSkuId: number, thunkAPI) => {
    try {
      return await productSkuService.getSkuById(productSkuId);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get productSku
export const getProductSku = createAsyncThunk(
  "productSku/getProductSku",
  async (_, thunkAPI) => {
    try {
      return await productSkuService.getProductSku();
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProductSKU = createAsyncThunk(
  "productSku/createProductSKU",
  async (productSKU: ProductSkuModel, thunkAPI) => {
    try {
      return await productSkuService.createProductSKU(productSKU);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProductSku = createAsyncThunk(
  "productSku/updateProductSku",
  async (
    {productSkuId, name, codeName, price, quantity, unit}: {
      productSkuId: number;
      name: string,
      codeName: string;
      price: number;
      quantity: number;
      unit: string;
    }
    , thunkAPI) => {
    try {
      return await productSkuService.updateProductSku(productSkuId, 
        { name, codeName, price, quantity, unit }
      );
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
      .addCase(getSkuById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSkuById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productSku = action.payload;
      })
      .addCase(getSkuById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(getProductSku.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductSku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productSku = action.payload;
      })
      .addCase(getProductSku.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      
      .addCase(createProductSKU.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductSKU.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Created ProductSKU";
      })
      .addCase(createProductSKU.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // .addCase(updateProductSku.pending, (state) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;

      // })
      // .addCase(updateProductSku.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.message = "Created ProductSKU";
      // })
      // .addCase(updateProductSku.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload as string;
      // });
  },
});
export const { reset } = productSkuSlice.actions;
export default productSkuSlice.reducer;
