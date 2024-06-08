import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary50: {
            main: "#eff8ff"
        },
        primary100: {
            main: "#dff0ff"
        },
        primary200: {
            main: "#b7e2ff"
        },
        primary300: {
            main: "#77cbff"
        },
        primary400: {
            main: "#2eb1ff"
        },
        primary500: {
            main: "#10a1fc"
        },
        primary600: {
            main: "#0077d1"
        },
        primary700: {
            main: "#005ea9"
        },
        primary800: {
            main: "#01518b"
        },
        primary900: {
            main: "#074373"
        },
        primary950: {
            main: "#052b4c"
        }
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    },
});

export default theme;   