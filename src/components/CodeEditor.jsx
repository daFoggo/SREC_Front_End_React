import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { language_versions, code_snippets } from "../constants";
import { emkcAPI, rootAPI } from "../utils/ip";
import { CircularProgress } from "@mui/material";
import { useCode } from "../context/CodeContext";
import processData from "../utils/processInputOutput";
import axios from "axios";
import SubmitCodeConfirm from "./Modal/SubmitCodeConfirm";
import { useAuth } from "../context/AuthContext";

const languages = Object.entries(language_versions);

const CodeEditor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loadingRunCustom, setLoadingRunCustom] = useState(false);
    const [loadingRunPublic, setLoadingRunPublic] = useState(false);
    const [loadingRunSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState("");

    const { currentProblem, codeData, totalPoint, updatePoint, updateCurrentProblem } = useCode();
    const { user } = useAuth();
    const editorRef = useRef();

    const handleOpenModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleCloseModal = () => {
        setIsModalOpen((prev) => !prev);
    };

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

        const testCases = inputCases.map((inputCase, index) => {
            const expectedOutput = outputCases[index];
            const sourceCode = editorRef.current.getValue();

            if (!sourceCode) {
                console.error("No source code provided.");
                return Promise.resolve({
                    index: index + 1,
                    passed: false,
                    message: "No source code provided."
                });
            }

            return executeCode(sourceCode, language, inputCase)
                .then(({ output: actualOutput, error }) => {
                    if (error) {
                        console.error("Error occurred while running the code:", error);
                        return {
                            index: index + 1,
                            passed: false,
                            message: error
                        };
                    }

                    const passed = (actualOutput.trim() === expectedOutput.trim());
                    if (!passed) {
                        console.log(`Test case ${index + 1}: Failed`);
                        console.log("Expected Output:", expectedOutput);
                        console.log("Actual Output:", actualOutput);
                    } else {
                        console.log(`Test case ${index + 1}: Passed`);
                    }

                    return {
                        index: index + 1,
                        passed: passed
                    };
                })
                .catch(error => {
                    console.error("Error occurred while running the code:", error);
                    return {
                        index: index + 1,
                        passed: false,
                        message: "Error occurred while running the code."
                    };
                });
        });

        try {
            if (runningType === "submit") {
                setLoadingSubmit(true);
            } else {
                setLoadingRunPublic(true);
            }

            const results = await Promise.all(testCases);
            const failedTestCases = results.filter(result => !result.passed).map(result => result.index);

            if (failedTestCases.length === 0) {
                console.log("All test cases passed.");
                if (runningType === "submit") updatePoint("correct");
            } else {
                console.log(`Some test cases failed: ${failedTestCases.join(", ")}`);
                if (runningType === "submit") updatePoint("incorrect");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            if (runningType === "submit") {
                setLoadingSubmit(false);
            } else {
                setLoadingRunPublic(false);
            }
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
        setLoadingSubmit(true);

        runTestCase(
            codeData[`test_${currentProblem}`].gen_input,
            codeData[`test_${currentProblem}`].gen_output,
            "submit"
        ).catch(error => {
            console.error("An error occurred while submitting the code:", error);
        });
        handleCloseModal();
        updateCurrentProblem();
    };

    const handleSavePoint = async () => {
        try {
            await axios.post(`${rootAPI}/save-code-score`, {
                user_id: user.id,
                code_score: totalPoint,
            });
        } catch (error) {
            console.error("An error occurred while saving the points:", error);
        }
    }

    useEffect(() => {
        console.log("TotalPoint updated:", totalPoint);
    }, [totalPoint]);

    useEffect(() => {
        setValue(code_snippets[language]);
    }, [currentProblem]);

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
