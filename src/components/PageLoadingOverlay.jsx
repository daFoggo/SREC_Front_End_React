import { CircularProgress, Box } from "@mui/material";

const PageLoadingOverlay = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress />
            <h1 className="mt-2 text-primary950">Please wait a moment <br />
                We are preparing for you...
            </h1>
        </Box>
    )
}

export default PageLoadingOverlay


