import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import "@draft-js-plugins/mention/lib/plugin.css"
import { EditorState } from "draft-js"
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData
} from "@draft-js-plugins/mention"
import { Category } from "@/hooks/types"
import { EntryComponentProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry"
import MentionComponent from "./MentionComponent"

// Draft-JS-Mentions plugin configuration
const mentionPlugin = createMentionPlugin({
  mentionPrefix: '',
  entityMutability: 'IMMUTABLE',
  mentionTrigger: '@',
  mentionComponent: (props: EntryComponentProps) => <MentionComponent mention={props.mention} />
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

  // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef<Editor>(null)

  // Check editor for mentions
  const onSearchChange = useCallback(
    ({ trigger, value }: { trigger: string; value: string }) => {
      setSuggestions(defaultSuggestionsFilter(value, categories, trigger));
    },
    []
  )

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        editorRef?.current?.focus();
      }, 200)
    }
  }, [])

  // Set focus on the editor window 
  const focusEditor = () => {
    editorRef.current!.focus()
  }

  const onOpenChange = useCallback((_open: boolean) => {
    console.log("onopenchange")
    setOpen(_open)
  }, [])


  return (
    <div>
      <div className="editor" onClick={() => focusEditor()}>
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
            console.log(value)
          }}
          onOpenChange={onOpenChange}
          open={open}
        />
      </div>
    </div>
  );
}

export default MentionInput

