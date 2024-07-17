import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../context/AlertContext'
import axios from 'axios'
import { rootAPI } from '../utils/ip'
import routes from '../routes/routeConfig'
import {
    TextField, Button, Tooltip, ThemeProvider, Typography, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const JobDescription = () => {
    const [jobData, setJobData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user.sub.role === 'recruiter') {
            handleGetJobData()
        } else {
            navigate(routes.forbidden)
        }
    }, [user, navigate])

    const handleGetJobData = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${rootAPI}/get-jobs`)
            setJobData(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleNavigateToCVMatching = (jobId) => {
        localStorage.setItem("selected_job", jobId)
        localStorage.setItem("level", jobData.find(job => job.id === jobId).level)
        navigate(routes.cv_matching)
    }
    const columns = [
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'title', label: 'Title', minWidth: 200 },
        { id: 'level', label: 'Level', minWidth: 100 },
        { id: 'number_of_candidates', label: 'Applied', minWidth: 100 },
        { id: 'data_string', label: 'Skills required', minWidth: 300 },
        { id: 'description', label: 'Description', minWidth: 300 },
        { id: 'actions', label: 'Actions', minWidth: 100 },
    ]

    return (
        <div className="p-2 sm:py-12 sm:px-36">
            <div className="flex items-center text-center mb-10">
                <Button variant="text" sx={{
                    color: "#052b4c",
                    width: "fit-content",
                }}>
                    <DescriptionOutlinedIcon
                        sx={{
                            fontSize: 40,
                            marginRight: 1,
                        }}
                    />
                    <h1 className="font-bold text-3xl">Job descriptions</h1>
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
                            {jobData.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        if (column.id === 'actions') {
                                            return (
                                                <TableCell key={column.id}>
                                                    <Tooltip title="Get CV matching data with this job">
                                                        <IconButton onClick={() => handleNavigateToCVMatching(row.id)}>
                                                            <LaunchIcon sx={{"color": "#10a1fc"}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            );
                                        }
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id}>
                                                <Typography variant="body2">
                                                    {column.id === 'description'
                                                        ? value.substring(0, 100) + '...'
                                                        : column.id === 'data_string'
                                                            ? value.startsWith('skills:')
                                                                ? (value.substring(8).charAt(0).toUpperCase() + value.substring(9)).substring(0, 100) + '...'
                                                                : (value.charAt(0).toUpperCase() + value.slice(1)).substring(0, 100) + '...'
                                                            : value}
                                                </Typography>
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
    )
}

export default JobDescription