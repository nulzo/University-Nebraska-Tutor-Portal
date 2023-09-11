import hljs from "highlight.js";
import React, {useState, useRef} from "react";
import ReactQuill from "react-quill";
import "highlight.js/styles/base16/google-dark.css";

// Styles
import "./tailwind.output.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "./quill.css";

function App() {
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

    function ReadQuill() {
        const modules = {
            toolbar: [
                [{size: []}],
                ["bold", "italic", "underline", "code-block"],
                [{list: "ordered"}, {list: "bullet"}],
                ["link"],
                ["clean"]
            ],
            syntax: {
                highlight: (text) => hljs.highlightAuto(text).value
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false
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
                ref={readRef}
                formats={formats}
                readOnly={true}
                modules={modules}
                theme="bubble"
                name="QuillEdited"
            ></ReactQuill>
        );
    }

    function Quill() {
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

    function Form() {
        return (
            <label className="block">
                <span className="text-gray-600 text-sm">Full Name</span>
                <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </label>
        );
    }

    function CancelButton({onClick}) {
        return (
            <button
                className="inline-flex overflow-hidden rounded-md border border-red-200 bg-white shadow-sm inline-block px-3 py-1 text-sm font-medium text-red-800 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring active:border-red-600">
                Cancel
            </button>
        );
    }

    function SubmitButton({onClick}) {
        return (
            <>
                <button
                    className="outline outline-1 inline-flex rounded-md border bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring">
                    Submit
                </button>
            </>
        );
        // return (
        //   <button
        //     type="button"
        //     className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
        //     onClick={onClick}
        //   >
        //     Submit Ticket
        //   </button>
        // );
    }

    function submitTicket() {
        // var delta = r.current.editor.getContents();
        // alert(r.current);
        // let userInput = document.getElementsByClassName("ql-editor")[0].innerHTML;
        readRef.current.editor.setContents(editorRef.current.editor.getContents());
    }

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
            <div
                className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md">
                    <div className="font-sans text-4xl text-center">
                        <h2>Submit Ticket</h2>
                    </div>
                    <Form/>
                    <div className="pt-6 h-64">
                        <Quill/>
                    </div>
                    <div className="flex justify-end">
                        <div className="mx-2">
                            <CancelButton/>
                        </div>
                        <SubmitButton onClick={submitTicket}/>
                    </div>
                    <div>
                        <ReadQuill/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;