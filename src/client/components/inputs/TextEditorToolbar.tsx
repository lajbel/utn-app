import {
    faBold,
    faItalic,
    faLink,
    faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Editor } from "@tiptap/react";
import { Swap } from "react-daisyui";

type Props = {
    editor: Editor | null;
};

export default function TextEditorToolbar({ editor }: Props) {
    if (!editor) return null;

    return (
        <div>
            <Swap
                onElement={
                    <div className="bg-base-200 w-7 h-7 rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faBold}
                        />
                    </div>
                }
                offElement={
                    <div className="bg-noen w-7 h-7 rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faBold}
                        />
                    </div>
                }
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
            />

            <Swap
                onElement={
                    <div className="bg-base-200 w-7 h-7 rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faItalic}
                        />
                    </div>
                }
                offElement={
                    <div className="bg-noen w-7 h-7 rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faItalic}
                        />
                    </div>
                }
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
            />

            <Swap
                onElement={
                    <div className="bg-base-200 w-7 h-7 rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faStrikethrough}
                        />
                    </div>
                }
                offElement={
                    <div className="bg-noen w-7 h-7 rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faStrikethrough}
                        />
                    </div>
                }
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive("strike")}
            />
        </div>
    );
}
