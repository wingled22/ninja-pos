import { configureStore } from "@reduxjs/toolkit";
import productSkuReducer from "./productSku/productSkuSlice";
import productReducer from "./product/productSlice";
import clientReducer from "./client/clientSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    productSku: productSkuReducer,
    clients: clientReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;