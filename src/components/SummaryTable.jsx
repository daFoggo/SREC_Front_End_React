import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { rootAPI } from '../utils/ip';
import routes from '../routes/routeConfig';
import {
  Button, Tooltip, Typography, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import NavigationSharpIcon from '@mui/icons-material/NavigationSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PieChartIcon from '@mui/icons-material/PieChart';

const SummaryTable = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.sub.role === 'recruiter') {
      handleGetCandidateWithRecruiter();
    } else {
      navigate(routes.forbidden);
    }
  }, [user, navigate]);

  const handleGetCandidateWithRecruiter = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${rootAPI}/get-recruiter-with-candidates`, {
        recruiter_id: user.sub.id,
        job_id: localStorage.getItem('selected_job'),
      });
      setCandidateData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetSelectedCandidate = (candidateId) => {
    localStorage.setItem('selected_candidate_id', candidateId);
    navigate(routes.summary_dashboard);
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'full_name', label: 'Full Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'level', label: 'Level', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
  ];

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
          onClick={() => navigate(routes.cv_matching)}
        >
          <ArrowBackIcon />
        </Button>
        <Button variant="text" sx={{
          color: "#052b4c",
          width: "fit-content",
        }}>
          <PieChartIcon
            sx={{
              fontSize: 40,
              marginRight: 1,
            }}
          />
          <h1 className="font-bold text-3xl">Summary Table</h1>
        </Button>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
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
              {candidateData.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const formattedValue = 
                      column.id === 'id' ? rowIndex + 1 :
                      column.id === 'level' ? capitalizeWords(value) :
                      value;

                    return (
                      <TableCell key={column.id}>
                        {column.id === 'actions' ? (
                          <Tooltip title="Go to summary page">
                            <IconButton onClick={() => handleSetSelectedCandidate(row.candidate_id)}>
                              <NavigationSharpIcon sx={{ transform: 'rotate(90deg)', color: "#10a1fc" }} />
                            </IconButton>
                          </Tooltip>
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
      )}
    </div>
  );
};

export default SummaryTable;