import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlices";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsSlice,
  },
});

export default store;
