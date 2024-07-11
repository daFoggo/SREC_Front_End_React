import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import JobDescriptionModal from "./Modal/JobDescriptionModal";
import CandidateModal from "./Modal/CandidateModal";
import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import PageLoadingOverlay from "./PageLoadingOverlay";
import { rootAPI } from '../utils/ip';
import axios from 'axios';
import { useCVMatching } from "../context/CVMatchingContext";
import { Autocomplete, TextField, Button } from "@mui/material";
import ConfirmModal from "./Modal/ConfirmModal";

const CVMatching = () => {
  const { CVMatchingData = {}, jobDescriptionData, updateCVMatchingData, updateJobDescriptionData } = useCVMatching();
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [selectedCandidateNumber, setSelectedCandidateNumber] = useState(0);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const candidateNumbers = [1, 10, 50, 100, 500, 1000];

  useEffect(() => {
    getCVMatchingData();
  }, []);

  const getCVMatchingData = async () => {
    try {
      setLoading(true);
      const cvMatchingResponse = await axios.get(`${rootAPI}/cvs-matching`);
      updateCVMatchingData(cvMatchingResponse.data);

      const jobDescriptionResponse = await axios.get(`${rootAPI}/job-descriptions`);
      updateJobDescriptionData(jobDescriptionResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    console.log("Sent email to", selectedCandidateNumber, "candidates");
  }


  const handleNumberChange = (event) => {
    setSelectedCandidateNumber(event.target.value);
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

  const rows = Object.keys(CVMatchingData).map((key, index) => ({
    id: index + 1,
    name: key,
    academic: CVMatchingData[key].academic,
    experience: CVMatchingData[key].experience,
    gmail: CVMatchingData[key].gmail,
    major: CVMatchingData[key].major,
    skills: CVMatchingData[key].skills,
    matching_percent: (CVMatchingData[key].cv_matching * 100).toFixed(2),
  }));

  const columns = [
    { field: "id", headerName: "ID", flex: isSmallScreen ? undefined : 0.5, width: isSmallScreen ? 70 : undefined },
    { field: "name", headerName: "Name", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "experience", headerName: "Experience", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "gmail", headerName: "Gmail", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "skills", headerName: "Skills", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "matching_percent", headerName: "Matching Percent ( % )", type: "number", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    {
      field: "actions",
      headerName: "Actions",
      flex: isSmallScreen ? undefined : 1,
      width: isSmallScreen ? 100 : undefined,
      renderCell: (params) => (
        <div>
          <Button variant="text" onClick={() => handleOpenCandidateModal(params.row)}>
            <VisibilityIcon />
          </Button>
          <Button variant="text">
            <ForwardToInboxIcon />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <PageLoadingOverlay />;

  return (
    <div className="p-2 sm:py-12 sm:px-36">
      <p className="font-bold text-sm text-slate-500 pl-2">Job</p>
      <Button onClick={handleOpenJobModal} sx={{
        marginBottom: 2,
      }}>
        <h1 className="font-bold text-2xl sm:text-4xl text-primary950 text-left">{Object.keys(jobDescriptionData)[0]}</h1>
      </Button>
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
          if (params.field === "matching_percent") {
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
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Select number of candidate" variant="filled" />
          )}
          sx={{
            flex: 1,
          }}
        />
        <button className="bg-primary500 hover:bg-primary600 text-white font-semibold rounded-lg py-2 px-5" onClick={handleOpenConfirmModal}>
          Send email
        </button>
      </div>

      <JobDescriptionModal isModalOpen={isJobModalOpen} handleCloseModal={handleCloseJobModal} jobDescriptionData={jobDescriptionData}></JobDescriptionModal>
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
    </div>
  );
};

export default CVMatching;
