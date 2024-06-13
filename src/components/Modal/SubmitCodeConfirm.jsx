import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { useCode } from "../../context/CodeContext";

const SubmitCodeConfirm = ({
    isModalOpen,
    handleCloseModal,
    loadingRunSubmit,
    handleRunSubmit
}) => {

    const { currentProblem } = useCode();

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
                    width: 500,
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
                    Are you sure want to submit?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {currentProblem === "3" ?
                        "After submitting, you can't edit your code anymore and you will be redirected to the next recruitment stage." :
                        "After submitting, you can't edit your code anymore and you will be redirected to the next problem."}
                </Typography>

                <div className="flex gap-3 mt-5 self-end">
                    <button
                        className="bg-transparent rounded-md border-primary500 border py-2 px-5 text-primary950 hover:bg-primary500 hover:text-white duration-300"
                        onClick={handleCloseModal}
                        disabled={loadingRunSubmit}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-primary500 text-white font-bold py-2 px-5 rounded-md hover:bg-primary600 duration-300 shadow-md shadow-blue-300"
                        onClick={handleRunSubmit}
                    >
                        {loadingRunSubmit ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Yes do it!"
                        )}
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default SubmitCodeConfirm;

SubmitCodeConfirm.propTypes = {
    isModalOpen: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    loadingRunSubmit: PropTypes.bool,
    handleRunSubmit: PropTypes.func,
};