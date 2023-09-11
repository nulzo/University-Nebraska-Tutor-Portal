import React, {useRef, useState} from "react";
import ReactQuill from "react-quill";
import "highlight.js/styles/base16/google-dark.css";
import hljs from "highlight.js";
// Styles
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "../../styles/quill.css";

export default function Quill() {
    const editorRef = useRef(0);
    const readRef = useRef(0);

    hljs.configure({
        languages: [
            "js",
            "ts",
            "c",
            "cpp",
            "cs",
            "java",
            "html",
            "css",
            "python",
            "sql"
        ]
    });
    const [value, setValue] = useState("");
    const modules = {
        toolbar: [
            [{size: []}],
            ["bold", "italic", "underline", "code-block"],
            [{list: "ordered"}, {list: "bullet"}],
            ["link"]
        ],
        clipboard: {
            matchVisual: false
        },
        syntax: {
            highlight: (text) => hljs.highlightAuto(text).value
        }
    };

    const formats = [
        "size",
        "bold",
        "italic",
        "underline",
        "code-block",
        "list",
        "bullet",
        "link"
    ];
    return (
        <ReactQuill
            ref={editorRef}
            formats={formats}
            placeholder="Enter your issue here..."
            modules={modules}
            theme="snow"

            // DO NOT DELETE THESE!!!!!!!!!!!!!!!!!
            // value={value}
            // onChange={setValue}
            name="QuillEditor"
        ></ReactQuill>
    );
}