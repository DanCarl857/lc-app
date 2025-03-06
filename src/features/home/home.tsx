"use client";

import { useFetchCategories } from "@/core/api";
import { Category } from "@/hooks/types";
import useDebounceValue from "@/hooks/useDebounceValue";
import useStore from "@/hooks/useStore";
import { Text } from "@/ui/components/text";
import { useEffect, useRef, useState } from "react";

interface Tag {
  name: string;
  id: string;
  value: string;
}

const operands = ["+", "-", "*", "/", "(", ")", "^"]

export default function Home() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Category[]>([])
  const debounceQuery = useDebounceValue(query)
  const [tags, setTags] = useState<Tag[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const { categories, isLoading, error, setLoading } = useStore()
  const { isFetching } = useFetchCategories()

  const getAutoCompleteResults = (categories: Category[], query: string) => {
    return categories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase()))
  }

  // Evaluate whatever the user types in
  const handleSubmit = () => {

  }

  // Handle whatever is being typed...
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)

    if (operands.includes(value)) {
      console.log(value)
      console.log('show me the money')
      setSuggestions(categories)
    }

    // show suggestions when an operand is typed or something from the categories list is typed
    if (value.length > 0) {
      const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().startsWith(value)
      );
      setSuggestions(filteredCategories);
    } else {
      setSuggestions([]);
    }
  }


  // Handle key down events (e.g., backspace, enter)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && query === '' && tags.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    } else if (event.key === 'Enter' && query.trim() !== '') {
      // Add a new tag when Enter is pressed
      const newTag: Tag = { id: Date.now().toString(), value: query.trim(), name: query };
      setTags([...tags, newTag]);
      setQuery('');
      setSuggestions([]);
    }
  }


  useEffect(() => {
    (async () => {
      if (!debounceQuery) {
        setSuggestions([])
        return
      }
      const data = getAutoCompleteResults(categories, debounceQuery)
      setSuggestions(data)
    })();
  }, [debounceQuery])

  // move focus to the input field when tags change 
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tags])


  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching, setLoading])

  if (isLoading) return <div className="flex justify-center items-center"><h2>Fetching data...</h2></div>
  if (error) return <h2>Error: {error}</h2>


  // Handle dropdown selection for a tag
  const handleDropdownSelect = (
    tagId: string,
    selectedValue: string,
    selectedName: string
  ) => {
    const updatedTags = tags.map((tag) =>
      tag.id === tagId
        ? { ...tag, value: selectedValue, name: selectedName }
        : tag
    )
    setTags(updatedTags)
  }

  const addTag = (value: string) => {
    const category = categories.find((cat) => cat.name === value);
    const newTag: Tag = {
      id: Date.now().toString(),
      value: category ? category.value : value,
      name: category ? category.name : value,
    };
    setTags([...tags, newTag])
    setQuery("")
    setSuggestions([])
  }

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion)
  }


  return (
    <main className="flex flex-wrap justify-between items-center mx-auto max-w-screen-md">
      <div className="w-full">
        <div className="p-5 bg-blue-3 mb-10 rounded-md">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2 flex-col">
              <p className="text-17 text-grey-2 font-500">Start Typing...</p>
            </div>

          </div>
        </div>
        <div className="bg-surface flex-1 h-fit p-6 rounded-md drop-shadow-md gap-3">
          <div>
            <Text type="heading1" className="font-bold">
              LC App
            </Text>
          </div>
          <div className="p-4 border border-neutral-4 w-[100%]">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <TagWithDropdown
                  categories={categories}
                  key={tag.id}
                  tag={tag}
                  onSelect={handleDropdownSelect}
                />
              ))}
              <input
                ref={inputRef}
                placeholder="Type a formula..."
                onKeyDown={handleKeyDown}
                value={query}
                className="flex-1 min-w-[100px] p-2 rounded focus:outline-none focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="drop-shadow rounded-lg border border-neutral-3 mt-2">
            {suggestions.length > 0 && (
              <div className="mt-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion.name)}
                    className="m-1 px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    {suggestion.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Tag component with dropdown
const TagWithDropdown: React.FC<{
  categories: Category[];
  tag: Tag;
  onSelect: (tagId: string, selectedValue: string, selectedName: string) => void;
}> = ({ tag, onSelect, categories }) => {
  const [dropdownValue, setDropdownValue] = useState<string>(tag.value)

  // Sync dropdownValue with tag.value
  useEffect(() => {
    setDropdownValue(tag.value)
  }, [tag.value])

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const selectedCategory = categories.find((cat) => cat.name === selectedValue)

    if (selectedCategory) {
      // Update the tag with the selected category's name and value
      setDropdownValue(selectedValue)
      onSelect(tag.id, selectedValue, selectedCategory.name)
    }
  }

  return (
    <div className="cursor-pointer flex items-center gap-1 p-1 bg-neutral-3 rounded-full">
      <span className="px-2 py-1 rounded-full text-sm">{tag.name}</span>
      <select
        value={dropdownValue}
        onChange={handleDropdownChange}
        className="w-[20px] bg-neutral-3 p-1 rounded focus:outline-none text-sm"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={`tag` + category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div >
  );

};

