import React, { useCallback, useEffect, useRef, useState } from "react"

import "@draft-js-plugins/mention/lib/plugin.css"
import { EditorState } from "draft-js"
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData
} from "@draft-js-plugins/mention"
import { Category } from "@/hooks/types"
import MentionComponent from "./MentionComponent"
import { Text } from "@/ui/components/text";

// Draft-JS-Mentions plugin configuration
// we are usign a custom mention component in this case: MentionComponent
const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionComponent: (props) => <MentionComponent mention={props.mention as Category} />
})
const { MentionSuggestions } = mentionPlugin
const plugins = [mentionPlugin]


/*
 * MentionInput component based on components by draft-js
 *
 */
const MentionInput: React.FC<{
  categories: Category[];
}> = ({ categories }) => {
  const [suggestions, setSuggestions] = useState<MentionData[]>(categories)
  const [open, setOpen] = useState(true)
  const [isFocused, setIsFocused] = useState(true)
  const [results] = useState(0)

  // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef<Editor>(null)

  // Check editor for mentions
  const onSearchChange = useCallback(
    ({ value }: { value: string }) => {
      setSuggestions(defaultSuggestionsFilter(value, categories));
    },
    [categories]
  )

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        editorRef?.current?.focus();
      }, 200)
    }
  }, [isFocused])

  // calculcate the results of whatever the user entered
  const calculateResults = () => {
    console.log("Calculating results...")
    // const contentState = editorState.getCurrentContent()
    // const raw = convertToRaw(contentState)
    // console.log(raw)
    //
    // let cat = []
    // for (let key in raw.entityMap) {
    //   const ent = raw.entityMap[key]
    //   console.log({ ent })
    //   if (ent.type === "mention") {
    //     cat.push(ent.data.mention)
    //   }
    // }
    // console.log({ cat })
  }

  // Set focus on the editor window 
  const focusEditor = () => {
    editorRef.current!.focus()
  }

  // callback which is triggered whenever the suggestions popover should be opened or closed
  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open)
  }, [])


  return (
    <div>
      <div className="border mb-7 border-blue-8 flex gap-2 flex-row items-center">
        <Text className="text-[18px] font-medium">=</Text>
        <div className="editor w-[100%]" onClick={() => focusEditor()}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            ref={editorRef}
            editorKey={"editor"}
            onBlur={() => setIsFocused(false)}
          />
          <MentionSuggestions
            onSearchChange={onSearchChange}
            suggestions={suggestions}
            onAddMention={(value) => {
              console.log({ value })
            }}
            onOpenChange={onOpenChange}
            open={open}
          />
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button onClick={calculateResults} className="bg-blue-8 rounded-lg px-3 py-2">
          <Text className="text-[14px] text-surface">Calculate</Text>
        </button>
        <Text className="text-[16px] font-medium">Total: {results}</Text>
      </div>
    </div>
  );
}

export default React.memo(MentionInput)

