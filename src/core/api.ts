import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useStore from "@/hooks/useStore";
import { Category } from "@/hooks/types";

// Fetch categories data
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete",
  );
  return response.data;
};

// useFetchCategories hook
//  Fetches categories and updates our categories store with the fetched data.
//  We also keep track of our loading state while fetching data so we can update the
//  user accordingly
//  We use react-query to fetch data
export const useFetchCategories = () => {
  const setCategories = useStore((state) => state.setCategories);
  const setLoading = useStore((state) => state.setLoading);

  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Array<Category>> => {
      const response = await axios.get(
        "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete",
      );
      setCategories(response.data);
      setLoading(false);
      return response.data;
    },
  });
};
