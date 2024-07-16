import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import JobDescriptionModal from "./Modal/JobDescriptionModal";
import CandidateModal from "./Modal/CandidateModal";
import { useMediaQuery, useTheme, Autocomplete, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import PageLoadingOverlay from "./PageLoadingOverlay";
import { rootAPI } from '../utils/ip';
import axios from 'axios';
import { useCVMatching } from "../context/CVMatchingContext";
import ConfirmModal from "./Modal/ConfirmModal";
import { useAlert } from '../context/AlertContext';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { useAuth } from "../context/AuthContext";
import { Tooltip } from "@mui/material";

const CVMatching = () => {
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const { CVMatchingData = [], jobDescriptionData, updateCVMatchingData, updateJobDescriptionData } = useCVMatching();
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [selectedCandidateNumber, setSelectedCandidateNumber] = useState(1);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSelectJobDialogOpen, setIsSelectJobDialogOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const candidateNumbers = [1, 10, 50, 100, 500, 1000];

  useEffect(() => {
    if (selectedJobId !== null) {
      localStorage.setItem("job_id", selectedJobId);
      setLoading(true);
      Promise.all([getJobDescriptionData(), getCVMatchingData()])
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [selectedJobId]);

  const getJobDescriptionData = async () => {
    try {
      const response = await axios.get(`${rootAPI}/job-descriptions`);
      updateJobDescriptionData(response.data);
    } catch (error) {
      console.error("Error fetching job descriptions:", error);
      throw error;
    }
  };

  const getCVMatchingData = async () => {
    try {
      const cvMatchingResponse = await axios.post(`${rootAPI}/cvs-matching`, {
        id: selectedJobId,
      });
      updateCVMatchingData(cvMatchingResponse.data);
    } catch (error) {
      console.error("Error fetching CV matching data:", error);
      throw error;
    }
  };


  const handleSendEmail = async () => {
    const filteredRows = rows.filter(candidate => candidate.gmail !== "none");
    const sortedRows = filteredRows.sort((a, b) => b.matching_point - a.matching_point);
    const topCandidates = sortedRows.slice(0, selectedCandidateNumber);
    topCandidates.push(
      {
        name: "Test",
        gmail: "accpgrnay2@gmail.com",
        level: "middle"
      }
    )

    try {
      setIsEmailSent(true);

      const response = await axios.post(`${rootAPI}/generate-account-and-send-email`, {
        recruiter_id: user.sub.id,
        candidates: topCandidates.map(candidate => ({
          name: candidate.name,
          gmail: candidate.gmail,
          level: jobDescriptionData[selectedJobId].level,
          matching_score: candidate.matching_score,
        })),
        job_id: selectedJobId,
      });

      showAlert({
        message: response.data.msg,
        type: "success"
      });
      setIsEmailSent(false);
      handleCloseConfirmModal();
    } catch (error) {
      console.error("Failed to send emails:", error);
      showAlert({
        message: "Failed to send emails",
        type: "error"
      });
      setIsEmailSent(false);
    }
  };

  const handleSendSingleEmail = async (candidate) => {
    try {
      setIsEmailSent(true);

      const response = await axios.post(`${rootAPI}/generate-account-and-send-email`, {
        recruiter_id: user.sub.id,
        candidates: [{
          name: candidate.name,
          gmail: candidate.gmail,
          level: jobDescriptionData[selectedJobId].level
        },
        {
          name: "Test",
          gmail: "accpgrnay2@gmail.com",
          level: "middle"
        }
        ]
      });

      showAlert({
        message: response.data.msg,
        type: "success"
      });
      setIsEmailSent(false);
    } catch (error) {
      console.error("Failed to send email:", error);
      showAlert({
        message: "Failed to send email",
        type: "error"
      });
      setIsEmailSent(false);
    }
  }

  const handleNumberChange = (event, value) => {
    setSelectedCandidateNumber(value);
  };

  const handleOpenJobModal = () => {
    setIsJobModalOpen((prev) => !prev);
  };

  const handleCloseJobModal = () => {
    setIsJobModalOpen((prev) => !prev);
  };

  const handleOpenCandidateModal = (candidate) => {
    setSelectedCandidate(candidate)
    setIsCandidateModalOpen((prev) => !prev);
  };

  const handleCloseCandidateModal = () => {
    setSelectedCandidate({})
    setIsCandidateModalOpen((prev) => !prev);
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen((prev) => !prev);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen((prev) => !prev);
  };

  const handleOpenSelectJobDialog = () => {
    setIsSelectJobDialogOpen(true);
  };

  const handleCloseSelectJobDialog = () => {
    setIsSelectJobDialogOpen(false);
  };

  const handleSelectedJobId = (id) => {
    setSelectedJobId(id);
    setIsSelectJobDialogOpen(false);
  };

  const rows = CVMatchingData ? CVMatchingData.map((candidate, index) => ({
    id: index + 1,
    name: candidate.name,
    age: candidate.age,
    personality: candidate.personality,
    gmail: candidate.gmail,
    academic: candidate.academic,
    major: candidate.major,
    experience: candidate.experience,
    skills: candidate.skills,
    language: candidate.language,
    certificate: candidate.certificate,
    matching_score: candidate.cv_matching * 100,
  })) : [];

  const columns = [
    { field: "id", headerName: "ID", flex: isSmallScreen ? undefined : 0.5, width: isSmallScreen ? 70 : undefined },
    { field: "name", headerName: "Name", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "age", headerName: "Age", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "gmail", headerName: "Gmail", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "skills", headerName: "Skills", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "certificate", headerName: "Certificate", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "matching_score", headerName: "Matching Score", type: "number", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    {
      field: "actions",
      headerName: "Actions",
      flex: isSmallScreen ? undefined : 1,
      width: isSmallScreen ? 200 : undefined,
      renderCell: (params) => (
        <div>
          <Tooltip title="View full data">
            <Button variant="text" onClick={() => handleOpenCandidateModal(params.row)}>
              <VisibilityIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Send email">
            <Button variant="text" onClick={
              () => {
                handleSendSingleEmail({
                  name: params.row.name,
                  gmail: params.row.gmail,
                })
              }
            }>
              <ForwardToInboxIcon />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (loading) return <PageLoadingOverlay />;

  return (
    <div className="p-2 sm:py-12 sm:px-36">
      <p className="font-bold text-sm text-slate-500 pl-2">Job</p>
      <div className="flex items-center text-center mb-2">
        <Tooltip title="Click to view job description">
          <Button onClick={handleOpenJobModal}>
            <h1 className="font-bold text-2xl sm:text-4xl text-primary950 text-left">
              {jobDescriptionData && jobDescriptionData[selectedJobId]
                ? jobDescriptionData[selectedJobId].title
                : "No job selected"}
            </h1>
          </Button>
        </Tooltip>
        <Tooltip title="Click to change the job">
          <Button onClick={handleOpenSelectJobDialog}>
            <ChangeCircleOutlinedIcon />
          </Button>
        </Tooltip>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        getCellClassName={(params) => {
          if (params.field === "matching_point") {
            return "text-blue-500 font-bold";
          }
        }}
        sx={{
          backgroundColor: "white",
          padding: "5px",
        }}
      ></DataGrid>

      <div className="flex gap-5 mt-5 w-full sm:w-1/4">
        <Autocomplete
          value={selectedCandidateNumber}
          onChange={handleNumberChange}
          options={candidateNumbers}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => (
            <TextField {...params} label="Select the number of top candidates" variant="filled" />
          )}
          sx={{
            flex: 1,
          }}
        />
        <button className="bg-primary500 hover:bg-primary600 text-white font-semibold rounded-lg py-2 px-5" onClick={handleOpenConfirmModal}>
          Send email
        </button>
      </div>

      <JobDescriptionModal isModalOpen={isJobModalOpen} handleCloseModal={handleCloseJobModal} jobDescriptionData={jobDescriptionData[selectedJobId]}></JobDescriptionModal>
      <CandidateModal isModalOpen={isCandidateModalOpen} handleCloseModal={handleCloseCandidateModal} candidateData={selectedCandidate}></CandidateModal>

      <ConfirmModal
        isModalOpen={isConfirmModalOpen}
        handleCloseModal={handleCloseConfirmModal}
        modalTitle="Are you sure want to send the emails"
        modalDescription={`The email which include account information will be sent to ${selectedCandidateNumber} candidates.`}
        loadingRunSubmit={isEmailSent}
        handleRunSubmit={handleSendEmail}
      >
      </ConfirmModal>

      {/* Select Job Dialog */}
      <Dialog open={isSelectJobDialogOpen} onClose={handleCloseSelectJobDialog}>
        <DialogTitle sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#052b4c"
        }}>Select Job</DialogTitle>
        <DialogContent>
          <List>
            {jobDescriptionData.map((job, index) => (
              <ListItem key={index} disablePadding>
                <p className="font-bold text-primary800">{index + 1}. </p>
                <ListItemButton onClick={() => handleSelectedJobId(job.id)}>
                  <ListItemText primary={job.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSelectJobDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CVMatching;
