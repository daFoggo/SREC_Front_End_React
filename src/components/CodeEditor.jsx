import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { language_versions, code_snippets } from "../constants";
import { emkcAPI } from "../utils/ip";
import { CircularProgress } from "@mui/material";
import { useCode } from "../context/CodeContext";
import processData from "../utils/processInputOutput";
import axios from "axios";
import SubmitCodeConfirm from "./Modal/SubmitCodeConfirm";

const languages = Object.entries(language_versions);

const CodeEditor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState(code_snippets["cpp"]);
    const [language, setLanguage] = useState("cpp");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loadingRunCustom, setLoadingRunCustom] = useState(false);
    const [loadingRunPublic, setLoadingRunPublic] = useState(false);
    const [loadingRunSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState("");
    const { currentProblem, codeData, totalPoint, updatePoint, updateCodeData, updateCurrentProblem } = useCode();

    const editorRef = useRef();

    const handleOpenModal = () => {
        setIsModalOpen((prev) => !prev);
    }

    const handleCloseModal = () => {
        setIsModalOpen((prev) => !prev);
    }


    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleChangeLanguage = (e) => {
        setInput("");
        setOutput("");
        setLanguage(e.target.value);
        setValue(code_snippets[e.target.value]);
    };

    const handleChangeInput = (e) => {
        setInput(e.target.value);
    };

    const getFileExtension = (language) => {
        switch (language) {
            case "javascript":
                return "js";
            case "python":
                return "py";
            case "java":
                return "java";
            case "csharp":
                return "cs";
            case "cpp":
                return "cpp";
            case "php":
                return "php";
            default:
                return "txt";
        }
    };

    const executeCode = async (sourceCode, language, input) => {
        const fileName = `main.${getFileExtension(language)}`;

        try {
            const response = await axios.post(`${emkcAPI}/execute`, {
                files: [
                    {
                        name: fileName,
                        content: sourceCode,
                    },
                ],
                language,
                version: language_versions[language],
                stdin: input,
            });
            return {
                output: response.data.run.stdout,
                error: response.data.run.stderr || "",
            };
        } catch (error) {
            console.error(error);
            let errorMessage = "Error occurred while processing the request.";
            if (error.response) {
                errorMessage = `Server error: ${error.response.status} - ${error.response.data.message}`;
            } else if (error.request) {
                errorMessage = "Network error: No response received from the server.";
            }
            return { error: errorMessage };
        }
    };

    const runTestCase = async (input, output, runningType) => {
        let inputCases = processData(input);
        let outputCases = processData(output);
        let finalResult = true;

        try {
            runningType === "submit" ? setLoadingSubmit(true) : setLoadingRunPublic(true);

            let failedTestCases = [];
            for (let i = 0; i < inputCases.length; i++) {
                const inputCase = inputCases[i];
                const expectedOutput = outputCases[i];
                const sourceCode = editorRef.current.getValue();
                if (!sourceCode) {
                    console.error("No source code provided.");
                    return;
                }

                const { output: actualOutput, error } = await executeCode(
                    sourceCode,
                    language,
                    inputCase
                );

                if (error) {
                    console.error("Error occurred while running the code:", error);
                    setError(error);
                    return;
                }

                if (actualOutput.trim() !== expectedOutput.trim()) {
                    console.log(`Test case ${i + 1}: Failed`);
                    finalResult = false;
                    failedTestCases.push(i + 1);
                    console.log("Expected Output:", expectedOutput);
                    console.log("Actual Output:", actualOutput);
                } else {
                    console.log(`Test case ${i + 1}: Passed`);
                }
            }

            if (finalResult) {
                console.log("All test cases passed.");
                runningType === "submit" ? updatePoint("correct") : null;
            } else {
                console.log("Some test cases failed:", failedTestCases.join(", "));
                runningType === "submit" ? updatePoint("incorrect") : null;
            }

        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            runningType === "submit" ? setLoadingSubmit(false) : setLoadingRunPublic(false);
        }
    };

    const runCustomCase = async () => {
        setLoadingRunCustom(true);
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        const { output, error } = await executeCode(sourceCode, language, input);
        setOutput(output);
        setError(error);
        setLoadingRunCustom(false);
    };

    const handleRunPublic = async () => {
        try {
            await runTestCase(
                codeData[`test_${currentProblem}`].public_input,
                codeData[`test_${currentProblem}`].public_output,
                "public"
            );
        } catch (error) {
            console.error("An error occurred while running public test cases:", error);
        }
    };

    const handleRunSubmit = async () => {
        try {
            await runTestCase(
                codeData[`test_${currentProblem}`].gen_input,
                codeData[`test_${currentProblem}`].gen_output,
                "submit"
            );
        } catch (error) {
            console.error("An error occurred while submitting the code:", error);
        }

        handleCloseModal();
        updateCurrentProblem();

    };


    useEffect(() => {
        console.log("TotalPoint updated:", totalPoint);
    }, [totalPoint]);

    useEffect(() => {
        setValue(code_snippets[language])
    }, [currentProblem])

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
                        className={
                            "w-full h-[30vh] p-3 rounded-md shadow-md outline-primary500 focus:shadow-primary200" +
                            (error ? " placeholder-red-500" : "")
                        }
                        placeholder={error ? error : 'Click "Run code" to see the result'}
                    ></textarea>
                </div>
            </div>

            <div className="flex gap-5 mt-5">
                <button
                    className="bg-white text-primary500 font-bold py-2 px-5 rounded-md hover:bg-slate-300 hover:text-primary950 duration-300 shadow-md"
                    onClick={runCustomCase}
                >
                    {loadingRunCustom ? (
                        <CircularProgress size={20} />
                    ) : (
                        "Run with custom input"
                    )}
                </button>

                <button
                    className="bg-white text-primary500 font-bold py-2 px-5 rounded-md hover:bg-slate-300 hover:text-primary950 duration-300 shadow-md"
                    onClick={handleRunPublic}
                >
                    {loadingRunPublic ? (
                        <CircularProgress size={20} />
                    ) : (
                        "Run with test cases"
                    )}
                </button>

                <button
                    className="bg-primary500 text-white font-bold py-2 px-5 rounded-md hover:bg-primary600 duration-300 shadow-md shadow-blue-300"
                    onClick={handleOpenModal}
                >
                    Submit
                </button>
            </div>

            <SubmitCodeConfirm isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleRunSubmit={handleRunSubmit} loadingRunSubmit={loadingRunSubmit} />
        </div>
    );
};

export default CodeEditor;
