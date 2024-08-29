import store from "../store";
import {
  addProduct,
  editProduct,
  setCategories,
  setError,
  setIsLoading,
  setProducts,
} from "../store/slices/productsSlice";
import axiosInstance from "./axiosInstance";
import dayjs from "dayjs";

class ProductApi {
  static async getProducts(page = 1, limit = 10, query) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.get("/products", {
        params: {
          page,
          limit,
          query,
        },
      });

      const { data } = res;

      store.dispatch(
        setProducts({
          items: data.items,
          total: data.total,
        })
      );
    } catch (error) {
      store.dispatch(setError(error));
      throw new Error("ProductApi getProducts", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getProduct(id) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createProduct(productData) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.post("/products", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      store.dispatch(addProduct(res.data));
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async updateProduct(id, productData) {
    try {
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.put(`/products/${id}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      store.dispatch(editProduct(res.data));
    } catch (error) {
      console.error(error.message);
      store.dispatch(setError(error.message));
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getCategories() {
    try {
      const { categoriesLastFetch } = store.getState().products;
      store.dispatch(setIsLoading(true));
      if (categoriesLastFetch) {
        const hourDifference = dayjs(new Date().toISOString()).diff(
          categoriesLastFetch,
          "hour"
        );
        if (hourDifference === 0) {
          return;
        }
      }

      const res = await axiosInstance.get("/categories");
      const { data } = res;
      store.dispatch(setCategories(data));
    } catch (error) {
      console.error(error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ProductApi;
