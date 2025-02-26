import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderDetailService from "./orderDetailService";
import OrderDetail from "./IOrderDetail";

interface OrderDetailState {
  orderDetail: OrderDetail[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: OrderDetailState = {
  orderDetail: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get order detail by order Id
export const getOrderDetailByOrderId = createAsyncThunk(
  "orderDetail/getOrderDetailByOrderId",
  async (orderId: number, thunkAPI) => {
    try {
      return await orderDetailService.getOrderDetailByOrderId(orderId);
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
  name: "orderDetail",
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
      .addCase(getOrderDetailByOrderId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailByOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderDetail = action.payload;
      })
      .addCase(getOrderDetailByOrderId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;