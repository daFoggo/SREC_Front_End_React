import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField } from "@mui/material";
import { rootAPI } from "../utils/ip";
import routes from "../routes/routeConfig";
import PageLoadingOverlay from "./PageLoadingOverlay";
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import CodeIcon from '@mui/icons-material/Code';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import VoicePredictionCharts from "./VoicePredictionChart";
import VideoPredictionCharts from "./VideoPredictionChart";

const SummaryDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [candidateData, setCandidateData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const [matchingScoreData, setMatchingScoreData] = useState();
  const [virtualInterviewData, setVirtualInterviewData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [finalScoreData, setFinalScoreData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.sub.role === "recruiter") {
      handleGetCVMatchingScore();
      handleGetFinalCodeScore();
      handleGetVirtualInterviewScore();
    } else {
      navigate(routes.forbidden);
    }
  }, [user, selectedQuestion]);

  const handleGetCVMatchingScore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/get-summary-cv-matching`, {
        candidate_id: localStorage.getItem('selected_candidate_id'),
        job_id: localStorage.getItem('job_id')
      });
      setMatchingScoreData(response.data.matching_score.matching_score);
      setCandidateData(response.data.candidate_data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetFinalCodeScore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/get-final-code-score`, {
        candidate_id: localStorage.getItem('selected_candidate_id')
      });
      setFinalScoreData(response.data.final_score);
      setAssessmentData(response.data.assessment_data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetVirtualInterviewScore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/get-summary-virtual-interview`, {
        candidate_id: localStorage.getItem('selected_candidate_id')
      });
      setVirtualInterviewData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSelectedQuestion = (direction) => {
    switch (direction) {
      case "next":
        if (selectedQuestion < virtualInterviewData.length - 1) {
          setSelectedQuestion(selectedQuestion + 1);
        }
        break;
      case "prev":
        if (selectedQuestion > 0) {
          setSelectedQuestion(selectedQuestion - 1);
        }
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <PageLoadingOverlay />;
  }

  return (
    <div className="p-2 sm:p-10 w-full min-h-screen flex flex-col">
      <div className="mb-6">
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#052b4c',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            marginRight: 2,
            minWidth: 0,
            "&:hover": {
              backgroundColor: "#052b4c",
              color: "white",
            },
          }}
          onClick={() => {
            navigate(routes.summary_table);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button variant="text" sx={{
          color: "#052b4c",
          width: "fit-content",
        }}>
          <AssessmentIcon
            sx={{
              fontSize: 40,
              marginRight: 2,
            }}
          />
          <h1 className="font-bold text-3xl">Summary report</h1>
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6 flex-grow">
        <div className="bg-white shadow-md rounded-xl w-full lg:w-1/4 p-5 mb-6 lg:mb-0">
          <h1 className="mb-5 text-bold text-2xl text-primary950 font-bold">{candidateData.full_name}</h1>
          <div className="flex flex-col gap-6">
            <TextField value={candidateData.candidate_id} label={"Candidate ID"}></TextField>
            <TextField value={candidateData.email} label={"Email"}></TextField>
            <TextField value={candidateData.level} label={"Level"}></TextField>
          </div>
        </div>
        
        <div className="flex flex-col w-full lg:w-3/4 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-center items-center relative min-h-[200px]">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">CV Matching score</p>
              <p className="font-bold text-3xl text-primary500">{matchingScoreData ? matchingScoreData.toFixed(2) : 'N/A'}</p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <JoinInnerIcon sx={{
                  fontSize: 200,
                  color: "#b7e2ff",
                }} />
              </span>
            </div>
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-center items-center relative min-h-[200px]">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">Code assessment score</p>
              <p className="font-bold text-3xl text-primary500">{finalScoreData} / 3</p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <CodeIcon sx={{
                  fontSize: 200,
                  color: "#b7e2ff",
                }} />
              </span>
            </div>
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-center items-center relative min-h-[200px]">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">Personality Trait</p>

            </div>
          </div>
          <div className="flex flex-col gap-3 bg-white shadow-md rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-bold text-xl text-primary950">Virtual Interview Score - Question {selectedQuestion + 1} </h1>
              </div>
              <div>
                <Button
                  variant="text"
                  onClick={() => handleUpdateSelectedQuestion("prev")}
                >
                  <WestIcon sx={{
                    fontSize: 25,
                    color: "#052b4c",
                  }} />
                </Button>
                <Button
                  variant="text"
                  onClick={() => handleUpdateSelectedQuestion("next")}
                >
                  <EastIcon sx={{
                    fontSize: 25,
                    color: "#052b4c",
                  }} />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-bold text-primary950">
                  Answer matching score: {virtualInterviewData && virtualInterviewData[selectedQuestion] ? virtualInterviewData[selectedQuestion].answer_matching_data.toFixed(2) : 'N/A'}
                </p>

                <p className="font-bold text-primary950">
                  Pronunciation score: {virtualInterviewData && virtualInterviewData[selectedQuestion] ? JSON.parse(virtualInterviewData[selectedQuestion].prediction_data).voice_prediction.pronunciation_score : 'N/A'}
                </p>
              </div>

              <div>
                <p className="font-bold text-primary900">Voice analyze chart: </p>
                <div className="bg-primary50 rounded-xl p-2">
                  <VoicePredictionCharts voicePrediction={virtualInterviewData && virtualInterviewData[selectedQuestion] ? JSON.parse(virtualInterviewData[selectedQuestion].prediction_data).voice_prediction : null} />
                </div>
              </div>

              <div>
                <p className="font-bold text-primary900">Video analyze chart: </p>
                <div className="bg-primary50 rounded-xl p-2">
                  <VideoPredictionCharts videoPrediction={virtualInterviewData && virtualInterviewData[selectedQuestion] ? JSON.parse(virtualInterviewData[selectedQuestion].prediction_data).video_prediction : null} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
