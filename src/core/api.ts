import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useStore from "@/hooks/useStore";
import { Category } from "@/hooks/types";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete",
  );
  return response.data;
};

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
