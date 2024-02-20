import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type FormEventHandler } from "react";
import TextEditorToolbar from "./TextEditorToolbar";

type Props = {
    onChange: (value: string) => void;
};

const extensions = [
    StarterKit,
];

const content = "<p>your description...</p>";

function Tiptap({ onChange }: Props) {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class:
                    "textarea textarea-bordered prose rounded w-full min-w-full min-h-40 For make this, you will need....",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor?.getHTML());
        },
    });

    return (
        <>
            <TextEditorToolbar editor={editor} />
            <EditorContent
                editor={editor}
            />
        </>
    );
}

export default Tiptap;
