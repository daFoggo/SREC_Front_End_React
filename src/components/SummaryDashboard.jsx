import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { rootAPI } from "../utils/ip";
import routes from "../routes/routeConfig";
import PageLoadingOverlay from "./PageLoadingOverlay";

const SummaryDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [candidateId, setCandidateId] = useState(null);

  useEffect(() => {
    if (user.sub.role === "recruiter") {
      handleGetCVMatching();
    } else {
      navigate(routes.forbidden);
    }
  }, []);

  const handleGetCVMatching = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/cvs-matching`, {
        id: Number(localStorage.getItem("job_id")),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="bg-white shadow-md rounded-xl w-1/4 p-2">
          candidate data
        </div>
        <div className="flex flex-col w-3/4 h-full gap-6">
          <div className="flex w-full h-1/3 justify-evenly gap-6">
            <div className="w-1/3 h-full bg-white shadow-md rounded-xl">
              cv matching score
            </div>
            <div className="w-1/3 h-full bg-white shadow-md rounded-xl">
              code assessment score
            </div>
            <div className="w-1/3 h-full bg-white shadow-md rounded-xl">
              virtual interview matching score
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
