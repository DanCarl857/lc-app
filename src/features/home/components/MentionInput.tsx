import React, { useCallback, useRef, useState } from "react"

import "@draft-js-plugins/mention/lib/plugin.css"
import { EditorState } from "draft-js"
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData
} from "@draft-js-plugins/mention"
import { Category } from "@/hooks/types"

// Draft-JS-Mentions plugin configuration
const mentionPlugin = createMentionPlugin({
  mentionPrefix: '',
  entityMutability: 'IMMUTABLE'
})
const { MentionSuggestions } = mentionPlugin
const plugins = [mentionPlugin]

const MentionInput: React.FC<{
  categories: Category[];
}> = ({ categories }) => {
  const [suggestions, setSuggestions] = useState<MentionData[]>(categories)
  const [open, setOpen] = useState(true)

  // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editorRef = useRef(null)

  // Check editor for mentions
  const onSearchChange = (({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, categories))
  })

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

