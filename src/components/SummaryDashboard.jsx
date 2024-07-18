import React, { useEffect, useState } from "react";
import axios from "axios";
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
import VoicePredictionChart from "./VoicePredictionChart";
import EmotionChart from "./EmotionChart";
import PieChart from "./PieChart";
import PersonalityChart from "./PersonalityChart";

const SummaryDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [candidateData, setCandidateData] = useState({});
  const [assessmentData, setAssessmentData] = useState([]);
  const [matchingScoreData, setMatchingScoreData] = useState(null);
  const [personalityData, setPersonalityData] = useState([]);
  const [virtualInterviewData, setVirtualInterviewData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [finalScoreData, setFinalScoreData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.sub?.role === "recruiter") {
      Promise.all([
        handleGetCVMatchingScore(),
        handleGetFinalCodeScore(),
        handleGetPersonalityScore(),
        handleGetVirtualInterviewScore()
      ]).then(() => setIsLoading(false))
        .catch(err => {
          setError("An error occurred while fetching data. Please try again.");
          setIsLoading(false);
        });
    } else {
      navigate(routes.forbidden);
    }
  }, [user, selectedQuestion]);

  const handleGetCVMatchingScore = async () => {
    try {
      const response = await axios.post(`${rootAPI}/get-summary-cv-matching`, {
        candidate_id: localStorage.getItem('selected_candidate_id'),
        job_id: localStorage.getItem('selected_job')
      });
      setMatchingScoreData(response.data.matching_score?.matching_score || null);
      setCandidateData(response.data.candidate_data || {});
    } catch (error) {
      console.error("Error fetching CV matching score:", error);
    }
  };

  const handleGetFinalCodeScore = async () => {
    try {
      const response = await axios.post(`${rootAPI}/get-final-code-score`, {
        candidate_id: localStorage.getItem('selected_candidate_id')
      });
      setFinalScoreData(response.data.final_score !== undefined ? response.data.final_score : null);
      setAssessmentData(response.data.assessment_data || []);
    } catch (error) {
      console.error("Error fetching final code score:", error);
      setFinalScoreData(null);
      setAssessmentData([]);
    }
  };

  const handleGetPersonalityScore = async () => {
    try {
      const response = await axios.post(`${rootAPI}/get-summary-survey`, {
        candidate_id: localStorage.getItem('selected_candidate_id')
      });
      setPersonalityData(response.data || []);
    } catch (error) {
      console.error("Error fetching personality score:", error);
      setPersonalityData(null);
    }
  }

  const handleGetVirtualInterviewScore = async () => {
    try {
      const response = await axios.post(`${rootAPI}/get-summary-virtual-interview`, {
        candidate_id: localStorage.getItem('selected_candidate_id')
      });
      setVirtualInterviewData(response.data || []);
    } catch (error) {
      console.error("Error fetching virtual interview score:", error);
      setVirtualInterviewData([]);
    }
  };

  const handleUpdateSelectedQuestion = (direction) => {
    setSelectedQuestion(prev => {
      if (direction === "next" && prev < virtualInterviewData.length - 1) {
        return prev + 1;
      } else if (direction === "prev" && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const renderAreaChartData = (payload) => {
    if (!payload) return [];
    const emotions = ['neutral', 'angry', 'disgust', 'fear', 'happy', 'sad', 'surprise'];
    return emotions.map(emotion => ({
      name: emotion,
      data: payload.map(element => element.emotion[emotion])
    }));
  };

  // const renderPieChartData = (payload) => {
  //   if (!payload) return [];
  //   const emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'];
  //   return emotions.map(emotion => ({
  //     name: emotion,
  //     y: payload.reduce((acc, cur) => acc + cur.emotion[emotion], 0)
  //   }));
  // };

  if (isLoading) return <PageLoadingOverlay />;
  if (error) return <div className="text-red-500">{error}</div>;

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
          onClick={() => navigate(routes.summary_table)}
        >
          <ArrowBackIcon />
        </Button>
        <Button variant="text" sx={{ color: "#052b4c", width: "fit-content" }}>
          <AssessmentIcon sx={{ fontSize: 40, marginRight: 2 }} />
          <h1 className="font-bold text-3xl">Summary report</h1>
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6 flex-grow">
        <div className="bg-white shadow-md rounded-xl w-full lg:w-1/4 p-5 mb-6 lg:mb-0">
          <h1 className="mb-5 text-bold text-2xl text-primary950 font-bold">{candidateData.full_name || 'N/A'}</h1>
          <div className="flex flex-col gap-6">
            <TextField value={candidateData.candidate_id || ''} label="Candidate ID" />
            <TextField value={candidateData.email || ''} label="Email" />
            <TextField value={candidateData.level || ''} label="Level" />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-3/4 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-center items-center relative min-h-[200px]">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">CV Matching score</p>
              <p className="font-bold text-3xl text-primary500">
                {matchingScoreData !== null ? matchingScoreData.toFixed(2) : 'N/A'}
              </p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <JoinInnerIcon sx={{ fontSize: 200, color: "#b7e2ff" }} />
              </span>
            </div>
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-center items-center relative min-h-[200px]">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">Code assessment score</p>
              <p className="font-bold text-3xl text-primary500">
                {finalScoreData !== null ? `${finalScoreData} / 3` : 'N/A'}
              </p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <CodeIcon sx={{ fontSize: 200, color: "#b7e2ff" }} />
              </span>
            </div>
            <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-center items-center relative min-h-[200px]">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3 z-10">Personality Test</p>
              {personalityData[0] ? <PersonalityChart personalityData={personalityData[0]} /> : <p className="font-bold text-3xl text-primary500">N/A</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-white shadow-md rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-bold text-xl text-primary950">Virtual Interview Score - Question {selectedQuestion + 1} </h1>
              </div>
              <div>
                <Button variant="text" onClick={() => handleUpdateSelectedQuestion("prev")}>
                  <WestIcon sx={{ fontSize: 25, color: "#052b4c" }} />
                </Button>
                <Button variant="text" onClick={() => handleUpdateSelectedQuestion("next")}>
                  <EastIcon sx={{ fontSize: 25, color: "#052b4c" }} />
                </Button>
              </div>
            </div>
            {virtualInterviewData[selectedQuestion] && (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-bold text-primary950">
                    Answer matching score: {virtualInterviewData[selectedQuestion].answer_matching_data?.toFixed(2) ?? 'N/A'}
                  </p>
                  <p className="font-bold text-primary950">
                    Pronunciation score: {
                      JSON.parse(virtualInterviewData[selectedQuestion].prediction_data || '{}')?.voice_prediction?.pronunciation_score.toFixed(2) ?? 'N/A'
                    }
                  </p>
                </div>

                <div>
                  <p className="font-bold text-primary900">Video analyze chart: </p>
                  <div className="rounded-xl p-2">
                    <EmotionChart
                      dataChart={renderAreaChartData(JSON.parse(virtualInterviewData[selectedQuestion].prediction_data || '{}').video_prediction)}
                    />
                  </div>

                  <div className="rounded-xl p-2">
                    {/* <PieChart
                      dataChart={renderPieChartData(JSON.parse(virtualInterviewData[selectedQuestion].prediction_data || '{}').voice_prediction)}
                    /> */}
                  </div>
                </div>

                <div>
                  <p className="font-bold text-primary900">Voice analyze chart: </p>
                  <div className="rounded-xl p-2">
                    <VoicePredictionChart
                      voicePrediction={JSON.parse(virtualInterviewData[selectedQuestion].prediction_data || '{}').voice_prediction}
                    />
                  </div>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;