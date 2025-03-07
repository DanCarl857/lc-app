"use client"
import React from "react";
import { useFetchCategories } from "@/core/api";
import useStore from "@/hooks/useStore";
import { Text } from "@/ui/components/text";
import { useEffect } from "react";
import MentionInput from "./components/MentionInput";

export default function Home() {
  const { categories, isLoading, error, setLoading } = useStore()
  const { isFetching } = useFetchCategories()

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching, setLoading])

  if (isLoading) return <div className="flex w-full h-full justify-center items-center"><h2>Fetching data...</h2></div>
  if (error) return <h2>Error: {error}</h2>

  return (
    <main className="flex flex-wrap justify-between items-center mx-auto max-w-screen-md">
      <div className="w-full">
        <div className="p-5 bg-blue-3 mb-10 rounded-md">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2 flex-col">
              <p className="text-17 text-grey-2 font-500">Start Typing...</p>
              <p className="text-[14px] text-grey-2 font-light">Use @ to see possible suggestions</p>
              <p className="text-[14px] text-grey-2 font-light">Backspace to delete</p>
            </div>

          </div>
        </div>
        <div className="bg-surface flex-1 h-fit p-6 rounded-md drop-shadow-md gap-3">
          <Text type="heading1" className="font-bold mb-4">
            LC App
          </Text>
          <MentionInput categories={categories} />
        </div>
      </div>
    </main>
  );
}

