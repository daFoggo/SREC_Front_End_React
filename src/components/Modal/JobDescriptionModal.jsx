import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { TextField } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

const JobDescriptionModal = ({ isModalOpen, handleCloseModal, jobDescriptionData }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isSmallScreen? "90%" : "50%",
                    height: isSmallScreen? "90%" : "auto",
                    overflowY: "scroll",
                    bgcolor: "background.paper",
                    borderRadius: "0.5rem",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1 className='font-bold text-sm text-slate-500'>Job descriptions</h1>
                <h2 className="font-bold text-2xl text-primary950 mb-5 text-left">Job Title: {jobDescriptionData.name}</h2>

                <div className='flex flex-col gap-5 mt-5'>
                    <TextField id="degree" label="Degree" value={jobDescriptionData.degree} multiline/>
                    <TextField id="major" label="Major" value={jobDescriptionData.major} multiline/>
                    <TextField id="hard_skills" label="Hard skills" value={jobDescriptionData.hard_skills} multiline/>
                    <TextField id="soft_skills" label="Soft skills" value={jobDescriptionData.soft_skills} multiline/>
                    <TextField id="language" label="Language" value={jobDescriptionData.language} multiline/>
                    <TextField id="certificate" label="Certificate" value={jobDescriptionData.certificate} multiline/>
                    <TextField id="experience" label="Experience" value={jobDescriptionData.experience} multiline/>
                </div>

                <div className="flex gap-3 mt-5 self-end">
                    <button
                        className="bg-transparent rounded-md border-primary500 border py-2 px-5 text-primary950 hover:bg-primary500 hover:text-white duration-300"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </Box>
        </Modal>
    )
}

export default JobDescriptionModal;

JobDescriptionModal.propTypes = {
    isModalOpen: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    jobDescriptions: PropTypes.object
}