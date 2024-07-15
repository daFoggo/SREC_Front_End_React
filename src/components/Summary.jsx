import React from 'react'
import { useMediaQuery, useTheme, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PageLoadingOverlay from './PageLoadingOverlay';
import { rootAPI } from '../utils/ip';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DataGrid } from '@mui/x-data-grid';
import NavigationSharpIcon from '@mui/icons-material/NavigationSharp';

const Summary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [candidateData, setCandidateData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if (user.sub.role === 'recruiter') {
      handleGetCandidateWithRecruiter();
    } else {
      navigate('/forbidden');
    }
  }, [])

  const handleGetCandidateWithRecruiter = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${rootAPI}/get-recruiter-with-candidates`, {
        recruiter_id: user.sub.id
      })
      handleSetCandidateData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSetSelectedCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    handleAddToLocalStorage(candidate);
    
  }

  const handleAddToLocalStorage = (candidate) => {
    localStorage.setItem('selected_candidate_id', candidate);
  }

  const handleSetCandidateData = (data) => {
    setCandidateData(data);
  }

  const rows = candidateData ? (candidateData.map((candidate) => {
    return {
      id: candidate.candidate_id,
      full_name: candidate.full_name,
      email: candidate.email,
      level: candidate.level[0].toUpperCase() + candidate.level.slice(1),
    }
  })) : [];

  const columns = [
    { field: "id", headerName: "ID", flex: isSmallScreen ? undefined : 0.5, width: isSmallScreen ? 70 : undefined },
    { field: "full_name", headerName: "Full Name", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "email", headerName: "Email", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "level", headerName: "Level", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    {
      field: "actions",
      headerName: "Go to summary page",
      flex: isSmallScreen ? undefined : 1,
      width: isSmallScreen ? 200 : undefined,
      renderCell: (params) => (
        <div>
          <Button variant="text" onClick={() => handleSetSelectedCandidate(params.row.id)}>
            <NavigationSharpIcon sx={{
              transform: 'rotate(90deg)',
            }} />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <PageLoadingOverlay />
  }

  return (
    <div className='p-2 sm:py-12 sm:px-36 w-full h-full'>
      <div className='bg-white w-full h-full'>
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
          pageSizeOptions={[10]} sss
        ></DataGrid>
      </div>
    </div>
  )
}

export default Summary