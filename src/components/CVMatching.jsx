import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import routes from '../routes/routeConfig';
import {
  Button, Tooltip, Typography, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Checkbox, Menu, MenuItem, ListItemText, ListItemIcon
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import JoinInnerOutlinedIcon from '@mui/icons-material/JoinInnerOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import PeopleIcon from '@mui/icons-material/People';
import CandidateModal from './Modal/CandidateModal';
import ConfirmModal from './Modal/ConfirmModal';
import { useAlert } from '../context/AlertContext';

const CVMatching = () => {
  const [rankingData, setRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isSingleMailModalOpen, setIsSingleMailModalOpen] = useState(false);
  const [isMultiMailModalOpen, setIsMultiMailModalOpen] = useState(false);
  const [selectedCandidateID, setSelectedCandidateID] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (user.sub.role === 'recruiter') {
      handleGetRankingData();
    } else {
      navigate(routes.forbidden);
    }
  }, [user, navigate]);

  const handleGetRankingData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${rootAPI}/get-ranked-candidates`, {
        id: localStorage.getItem('selected_job'),
      });
      const sortedData = response.data.sort((a, b) => b.cv_matching - a.cv_matching);
      setRankingData(sortedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendGmail = async (candidates) => {
    try {
      setIsSendingEmail(true);
      const response = await axios.post(`${rootAPI}/generate-account-and-send-email`, {
        recruiter_id: user.sub.id,
        job_id: localStorage.getItem("selected_job"),
        job_level: localStorage.getItem("level"),
        candidates: candidates
      });
      showAlert({
        message: "Email sent to candidates successfully",
        type: "success",
      })
    } catch (error) {
      showAlert({
        message: "Failed to send email",
        type: "error",
      })
    } finally {
      setIsSendingEmail(false);
      setIsSingleMailModalOpen(false);
      setIsMultiMailModalOpen(false);
    }
  };

  const handleOpenCandidateModal = (candidateID) => {
    setSelectedCandidateID(candidateID);
    setIsCandidateModalOpen(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    handleCloseMenu();
    setIsMultiMailModalOpen(true);
  };

  const getSelectedCandidates = () => {
    switch (selectedOption) {
      case '1/3':
        return rankingData.slice(0, Math.floor(rankingData.length / 3));
      case '1/2':
        return rankingData.slice(0, Math.floor(rankingData.length / 2));
      case '5':
        return rankingData.slice(0, 5);
      case '10':
        return rankingData.slice(0, 10);
      case '50':
        return rankingData.slice(0, 50);
      case '100':
        return rankingData.slice(0, 100);
      case 'all':
        return rankingData;
      default:
        return [];
    }
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'age', label: "Age / Date of birth", minWidth: 200 },
    { id: 'gmail', label: 'Email', minWidth: 150 },
    { id: 'academic', label: 'Academic', minWidth: 200 },
    { id: 'cv_matching', label: 'Matching score', minWidth: 200 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
  ];

  const getColorForCVMatching = (cv_matching, sortedData) => {
    const third = Math.floor(sortedData.length / 3);
    const half = Math.floor(sortedData.length / 2);
    const index = sortedData.findIndex(row => row.cv_matching === cv_matching);

    if (index < third) {
      return '#10a1fc';
    } else if (index < half) {
      return '#005ea9';
    } else {
      return '#074373';
    }
  };

  return (
    <div className="p-2 sm:py-12 sm:px-36">
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
            navigate(routes.job_description);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button variant="text" sx={{
          color: "#052b4c",
          width: "fit-content",
        }}>
          <h1 className="font-bold text-3xl">Candidate ranking</h1>
        </Button>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            variant="contained"
            onClick={handleOpenMenu}
            sx={{ marginBottom: 2, backgroundColor: '#10a1fc', color: 'white' }}
          >
            Send Bulk Emails
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleSelectOption('1/3')}>
              <ListItemIcon>
                <PercentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Top 1/3</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectOption('1/2')}>
              <ListItemIcon>
                <PercentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Top 1/2</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectOption('all')}>
              <ListItemIcon>
                <PercentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>All</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectOption('5')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Top 5</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectOption('10')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Top 10</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectOption('50')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Top 50</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSelectOption('100')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Top 100</ListItemText>
            </MenuItem>
          </Menu>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rankingData.map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const formattedValue = column.id === 'id'
                        ? rowIndex + 1
                        : column.id === 'gmail'
                          ? value
                          : column.id === 'cv_matching'
                            ? (value * 100).toFixed(2)
                            : typeof value === 'string'
                              ? capitalizeWords(value !== "none" ? value : 'N/A')
                              : '';

                      return (
                        <TableCell
                          key={column.id}
                          style={column.id === 'cv_matching'
                            ? { color: getColorForCVMatching(value, rankingData) }
                            : {}}
                        >
                          {column.id === 'actions' ? (
                            <div className='flex'>
                              <Tooltip title="View CV" onClick={() => handleOpenCandidateModal(rowIndex)}>
                                <IconButton>
                                  <VisibilityIcon sx={{ "color": "#10a1fc" }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Send Email">
                                <IconButton onClick={() => {
                                  setSelectedCandidateID(rowIndex);
                                  setIsSingleMailModalOpen(true);
                                }}>
                                  <MailIcon sx={{ "color": "#10a1fc" }} />
                                </IconButton>
                              </Tooltip>
                            </div>
                          ) : (
                            <Typography variant="body2">
                              {formattedValue}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {selectedCandidateID !== null && (
        <CandidateModal
          isModalOpen={isCandidateModalOpen}
          handleCloseModal={() => setIsCandidateModalOpen(false)}
          candidateData={rankingData[selectedCandidateID]}
        />
      )}

      <ConfirmModal
        isModalOpen={isSingleMailModalOpen}
        handleCloseModal={() => setIsSingleMailModalOpen(false)}
        loadingRunSubmit={isSendingEmail}
        handleRunSubmit={() => handleSendGmail([rankingData[selectedCandidateID]])}
        modalDescription="Are you sure you want to send an email to this candidate?"
        modalTitle="Send email"
      />

      <ConfirmModal
        isModalOpen={isMultiMailModalOpen}
        handleCloseModal={() => setIsMultiMailModalOpen(false)}
        loadingRunSubmit={isSendingEmail}
        handleRunSubmit={() => handleSendGmail(getSelectedCandidates())}
        modalDescription={`Are you sure you want to send emails to ${getSelectedCandidates().length} candidates (${selectedOption})?`}
        modalTitle="Send bulk emails"
      />

    </div>
  );
};

export default CVMatching;