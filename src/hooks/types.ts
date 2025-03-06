export interface Category {
  id: number;
  name: string;
  value: string;
  category: string;
}

export interface StoreState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  setCategories: (categories: Category[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
