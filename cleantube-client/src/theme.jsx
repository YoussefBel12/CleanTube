import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#0b0b0d",
            paper: "#151518",
        },

        primary: {
            main: "#ff335f",
        },

        text: {
            primary: "#f5f5f5",
            secondary: "#92929a",
        },
    },

    typography: {
        fontFamily: "Inter, Arial, sans-serif",

        h4: {
            letterSpacing: "-1px",
        },
    },

    shape: {
        borderRadius: 14,
    },
});

export default theme;