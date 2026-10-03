import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#0a0c0f",
            paper: "#12151a",
        },

        primary: {
            main: "#ff335f",
        },

        text: {
            primary: "#f3f4f6",
            secondary: "#8f959f",
        },

        divider: "rgba(255, 255, 255, 0.07)",
    },

    typography: {
        fontFamily: "Inter, Arial, sans-serif",

        h1: {
            fontWeight: 800,
            letterSpacing: "-2px",
        },

        h2: {
            fontWeight: 800,
            letterSpacing: "-1.5px",
        },

        h3: {
            fontWeight: 800,
            letterSpacing: "-1.5px",
        },

        h4: {
            fontWeight: 800,
            letterSpacing: "-1.5px",
        },

        h5: {
            fontWeight: 700,
            letterSpacing: "-0.8px",
        },

        h6: {
            fontWeight: 700,
            letterSpacing: "-0.5px",
        },

        button: {
            fontWeight: 700,
            textTransform: "none",
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                    },
                },
            },
        },
    },
});

export default theme;