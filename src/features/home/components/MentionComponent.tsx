import React, { Key, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"
import useStore from "@/hooks/useStore"
import { Text } from "@/ui/components/text"
import { Category } from "@/hooks/types";

interface MentionProps {
  mention: Category;
}

const MentionComponent = ({ mention }: MentionProps) => {
  const [selectedCategory, setSelectedCategory] = useState(mention)
  const { categories } = useStore()

  const handleClick = () => {
    console.log("we just clicked")
  }

  // Handle when a dropdow item is selected
  const handleAction = (item: Key) => setSelectedCategory(categories[Number(item) - 1])

  return (
    <span onClick={handleClick} className="w-fit items-center gap-2 rounded-full px-3 py-1 bg-blue-5 cursor-pointer">
      <Dropdown className="focuse:outline-none">
        <DropdownTrigger>
          <button className="focus:outline-none">
            <span className="text-[14px]">
              {selectedCategory.name}
            </span>
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          className="outline-none drop-shadow bg-surface max-h-[400px] overflow-y-auto p-2"
          onAction={handleAction}
        >
          {categories.map((category) => (
            <DropdownItem key={category.id} className="hover:bg-neutral-3 hover:rounded-lg my-2">
              <div>
                <Text className="text-[14px] p-1 mx-1 w-[100%]">{category.name}</Text>
                <div className="w-[100%] flex flex-row items-center mx-1 mb-1 p-1 gap-2">
                  <Text className="text-[10px]"><b>Category:</b> {category.category}</Text>
                  <Text className="text-[10px]"><b>Value:</b> {category.value}</Text>
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </span >
  )
}

export default React.memo(MentionComponent)
