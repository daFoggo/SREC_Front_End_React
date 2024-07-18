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
import Base64VideoPlayer from './Base64VideoPlayer';

const VirtualInterview = () => {
  const { user } = useAuth();
  const { interviewData, currentQuestion, questionData, handleUpdateInterviewData, handleUpdateCurrentQuestion, handleUpdateQuestionData } = useVirtualInterview();

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [isMuting, setIsMuting] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [question, setQuestion] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  const isInterviewDone = localStorage.getItem("is_interview_done");

  const navigate = useNavigate();
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  useEffect(() => {
    if (!capturing && recordedChunks.length > 0) {
      handleSubmitVideo();
    }
  }, [capturing, recordedChunks]);

  useEffect(() => {
    if (!user || isInterviewDone) {
      navigate(routes.login_candidate);
    } else {
      if (currentQuestion === 5) {
        localStorage.setItem("is_interview_done", true);
        navigate(routes.thank_you);
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
      setPlayVideo(false);
    } catch (error) {
      console.error('Error getting interview data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmitVideo = async () => {
    setIsSubmitting(true);
    try {
      const blob = new Blob(recordedChunks, { type: 'video/mp4' });
  
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = async function () {
          const base64data = reader.result.split(',')[1];
  
          const jsonData = {
            interview_id: interviewData[0].interview_id,
            candidate_id: user.sub.id,
            current_question_index: currentQuestion,
            status: true,
            video_data: base64data
          };
  
          try {
            const response = await axios.put(`${rootAPI}/submit-virtual-interview-scores`, jsonData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });

            resolve();
          } catch (error) {
            console.error('Error submitting video:', error);
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAnalyzeVideo = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${rootAPI}/virtual-interview-analyze`, {
        candidate_id: user.sub.id,
        current_question_index: currentQuestion,
        interview_id: interviewData[0].interview_id,
        question_id: interviewData[0].question_id,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
    } catch (error) {
      console.error('Error analyzing video:', error);
    } finally {
      setIsSubmitting(false);
      handleUpdateCurrentQuestion(currentQuestion + 1);
    }
  };

  const getQuestion = (questionId) => {
    if (questionData && interviewData[0]) {
      for (let questionType in questionData) {
        if (questionData.hasOwnProperty(questionType)) {
          for (let question of questionData[questionType]) {
            if (question.question_id === questionId) {
              return question
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
    setPlayVideo(false);

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
      mimeType: "video/mp4"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    const currentQuestionData = getQuestion(interviewData[0].question_id);
    setQuestion(currentQuestionData.question);
    setShowQuestion(true);
    setPlayVideo(true);
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  };

  const handleStopCaptureClick = async () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setCountdown(null);
    setQuestion(null);
    setShowQuestion(false);
    setPlayVideo(false);
    
    try {
      await handleSubmitVideo();
      await handleAnalyzeVideo();
    } catch (error) {
      console.error('Error in stop capture process:', error);
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

  if (isLoading || isSubmitting) {
    return <PageLoadingOverlay />;
  }

  return (
    <div className="h-full flex flex-col lg:flex-row justify-between py-2 lg:py-0 gap-3 lg:gap-0" style={{minHeight: 'calc(100vh - 74px)'}}>
      <div className="flex flex-col gap-5 flex-1 items-center justify-center p-4">
        <Webcam
          audio={!isMuting}
          ref={webcamRef}
          height={"auto"}
          width={"100%"}
          videoConstraints={videoConstraints}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
            maxWidth: "800px",
          }}
        />
        <div className="flex gap-3 mt-4">
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

      <div className="bg-white gap-5 h-full w-full lg:w-1/3 flex flex-col shadow-md py-6 px-4" style={{height: 'auto'}}>
        <div className="w-full rounded-md px-16 lg:px-24 mb-4">
          {interviewData && interviewData[0] && getQuestion(interviewData[0]?.question_id) && (
            <Base64VideoPlayer 
              base64String={getQuestion(interviewData[0]?.question_id)?.video_data}
              play={playVideo}
            />
          )}
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
        ) : (
          <div className='flex flex-col gap-2 text-left bg-primary200 rounded-md p-3'>
            <h1 className="font-semibold text-2xl">Note</h1>
            <p className="text-sm lg:text-base">
              To <b>start the interview</b>, click on the <b>middle button</b> below the Webcam. <br />
              When you <b>finish your answer</b>, you <b>must click on it</b> again to start the next question. <br />
              After <b>finishing all</b> the questions, you will be <b>redirected</b> to the next round. <br />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VirtualInterview;