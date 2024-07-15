import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Webcam from 'react-webcam';
import { useAuth } from '../context/AuthContext';
import { useVirtualInterview } from '../context/VirtualInterviewContext';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routeConfig';
import PageLoadingOverlay from './PageLoadingOverlay';

const VirtualInterview = () => {
  const { user } = useAuth();
  const { interviewData, currentQuestion, questionData, handleUpdateInterviewData, handleUpdateCurrentQuestion, handleUpdateQuestionData } = useVirtualInterview();

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [isMuting, setIsMuting] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);

  const navigate = useNavigate();
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  useEffect(() => {
    if (!capturing && recordedChunks.length > 0) {
      handleDownload();
    }
  }, [capturing, recordedChunks]);

  useEffect(() => {
    if (!user) {
      navigate(routes.login);
    } else {
      if (currentQuestion === 5) {
        navigate(routes.home);
      } else {
        handleGetVirtualInterviewData();
      }
    }
  }, [user, currentQuestion, navigate]);

  const handleGetVirtualInterviewData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${rootAPI}/get-virtual-interview-scores`, {
        candidate_id: user.sub.id,
      });

      handleUpdateInterviewData(response.data.interview_data);
      handleUpdateCurrentQuestion(response.data.current_question_index);
      handleUpdateQuestionData(response.data.question_data);
      setQuestion(null);
      setShowQuestion(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVideo = async () => {
    try {
      const response = await axios.put(`${rootAPI}/submit-virtual-interview-scores`, {
        interview_id: interviewData[0].interview_id,
        current_question_index: currentQuestion,
        status: 1
      });
    } catch (error) {
      console.error(error);
    } finally {
      handleUpdateCurrentQuestion(currentQuestion + 1);
    }
  }

  const getAnswer = (questionId) => {
    if (questionData && interviewData[0]) {
      for (let questionType in questionData) {
        if (questionData.hasOwnProperty(questionType)) {
          for (let question of questionData[questionType]) {
            if (question.question_id === questionId) {
              return question.question;
            }
          }
        }
      }
    }
    return null;
  }

  const handleStartCaptureClick = () => {
    let countdownTime = 5;
    setCountdown(countdownTime);
    setQuestion(null);
    setShowQuestion(false);

    const countdownInterval = setInterval(() => {
      countdownTime -= 1;
      setCountdown(countdownTime);

      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        startRecording();
      }
    }, 1000);
  };

  const startRecording = () => {
    setCapturing(true);
    setCountdown(null);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setQuestion(getAnswer(interviewData[0].question_id));
    setShowQuestion(true);
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setCountdown(null);
    setQuestion(null);
    setShowQuestion(false);
    handleSubmitVideo();
  };

  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = `${user.sub.id}-capture.mp4`;
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  };

  const handleMuteClick = () => {
    setIsMuting(prev => !prev);

    if (webcamRef.current && webcamRef.current.stream) {
      const audioTrack = webcamRef.current.stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuting;
      }
    }
  };

  if (isLoading) {
    return <PageLoadingOverlay />;
  }

  return (
    <div className="h-full flex flex-col sm:flex-row justify-between py-2 sm:py-0 gap-3 sm:gap-0">
      <div className="flex flex-col gap-5 flex-1 items-center justify-center">
        <Webcam
          audio={!isMuting}
          ref={webcamRef}
          height={"70%"}
          width={"70%"}
          videoConstraints={videoConstraints}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
        <div className="flex gap-3">
          {isMuting ? (
            <Tooltip title="Allow audio">
              <Button variant="contained" sx={{
                backgroundColor: '#f44336', color: 'white', '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }} onClick={handleMuteClick}>
                <MicOffIcon />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Mute audio">
              <Button variant="contained" sx={{
                backgroundColor: '#10a1fc', color: 'white', '&:hover': {
                  backgroundColor: '#0d8bec',
                },
              }} onClick={handleMuteClick}>
                <MicIcon />
              </Button>
            </Tooltip>
          )}

          {capturing ? (
            <Tooltip title="Stop recording">
              <Button variant="contained" sx={{
                backgroundColor: '#f44336', color: 'white', '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }} onClick={handleStopCaptureClick}>
                <PlayCircleFilledWhiteOutlinedIcon />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Start the interview">
              <Button disabled={countdown !== null} variant="contained" sx={{
                backgroundColor: '#10a1fc', color: 'white', '&:hover': {
                  backgroundColor: '#0d8bec',
                },
              }} onClick={handleStartCaptureClick}>
                <NotStartedOutlinedIcon />
              </Button>
            </Tooltip>
          )}

          <Tooltip title="Settings">
            <Button variant="contained" sx={{
              backgroundColor: '#10a1fc', color: 'white', '&:hover': {
                backgroundColor: '#0d8bec',
              },
            }}>
              <SettingsOutlinedIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="bg-white gap-5 h-full w-full sm:w-1/3 flex flex-col shadow-md py-10 px-5">
        <div className="bg-primary100 w-full rounded-md h-1/3">
          AI model
        </div>

        {countdown !== null ? (
          <div className='flex flex-col items-center text-center gap-2'>
            <p className='text-xl'>Starting in {countdown}s</p>
          </div>
        ) : showQuestion ? (
          <div className='flex flex-col items-center text-center gap-2'>
            <h1 className='font-bold text-2xl text-primary950'>Question {currentQuestion}</h1>
            <p className='text-xl'>{question}</p>
          </div>
        ) :
          (
            <div className='flex flex-col gap-2 text-left bg-primary200 rounded-md p-3'>
              <h1 className="font-semibold text-2xl">Note</h1>
              <p>To <b>start the interview</b>, click on the <b>middle button</b> below the Webcam. <br />
                When you <b>finish your answer</b>, you <b>must click on it</b> again to start the next question. <br />
                After <b>finishing all</b> the question, you will be <b>redirected</b> to the next round. <br />
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default VirtualInterview;