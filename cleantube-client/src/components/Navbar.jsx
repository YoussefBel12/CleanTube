
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    InputBase,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Button,
    Tooltip,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Add as AddIcon,
    NotificationsNone as NotificationsIcon,
   // Person as PersonIcon,
    SettingsOutlined as SettingsIcon,
    CloudUploadOutlined as UploadIcon,
    Login as LoginIcon,
    PersonAddOutlined as RegisterIcon,
    Logout as LogoutIcon,
    VideoLibraryOutlined as ChannelIcon,
    
} from "@mui/icons-material";

import { useLayout } from "../context/LayoutContext";
import { jwtDecode } from "jwt-decode";

function Navbar() {
    const navigate = useNavigate();
    const { toggleSidebar } = useLayout();

    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("");

    const menuOpen = Boolean(anchorEl);

    const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(token);

    let username = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);

            username =
                decoded.unique_name ||
                decoded.name ||
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ] ||
                "";
        } catch (error) {
            console.error("JWT decode error:", error);
        }
    }

    const avatarLetter = username
        ? username.charAt(0).toUpperCase()
        : "?";

    /*
     * ============================================================
     * MENU
     * ============================================================
     */

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        handleMenuClose();
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        handleMenuClose();
        navigate("/login");
    };

    /*
     * ============================================================
     * SEARCH
     * ============================================================
     */

    const handleSearch = () => {
        const query = search.trim();

        if (!query) return;

        navigate(
            `/search?query=${encodeURIComponent(query)}`
        );
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) =>
                    theme.zIndex.drawer + 10,

                background:
                    "linear-gradient(180deg, rgba(9,11,14,0.96) 0%, rgba(9,11,14,0.90) 100%)",

                backdropFilter: "blur(20px)",

                borderBottom:
                    "1px solid rgba(255,255,255,0.055)",

                boxShadow:
                    "0 8px 35px rgba(0,0,0,0.18)",

                "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "18%",
                    right: "18%",
                    bottom: -1,
                    height: 1,
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,51,95,0.20), transparent)",
                    pointerEvents: "none",
                },
            }}
        >
            <Toolbar
                sx={{
                    minHeight:
                        "70px !important",

                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                        lg: 3,
                    },

                    gap: {
                        xs: 0.8,
                        sm: 1.2,
                        md: 1.8,
                    },
                }}
            >
                {/* ================================================== */}
                {/* MENU BUTTON                                         */}
                {/* ================================================== */}

                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        width: 42,
                        height: 42,
                        flexShrink: 0,
                        color: "#858a93",
                        borderRadius: "11px",

                        "&:hover": {
                            color: "#f0f1f3",
                            backgroundColor:
                                "rgba(255,255,255,0.055)",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/* ================================================== */}
                {/* LOGO                                                */}
                {/* ================================================== */}

                <Box
                    onClick={() => navigate("/")}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.2,
                        cursor: "pointer",
                        flexShrink: 0,
                        mr: {
                            xs: 0.5,
                            sm: 1,
                            md: 2,
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 18,
                                sm: 21,
                            },
                            fontWeight: 900,
                            letterSpacing: "-1.1px",
                            color: "#f4f5f7",
                            lineHeight: 1,
                        }}
                    >
                        Clean
                        <Box
                            component="span"
                            sx={{
                                color: "#ff335f",
                            }}
                        >
                            Tube
                        </Box>
                    </Typography>

                    <Box
                        sx={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor:
                                "#ff335f",
                            mt: 1.6,
                            ml: 0.4,
                            boxShadow:
                                "0 0 10px rgba(255,51,95,0.7)",
                        }}
                    />
                </Box>

                {/* ================================================== */}
                {/* SEARCH                                               */}
                {/* ================================================== */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        height: {
                            xs: 40,
                            sm: 43,
                        },

                        width: "100%",
                        maxWidth: {
                            xs: "none",
                            sm: 470,
                            lg: 570,
                        },

                        mx: {
                            xs: 0,
                            md: "auto",
                        },

                        px: {
                            xs: 1.2,
                            sm: 1.5,
                        },

                        borderRadius: "12px",

                        background:
                            "rgba(255,255,255,0.035)",

                        border:
                            "1px solid rgba(255,255,255,0.07)",

                        transition:
                            "border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",

                        "&:hover": {
                            borderColor:
                                "rgba(255,255,255,0.11)",
                        },

                        "&:focus-within": {
                            background:
                                "rgba(255,255,255,0.045)",
                            borderColor:
                                "rgba(255,51,95,0.42)",
                            boxShadow:
                                "0 0 0 3px rgba(255,51,95,0.055)",
                        },
                    }}
                >
                    <SearchIcon
                        sx={{
                            color: "#686d76",
                            fontSize: 20,
                            mr: 1,
                            flexShrink: 0,
                        }}
                    />

                    <InputBase
                        fullWidth
                        placeholder="Search videos, creators..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        onKeyDown={
                            handleSearchKeyDown
                        }
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            color: "#e8e9ec",
                            fontSize: 13.5,

                            "& input": {
                                py: 0,
                            },

                            "& input::placeholder": {
                                color: "#666b74",
                                opacity: 1,
                            },
                        }}
                    />

                    {search.trim() && (
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "flex",
                                },
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                width: 25,
                                height: 25,
                                borderRadius: "7px",
                                color: "#777c85",
                                fontSize: 10,
                                fontWeight: 800,
                                background:
                                    "rgba(255,255,255,0.045)",
                            }}
                        >
                            ↵
                        </Box>
                    )}
                </Box>

                {/* ================================================== */}
                {/* RIGHT ACTIONS                                        */}
                {/* ================================================== */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                            xs: 0.3,
                            sm: 0.7,
                        },
                        ml: {
                            xs: 0.2,
                            md: 1,
                        },
                    }}
                >
                    {/* Upload */}

                    {isLoggedIn && (
                        <>
                            <Button
                                onClick={() =>
                                    navigate(
                                        "/upload"
                                    )
                                }
                                startIcon={
                                    <AddIcon
                                        sx={{
                                            fontSize:
                                                19,
                                        }}
                                    />
                                }
                                sx={{
                                    display: {
                                        xs: "none",
                                        md: "flex",
                                    },
                                    height: 39,
                                    px: 1.6,
                                    borderRadius:
                                        "10px",
                                    color: "#dfe0e4",
                                    background:
                                        "rgba(255,255,255,0.045)",
                                    border:
                                        "1px solid rgba(255,255,255,0.065)",
                                    textTransform:
                                        "none",
                                    fontSize: 12,
                                    fontWeight: 800,

                                    "&:hover": {
                                        background:
                                            "rgba(255,255,255,0.08)",
                                        borderColor:
                                            "rgba(255,255,255,0.11)",
                                    },
                                }}
                            >
                                Create
                            </Button>

                            <Tooltip
                                title="Upload video"
                            >
                                <IconButton
                                    onClick={() =>
                                        navigate(
                                            "/upload"
                                        )
                                    }
                                    sx={{
                                        display: {
                                            xs: "flex",
                                            md: "none",
                                        },
                                        width: 40,
                                        height: 40,
                                        borderRadius:
                                            "10px",
                                        color: "#858a93",

                                        "&:hover": {
                                            color: "#ff4770",
                                            backgroundColor:
                                                "rgba(255,51,95,0.08)",
                                        },
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    {/* Notifications */}

                    <Tooltip title="Notifications">
                        <IconButton
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "10px",
                                color: "#858a93",
                                position:
                                    "relative",

                                "&:hover": {
                                    color: "#f0f1f3",
                                    backgroundColor:
                                        "rgba(255,255,255,0.055)",
                                },
                            }}
                        >
                            <NotificationsIcon
                                sx={{
                                    fontSize: 22,
                                }}
                            />

                            <Box
                                sx={{
                                    position:
                                        "absolute",
                                    top: 9,
                                    right: 9,
                                    width: 5,
                                    height: 5,
                                    borderRadius:
                                        "50%",
                                    backgroundColor:
                                        "#ff335f",
                                    boxShadow:
                                        "0 0 8px rgba(255,51,95,0.7)",
                                }}
                            />
                        </IconButton>
                    </Tooltip>

                    {/* Avatar */}

                    <IconButton
                        onClick={
                            handleAvatarClick
                        }
                        sx={{
                            p: 0.35,
                            ml: {
                                xs: 0.2,
                                sm: 0.5,
                            },
                            borderRadius: "50%",
                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            "&:hover": {
                                borderColor:
                                    "rgba(255,51,95,0.45)",
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                width: {
                                    xs: 34,
                                    sm: 36,
                                },
                                height: {
                                    xs: 34,
                                    sm: 36,
                                },
                                background:
                                    "linear-gradient(135deg, #ff335f, #8b5cf6)",
                                fontWeight: 800,
                                fontSize: 14,
                                boxShadow:
                                    "0 5px 18px rgba(0,0,0,0.3)",
                            }}
                        >
                            {isLoggedIn
                                ? avatarLetter
                                : "?"}
                        </Avatar>
                    </IconButton>
                </Box>

                {/* ================================================== */}
                {/* PROFILE MENU                                        */}
                {/* ================================================== */}

                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1.2,
                                width: 255,
                                borderRadius: "16px",
                                overflow: "hidden",

                                backgroundColor: "#17191e",
                                backgroundImage:
                                    "linear-gradient(145deg, #1b1e24 0%, #14161a 100%)",

                                color: "#f3f4f6",

                                border:
                                    "1px solid rgba(255,255,255,0.075)",

                                boxShadow:
                                    "0 25px 70px rgba(0,0,0,0.5)",

                                "& .MuiMenuItem-root": {
                                    minHeight: 45,
                                    mx: 0.7,
                                    my: 0.25,
                                    px: 1.2,
                                    borderRadius:
                                        "10px",
                                    fontSize: 13,
                                    fontWeight: 600,

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.055)",
                                    },
                                },
                            },
                        },
                    }}
                >
                    {isLoggedIn ? (
                        <>
                            {/* Profile header */}

                            <Box
                                sx={{
                                    px: 2,
                                    py: 1.8,
                                    background:
                                        "linear-gradient(135deg, rgba(255,51,95,0.08), rgba(139,92,246,0.06))",
                                    borderBottom:
                                        "1px solid rgba(255,255,255,0.055)",
                                }}
                            >
                                <Box
                                    sx={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 1.3,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            background:
                                                "linear-gradient(135deg, #ff335f, #8b5cf6)",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {
                                            avatarLetter
                                        }
                                    </Avatar>

                                    <Box
                                        sx={{
                                            minWidth: 0,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color:
                                                    "#f0f1f3",
                                                fontWeight:
                                                    800,
                                                fontSize: 13,
                                                overflow:
                                                    "hidden",
                                                textOverflow:
                                                    "ellipsis",
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {username ||
                                                "Account"}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color:
                                                    "#676c75",
                                                fontSize:
                                                    11,
                                                mt: 0.25,
                                            }}
                                        >
                                            CleanTube
                                            account
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    py: 0.8,
                                }}
                            >
                                <MenuItem
                                    onClick={() =>
                                        handleNavigate(
                                            "/channel"
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <ChannelIcon
                                            sx={{
                                                color:
                                                    "#a8abb2",
                                                fontSize:
                                                    20,
                                            }}
                                        />
                                    </ListItemIcon>

                                    My channel
                                </MenuItem>

                                <MenuItem
                                    onClick={() =>
                                        handleNavigate(
                                            "/settings"
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <SettingsIcon
                                            sx={{
                                                color:
                                                    "#a8abb2",
                                                fontSize:
                                                    20,
                                            }}
                                        />
                                    </ListItemIcon>

                                    Update profile
                                </MenuItem>

                                <MenuItem
                                    onClick={() =>
                                        handleNavigate(
                                            "/upload"
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <UploadIcon
                                            sx={{
                                                color:
                                                    "#a8abb2",
                                                fontSize:
                                                    20,
                                            }}
                                        />
                                    </ListItemIcon>

                                    Upload video
                                </MenuItem>
                            </Box>

                            <Divider
                                sx={{
                                    borderColor:
                                        "rgba(255,255,255,0.06)",
                                }}
                            />

                            <Box
                                sx={{
                                    py: 0.8,
                                }}
                            >
                                <MenuItem
                                    onClick={
                                        handleLogout
                                    }
                                    sx={{
                                        color: "#ff4770",
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon
                                            sx={{
                                                color:
                                                    "#ff4770",
                                                fontSize:
                                                    20,
                                            }}
                                        />
                                    </ListItemIcon>

                                    Logout
                                </MenuItem>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    px: 2,
                                    py: 1.8,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: 14,
                                        color:
                                            "#f0f1f3",
                                    }}
                                >
                                    Welcome to
                                    CleanTube
                                </Typography>

                                <Typography
                                    sx={{
                                        color:
                                            "#6d727b",
                                        fontSize: 11.5,
                                        mt: 0.5,
                                        lineHeight:
                                            1.5,
                                    }}
                                >
                                    Sign in to upload
                                    videos and
                                    manage your
                                    channel.
                                </Typography>
                            </Box>

                            <Divider
                                sx={{
                                    borderColor:
                                        "rgba(255,255,255,0.06)",
                                }}
                            />

                            <Box
                                sx={{
                                    py: 0.8,
                                }}
                            >
                                <MenuItem
                                    onClick={() =>
                                        handleNavigate(
                                            "/login"
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <LoginIcon
                                            sx={{
                                                color:
                                                    "#a8abb2",
                                                fontSize:
                                                    20,
                                            }}
                                        />
                                    </ListItemIcon>

                                    Login
                                </MenuItem>

                                <MenuItem
                                    onClick={() =>
                                        handleNavigate(
                                            "/register"
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <RegisterIcon
                                            sx={{
                                                color:
                                                    "#a8abb2",
                                                fontSize:
                                                    20,
                                            }}
                                        />
                                    </ListItemIcon>

                                    Register
                                </MenuItem>
                            </Box>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

