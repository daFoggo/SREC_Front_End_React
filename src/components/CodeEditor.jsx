import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { language_versions, code_snippets } from "../constants";
import { emkcAPI } from "../utils/ip";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const languages = Object.entries(language_versions);

const CodeEditor = () => {
    const [value, setValue] = useState(code_snippets["cpp"]);
    const [language, setLanguage] = useState("cpp");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loadingRun, setLoadingRun] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
    }, [])
    
    const editorRef = useRef();

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleChangeLanguage = (e) => {
        setInput("");
        setOutput("");
        setLanguage(e.target.value);
        setValue(code_snippets[e.target.value]);
    }

    const handleChangeInput = (e) => {
        setInput(e.target.value);
    }

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setLoadingRun(true);
            const response = await axios.post(`${emkcAPI}/execute`, {
                files: [
                    {
                        name: "main.cpp",
                        content: sourceCode
                    }
                ],
                language,
                version: language_versions[language],
                stdin: input
            });
            setOutput(response.data.run.stdout);
            setError(response.data.run.stderr || "");
        } catch (error) {
            console.error(error);
            if (error.response) {
                setError(`Server error: ${error.response.status} - ${error.response.data.message}`);
            } else if (error.request) {
                setError("Network error: No response received from the server.");
            } else {
                setError("Error occurred while processing the request.");
            }
        } finally {
            setLoadingRun(false);
        }
    };

    const handleSubmit = () => {
        console.log("Submit code");
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Language Selector */}
            <div className="flex gap-3">
                <FormControl variant="filled">
                    <InputLabel id="language-select-label">Language</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={language}
                        label="Language"
                        onChange={handleChangeLanguage}
                    >
                        {languages.map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {key} {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {/* Editor */}
            <div className="h-[50vh] shadow-md">
                <Editor
                    height="100%"
                    theme="vs-light"
                    language={language}
                    value={value}
                    onChange={(v) => setValue(v)}
                    onMount={onMount}
                    loading={<div>Loading...</div>}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-1/2">
                    <h2 className="font-bold text-primary950 mb-1">Input</h2>
                    <textarea
                        value={input}
                        onChange={handleChangeInput}
                        className="w-full h-[30vh] p-3 rounded-md shadow-md outline-primary500 focus:shadow-primary200"
                        placeholder="Insert your custom input here"
                    ></textarea>
                </div>

                <div className="sm:w-1/2">
                    <h2 className="font-bold text-primary950 mb-1">Output</h2>
                    <textarea
                        value={output}
                        readOnly
                        className={"w-full h-[30vh] p-3 rounded-md shadow-md outline-primary500 focus:shadow-primary200" + (error ? " placeholder-red-500" : "")}
                        placeholder={error ? error : 'Click "Run code" to see the result'}
                    ></textarea>
                </div>
            </div>

            <div className="flex gap-5 mt-5">
                <button className="bg-white text-primary500 font-bold py-2 px-5 rounded-md hover:bg-slate-300 hover:text-primary950 duration-300 shadow-md" onClick={runCode}>
                    {loadingRun ? <CircularProgress size={20} /> : "Run code"}
                </button>

                <button className="bg-primary500 text-white font-bold py-2 px-5 rounded-md hover:bg-primary600 duration-300 shadow-md shadow-blue-300" onClick={handleSubmit}>
                    {loadingSubmit ? <CircularProgress size={20} color="inherit" /> : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default CodeEditor;
