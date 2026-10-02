import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LayoutProvider } from "./context/LayoutContext";

import App from "./App";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LayoutProvider>
                    <App />
                </LayoutProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);