import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
    categories: [],
    categoriesLastFetch: null,
  },
  reducers: {
    setProducts(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addProduct(state, action) {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    editProduct(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    setCategories(state, action) {
      state.categories = action.payload;
      state.categoriesLastFetch = new Date().toISOString();
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  setIsLoading,
  setProducts,
  addProduct,
  editProduct,
  setCategories,
} = productsSlice.actions;

export default productsSlice.reducer;
