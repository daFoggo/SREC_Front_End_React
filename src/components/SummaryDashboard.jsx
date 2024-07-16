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
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

const SummaryDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [candidateData, setCandidateData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const [matchingScoreData, setMatchingScoreData] = useState();
  const [finalScoreData, setFinalScoreData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.sub.role === "recruiter") {
      handleGetCVMatchingScore()
      handleGetFinalCodeScore()
    } else {
      navigate("/forbidden");
    }
  }, [user])

  const handleGetCVMatchingScore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/get-summary-cv-matching`, {
        candidate_id: localStorage.getItem('selected_candidate_id'),
        job_id: localStorage.getItem('job_id')
      })
      setMatchingScoreData(response.data.matching_score.matching_score);
      setCandidateData(response.data.candidate_data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGetFinalCodeScore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/get-final-code-score`, {
        candidate_id: localStorage.getItem('selected_candidate_id')
      })
      setFinalScoreData(response.data.final_score);
      setAssessmentData(response.data.assessment_data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <PageLoadingOverlay />
  }

  return (
    <div className="p-2 sm:p-10 w-full h-full flex flex-col gap-10">
      <div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#052b4c',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            minWidth: 0,

            "&:hover": {
              backgroundColor: "#052b4c",
              color: "white",
            },
          }}
          onClick={
            () => {
              navigate(routes.summary_table);
            }
          }
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
            }}
          />
          <h1 className="font-bold text-3xl">Summary report</h1>
        </Button>
      </div>
      <div className="flex justify-between w-full h-full gap-6">
        <div className="bg-white shadow-md rounded-xl w-1/4 p-5">
          <h1 className="mb-5 text-bold text-2xl text-primary950 font-bold">{candidateData.full_name}</h1>
          <div className="flex flex-col gap-6">
            <TextField value={candidateData.candidate_id} label={"Candidate ID"}></TextField>
            <TextField value={candidateData.email} label={"Email"}></TextField>
            <TextField value={candidateData.level} label={"Level"}></TextField>
          </div>
        </div>
        <div className="flex flex-col w-3/4 h-full gap-6">
          <div className="flex w-full h-1/3 justify-evenly gap-6">
            <div className="w-1/3 h-full bg-white shadow-md rounded-xl flex flex-col justify-center items-center relative">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">CV Matching score</p>
              <p className="font-bold text-3xl text-primary500">{matchingScoreData.toFixed(2)} / 100</p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <JoinInnerIcon sx={{
                  fontSize: 250,
                  color: "#b7e2ff",
                }} />
              </span>
            </div>
            <div className="w-1/3 h-full bg-white shadow-md rounded-xl flex flex-col justify-center items-center relative">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">Code assessment score</p>
              <p className="font-bold text-3xl text-primary500">{finalScoreData} / 3</p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <CodeIcon sx={{
                  fontSize: 250,
                  color: "#b7e2ff",
                }} />
              </span>
            </div>
            <div className="w-1/3 h-full bg-white shadow-md rounded-xl flex flex-col justify-center items-center relative">
              <p className="font-bold text-xl text-primary950 absolute top-3 left-3">Virtual Interview Score</p>
              <p className="font-bold text-3xl text-primary500">Score</p>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-25">
                <VideoCameraFrontIcon sx={{
                  fontSize: 200,
                  color: "#b7e2ff",
                }} />
              </span>
            </div>
          </div>

          <div className="flex flex-1 gap-6 bg-white shadow-md rounded-xl">
            virtual interview analysis chart
          </div>
        </div>

      </div>
    </div>
  );
};

export default SummaryDashboard;
