import { create } from "zustand";
import { StoreState } from "./types";

const useStore = create<StoreState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export default useStore;
