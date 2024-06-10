import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState } from "react";
import CodeEditor from "./CodeEditor";

const CodeProblem = () => {
  const [taskCount, setTaskCount] = useState(1);

  const value = (taskCount / 3) * 100;

  return (
    <div className="h-full flex flex-col bg-primary50">
      {/* Second bar */}
      <div className="h-[12%] bg-white text-primary950 p-2 sm:py-12 sm:px-36 text-start flex justify-between items-baseline sm:items-center">
        <div className="w-1/2 sm:w-full">
          <h1 className="text-base sm:text-3xl font-bold break-words">
            dsdadasdsdadsdsdaddsdsd
          </h1>
        </div>

        <div className="flex items-center justify-center w-1/2 sm:w-full">
          <p className="text-sm sm:text-base font-bold">Current problem</p>
          <div style={{ height: "80px", width: "80px" }}>
            <Gauge
              value={value}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: ["12px", "15px"],
                  fontWeight: "bold",
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${taskCount} / 3`}
            />
          </div>
        </div>
      </div>

      {/* Main content*/}
      <div className="h-full m-1 sm:m-5 flex flex-col sm:flex-row justify-between gap-5">
        <div className="w-full sm:w-2/5 h-[100vh] overflow-y-scroll bg-white rounded-md p-3 shadow-md">
          <p>Source: </p>
          <p>Difficulty: </p>
          <p>Time limit: </p>
          <p>Memory limit:</p>

          <h1 className="text-md font-bold mt-5">Problem statement</h1>
          <pre className="code-pre"></pre>

          <h1 className="text-md font-bold">Constraints</h1>
          <pre className="code-pre"></pre>

          <h1 className="text-md font-bold">Input</h1>
          <pre className="code-pre"></pre>

          <h1 className="text-md font-bold">Output</h1>
          <pre className="code-pre"></pre>

          <h1 className="text-md font-bold">Examples</h1>
          <pre className="code-pre"></pre>

          <h1 className="text-md font-bold">Explanation</h1>
          <pre className="code-pre"></pre>
        </div>

        <div className="w-full h-[100vh] sm:w-3/5 flex flex-col text-left gap-5">
          <CodeEditor></CodeEditor>
        </div>
      </div>
    </div>
  );
};

export default CodeProblem;
