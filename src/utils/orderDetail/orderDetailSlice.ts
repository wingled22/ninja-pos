import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderDetailService from "./orderDetailService";
import OrderDetail from "./IOrderDetail";

interface OrderDetailState {
  orderDetails: OrderDetail[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: OrderDetailState = {
  orderDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOrderDetails = createAsyncThunk(
  "orderDetail/getOrderDetails",
  async (_, thunkAPI) => {
    try {
      return await orderDetailService.getOrderDetails();
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderDetailSlice = createSlice({
  name: "orderDetails",
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
    //getOrderDetail
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
