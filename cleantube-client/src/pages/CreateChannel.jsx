import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Avatar,
} from "@mui/material";

import {
    ArrowBack as ArrowBackIcon,
    Check as CheckIcon,
} from "@mui/icons-material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CreateChannel() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError("Channel name is required.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await api.post("/Channels", {
                name: name.trim(),
            });

            navigate("/channel");
        } catch (error) {
            console.error("Create Channel Error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to create your channel."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    marginLeft: "220px",
                    minHeight: "100vh",
                    padding: { xs: 2, md: 5 },
                    paddingTop: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: "100%",
                        maxWidth: 620,
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        background:
                            "linear-gradient(145deg, #151518, #101014)",
                    }}
                >
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/channel")}
                        sx={{
                            mb: 4,
                            color: "text.secondary",
                        }}
                    >
                        Back to channel
                    </Button>

                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 5,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                mx: "auto",
                                mb: 3,
                                fontSize: 36,
                                fontWeight: 800,
                                bgcolor: "primary.main",
                            }}
                        >
                            {name.trim()
                                ? name.trim().charAt(0).toUpperCase()
                                : "?"}
                        </Avatar>

                        <Typography
                            variant="h4"
                            fontWeight={900}
                            sx={{
                                letterSpacing: "-1px",
                                mb: 1,
                            }}
                        >
                            Create your channel
                        </Typography>

                        <Typography color="text.secondary">
                            Choose a name for your channel. You can
                            build your audience and share your videos
                            here.
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            fullWidth
                            label="Channel name"
                            placeholder="e.g. Youssef Tech"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setError("");
                            }}
                            error={Boolean(error)}
                            helperText={
                                error ||
                                `${ name.length }/100 characters`
                            }
inputProps = {{
    maxLength: 100,
                            }}
sx = {{ mb: 3 }}
                        />

    < Button
type = "submit"
fullWidth
variant = "contained"
size = "large"
startIcon = {< CheckIcon />}
disabled = { loading || !name.trim()}
sx = {{
    py: 1.5,
        borderRadius: 3,
            fontWeight: 800,
                fontSize: "1rem",
                            }}
                        >
{
    loading
    ? "Creating..."
        : "Create Channel"
}
                        </Button >
                    </Box >
                </Paper >
            </Box >
        </>
    );
}

export default CreateChannel;

