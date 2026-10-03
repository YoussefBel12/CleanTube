{/* 
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

export default Login;

*/}



import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded as ArrowIcon,
    LockOutlined as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    PersonOutlineRounded as PersonIcon,
} from "@mui/icons-material";

import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 5,
                background:
                    "radial-gradient(circle at 75% 20%, rgba(255,51,95,0.08), transparent 32%), #0a0c0f",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 520,
                    height: 520,
                    left: -300,
                    bottom: -260,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(124,58,237,0.07), transparent 68%)",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.3,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                        "linear-gradient(to bottom, black, transparent 75%)",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: 1040,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "0.9fr 1fr",
                    },
                    gap: { xs: 5, md: 8 },
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        pl: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.1,
                            mb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: "#ff335f",
                                boxShadow:
                                    "0 0 24px rgba(255,51,95,0.65)",
                            }}
                        />

                        <Typography
                            sx={{
                                color: "#f3f4f6",
                                fontSize: 18,
                                fontWeight: 850,
                                letterSpacing: "-0.7px",
                            }}
                        >
                            CleanTube
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            maxWidth: 470,
                            color: "#f1f2f4",
                            fontSize: { md: 42, lg: 52 },
                            lineHeight: 1.02,
                            fontWeight: 850,
                            letterSpacing: "-3px",
                        }}
                    >
                        Your videos.
                        <br />
                        Your world.
                    </Typography>

                    <Typography
                        sx={{
                            mt: 2.2,
                            maxWidth: 400,
                            color: "#70757f",
                            fontSize: 14,
                            lineHeight: 1.7,
                        }}
                    >
                        Sign in to continue watching, follow your
                        subscriptions and share your own videos.
                    </Typography>

                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#555a63",
                        }}
                    >
                        <Box
                            sx={{
                                width: 32,
                                height: 1,
                                backgroundColor:
                                    "rgba(255,255,255,0.1)",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 10,
                                fontWeight: 800,
                                letterSpacing: "1.5px",
                                textTransform: "uppercase",
                            }}
                        >
                            Watch · Create · Connect
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 450,
                        mx: "auto",
                        p: { xs: 2.5, sm: 4 },
                        borderRadius: "22px",
                        background:
                            "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))",
                        border:
                            "1px solid rgba(255,255,255,0.075)",
                        boxShadow:
                            "0 30px 90px rgba(0,0,0,0.28)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <Box sx={{ mb: 3.5 }}>
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                mb: 2.2,
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ff4770",
                                background:
                                    "linear-gradient(135deg, rgba(255,51,95,0.15), rgba(255,51,95,0.035))",
                                border:
                                    "1px solid rgba(255,51,95,0.12)",
                            }}
                        >
                            <LockIcon sx={{ fontSize: 21 }} />
                        </Box>

                        <Typography
                            sx={{
                                color: "#f3f4f6",
                                fontSize: 29,
                                fontWeight: 850,
                                letterSpacing: "-1.5px",
                            }}
                        >
                            Welcome back
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.8,
                                color: "#70757f",
                                fontSize: 13,
                            }}
                        >
                            Sign in to your CleanTube account.
                        </Typography>
                    </Box>

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
                            required
                            autoComplete="username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon
                                            sx={{
                                                color: "#5f646d",
                                                fontSize: 19,
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldSx}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            autoComplete="current-password"
                            sx={{
                                ...fieldSx,
                                mt: 2,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon
                                            sx={{
                                                color: "#5f646d",
                                                fontSize: 19,
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (value) => !value
                                                )
                                            }
                                            edge="end"
                                            sx={{
                                                color: "#626771",
                                                "&:hover": {
                                                    color: "#ff4770",
                                                },
                                            }}
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon
                                                    sx={{
                                                        fontSize: 19,
                                                    }}
                                                />
                                            ) : (
                                                <VisibilityIcon
                                                    sx={{
                                                        fontSize: 19,
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {error && (
                            <Box
                                sx={{
                                    mt: 2,
                                    px: 1.5,
                                    py: 1.2,
                                    borderRadius: "10px",
                                    backgroundColor:
                                        "rgba(255,71,112,0.07)",
                                    border:
                                        "1px solid rgba(255,71,112,0.12)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#ff718c",
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                >
                                    {error}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            endIcon={
                                !loading && (
                                    <ArrowIcon
                                        sx={{
                                            fontSize: 19,
                                        }}
                                    />
                                )
                            }
                            sx={{
                                mt: 2.5,
                                minHeight: 52,
                                borderRadius: "12px",
                                fontSize: 13,
                                fontWeight: 800,
                                background:
                                    "linear-gradient(135deg, #ff335f, #e62955)",
                                boxShadow:
                                    "0 12px 30px rgba(255,51,95,0.18)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #ff4770, #ed315c)",
                                    boxShadow:
                                        "0 15px 35px rgba(255,51,95,0.26)",
                                },
                                "&.Mui-disabled": {
                                    background:
                                        "rgba(255,255,255,0.07)",
                                    color: "#656970",
                                },
                            }}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in"}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            mt: 3,
                            pt: 2.5,
                            borderTop:
                                "1px solid rgba(255,255,255,0.055)",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                color: "#686d76",
                                fontSize: 12,
                            }}
                        >
                            Don't have an account?{" "}
                        </Typography>

                        <Typography
                            component={RouterLink}
                            to="/register"
                            sx={{
                                color: "#ff4770",
                                fontSize: 12,
                                fontWeight: 750,
                                textDecoration: "none",
                                "&:hover": {
                                    color: "#ff7090",
                                },
                            }}
                        >
                            Create one
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        minHeight: 52,
        borderRadius: "11px",
        backgroundColor: "rgba(255,255,255,0.018)",
        "& fieldset": {
            borderColor: "rgba(255,255,255,0.075)",
        },
        "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.14)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#ff335f",
            borderWidth: "1px",
        },
    },
    "& .MuiInputLabel-root": {
        color: "#747982",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#ff4770",
    },
    "& .MuiInputBase-input": {
        color: "#eceef0",
        fontSize: 13,
    },
};

export default Login;

