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
                onChange={() => editor.chain().focus().toggleBold().run()}
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
                onChange={() => editor.chain().focus().toggleItalic().run()}
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
                onChange={() => editor.chain().focus().toggleStrike().run()}
            />
        </div>
    );
}
