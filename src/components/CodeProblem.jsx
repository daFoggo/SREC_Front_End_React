import React, { useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import CodeEditor from "./CodeEditor";
import { useAuth } from "../context/AuthContext";
import { useCode } from "../context/CodeContext";
import { rootAPI } from "../utils/ip";
import { useNavigate } from "react-router-dom";
import PageLoadingOverlay from "./PageLoadingOverlay";
import extractCode from "../utils/extractCode";
import axios from "axios";
import routes from "../routes/routeConfig";

const CodeProblem = () => {
  const { currentProblem, codeData, updateCodeData } = useCode();
  const { jobLevel } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentProblem === "4") {
      navigate(routes.code_problem_result);
    } else {
      getCodeData();
    }
  }, [currentProblem]);

  const getCodeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${rootAPI}/get-${jobLevel}-code`);
      updateCodeData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!codeData) return <PageLoadingOverlay />;

  const chartValue = (currentProblem / 3) * 100;
  let { name, source, difficulty, timeLimit, memoryLimit, statement, input, output, constraints, example, explanation } = extractCode(codeData[`test_${currentProblem}`]);

  return (
    <div className="h-full flex flex-col bg-primary50">
      {/* Second bar */}
      <div className="h-[12%] sm:h-[5%] bg-white text-primary950 p-2 sm:py-12 sm:px-36 text-start flex justify-between items-baseline sm:items-center">
        <div className="w-1/2 sm:w-full">
          <h1 className="text-base sm:text-3xl font-bold break-words">
            {name}
          </h1>
        </div>

        <div className="flex items-center justify-center w-1/2 sm:w-full">
          <p className="text-sm sm:text-base font-bold">Current problem</p>
          <div style={{ height: "80px", width: "80px" }}>
            <Gauge
              value={chartValue}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: ["12px", "15px"],
                  fontWeight: "bold",
                  transform: "translate(0px, 0px)",
                },
              }}
              text={() => `${currentProblem} / 3`}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="h-full m-1 sm:m-5 flex flex-col sm:flex-row justify-between gap-5">
        <div className="w-full sm:w-2/5 h-[100vh] overflow-y-scroll bg-white rounded-md p-3 shadow-md">
          <p>Difficulty: {difficulty}</p>
          <p>Time limit: {timeLimit}</p>
          <p>Memory limit: {memoryLimit}</p>
          <p>Source: {source}</p>

          <h1 className="text-md font-bold mt-5">Problem statement :</h1>
          <pre className="code-pre">{statement}</pre>

          <h1 className="text-md font-bold">Constraints :</h1>
          <pre className="code-pre">{constraints}</pre>

          <h1 className="text-md font-bold">Input :</h1>
          <pre className="code-pre">{input}</pre>

          <h1 className="text-md font-bold">Output :</h1>
          <pre className="code-pre">{output}</pre>

          <h1 className="text-md font-bold">Examples :</h1>
          <pre className="code-pre">{example}</pre>

          <h1 className="text-md font-bold">Explanation :</h1>
          <pre className="code-pre">{explanation}</pre>
        </div>

        <div className="w-full h-[100vh] sm:w-3/5 flex flex-col text-left gap-5">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default CodeProblem;
