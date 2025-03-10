import { Category } from "@/hooks/types";

export const customSuggestionsFilter = (
  searchValue: string,
  categories: Category[],
) => {
  const size = (list) =>
    list.constructor.name === "List" ? list.size : list.length;

  const get = (obj, attr) => (obj.get ? obj.get(attr) : obj[attr]);

  const value = searchValue.toLowerCase();
  const filteredSuggestions = categories.filter(
    (suggestion) =>
      !value || get(suggestion, "name").toLowerCase().indexOf(value) > -1,
  );
  const length =
    size(filteredSuggestions) < 10 ? size(filteredSuggestions) : 10;
  return filteredSuggestions.slice(0, length);
};
