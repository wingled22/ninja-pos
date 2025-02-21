import { configureStore } from "@reduxjs/toolkit";
import productSkuReducer from "./productSku/productSkuSlice";
import productReducer from "./product/productSlice";
import clientReducer from "./client/clientSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    productSkus: productSkuReducer,
    products: productReducer,
    clients: clientReducer,
    orders: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
