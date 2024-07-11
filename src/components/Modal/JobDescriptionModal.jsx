import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

const JobDescriptionModal = ({isModalOpen, handleCloseModal, jobDescriptionData}) => {
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
                    width: 800,
                    bgcolor: "background.paper",
                    borderRadius: "0.5rem",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "text.primary",
                    borderBottom: "1px solid",
                    borderColor: "gray.300",
                    paddingBottom: "1rem",
                }}>
                    {jobDescriptionData.name}
                </Typography>

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