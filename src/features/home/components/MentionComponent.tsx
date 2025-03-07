import React from "react";
import { IoIosArrowDropdown } from "react-icons/io"

interface MentionProps {
  mention: {
    name: string;
    category: string;
    value: string;
    id: string;
  };
}

const MentionComponent = ({ mention }: MentionProps) => {
  console.log(mention)
  const handleClick = () => {
    console.log("we just clicked")
  }
  return (
    <span onClick={handleClick} className="w-fit items-center gap-2 rounded-lg px-2 py-1 bg-blue-5 cursor-pointer">
      {mention.name} &#9660;
    </span>
  )
}

export default React.memo(MentionComponent)
