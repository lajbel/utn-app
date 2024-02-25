import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToolbar from "./TextEditorToolbar";

type Props = {
    onChange: (value: string) => void;
    content?: string;
};

const extensions = [
    StarterKit,
    Placeholder.configure({ placeholder: "Write something..." }),
];

const Tiptap: React.FC<Props> = ({ onChange, content = "" }) => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class:
                    "textarea textarea-bordered prose prose-sm w-full min-w-full max-h-40 max-w-full h-96 overflow-y-auto",
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
};

export default Tiptap;
