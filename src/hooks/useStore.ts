import { create } from "zustand";
import { StoreState } from "./types";

// Simple store to store categories, update categories and keep track of loading states
const useStore = create<StoreState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export default useStore;
