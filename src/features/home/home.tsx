"use client";

import { useFetchCategories } from "@/core/api";
import useDebounceValue from "@/hooks/useDebounceValue";
import useStore from "@/hooks/useStore";
import { Text } from "@/ui/components/text";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const debounceQuery = useDebounceValue(query)

  const { categories, isLoading, error, setLoading } = useStore()
  const { isFetching } = useFetchCategories()

  useEffect(() => {
    (async () => {
      if (!debounceQuery) {
        setSuggestions([])
        return
      }
      console.log(debounceQuery)
      // const data = await getAutoCompleteResults(debounceQuery)
      // setSuggestions(data)
    })();
  }, [debounceQuery])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching, setLoading])

  if (isLoading) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

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
          <div>
            <input
              className="border border-neutral-4 w-[100%] mt-10 mb-4 h-[60px] p-2"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
