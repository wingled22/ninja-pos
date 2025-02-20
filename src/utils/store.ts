import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import clientReducer from "./client/clientSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    clients: clientReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
