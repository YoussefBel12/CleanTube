import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";

import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/Authentication/login",
                {
                    userName,
                    password,
                }
            );

            localStorage.setItem("token", response.data);

            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);

            setError("Invalid username or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ mb: 3 }}
                >
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        label="Username"
                        value={userName}
                        onChange={(e) =>
                            setUserName(e.target.value)
                        }
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        sx={{ mb: 2 }}
                    />

                    {error && (
                        <Typography
                            color="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;;