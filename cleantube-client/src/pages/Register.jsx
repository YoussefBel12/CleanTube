
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

function Register() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await api.post(
                "/Authentication/register",
                {
                    userName,
                    email,
                    password,
                }
            );

            navigate("/login");
        } catch (error) {
            console.error("Register Error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed."
            );
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
                    Create account
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
                        required
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        sx={{ mb: 2 }}
                        required
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
                        required
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
                        {loading
                            ? "Creating account..."
                            : "Register"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Register;

