
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
} from "@mui/material";

import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Add as AddIcon,
    NotificationsNone as NotificationsIcon,
    Person as PersonIcon,
    SettingsOutlined as SettingsIcon,
    CloudUploadOutlined as UploadIcon,
    Login as LoginIcon,
    PersonAddOutlined as RegisterIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import { useLayout } from "../context/LayoutContext";
function Navbar() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const menuOpen = Boolean(anchorEl);
    const isLoggedIn = Boolean(localStorage.getItem("token"));

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
    const { toggleSidebar } = useLayout();
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: "rgba(11, 11, 13, 0.92)",
                backdropFilter: "blur(12px)",
                borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "72px !important",
                    px: 3,
                    gap: 2,
                }}
            >
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        color: "text.secondary",
                        "&:hover": {
                            color: "white",
                            backgroundColor:
                                "rgba(255,255,255,0.06)",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    sx={{
                        fontSize: 22,
                        fontWeight: 900,
                        letterSpacing: "-1px",
                        mr: 2,
                    }}
                >
                    Clean
                    <Box
                        component="span"
                        sx={{ color: "primary.main" }}
                    >
                        Tube
                    </Box>
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#151518",
                        border:
                            "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        px: 2,
                        height: 42,
                        maxWidth: 520,
                        width: "100%",
                        margin: "0 auto",

                        "&:focus-within": {
                            borderColor:
                                "rgba(255,51,95,0.6)",
                        },
                    }}
                >
                    <SearchIcon
                        sx={{
                            color: "text.secondary",
                            mr: 1,
                        }}
                    />

                    <InputBase
                        placeholder="Search videos, creators..."
                        sx={{
                            flex: 1,
                            color: "white",

                            "& input::placeholder": {
                                color: "#777",
                                opacity: 1,
                            },
                        }}
                    />
                </Box>

                {isLoggedIn && (
                    <IconButton
                        onClick={() => navigate("/upload")}
                        sx={{
                            color: "text.secondary",
                            "&:hover": {
                                color: "white",
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                )}

                <IconButton
                    sx={{
                        color: "text.secondary",
                        "&:hover": {
                            color: "white",
                        },
                    }}
                >
                    <NotificationsIcon />
                </IconButton>

                <IconButton
                    onClick={handleAvatarClick}
                    sx={{
                        p: 0,
                        borderRadius: "50%",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            background:
                                "linear-gradient(135deg, #ff335f, #8b5cf6)",
                            fontWeight: 700,
                        }}
                    >
                        {isLoggedIn ? "Y" : "?"}
                    </Avatar>
                </IconButton>

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
                                mt: 1,
                                minWidth: 210,
                                backgroundColor: "#151518",
                                color: "white",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                            },
                        },
                    }}
                >
                    {isLoggedIn ? (
                        <>
                            <MenuItem
                                onClick={() =>
                                    handleNavigate("/channel")
                                }
                            >
                                <ListItemIcon>
                                    <PersonIcon
                                        sx={{ color: "white" }}
                                    />
                                </ListItemIcon>
                                My channel
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    handleNavigate("/settings")
                                }
                            >
                                <ListItemIcon>
                                    <SettingsIcon
                                        sx={{ color: "white" }}
                                    />
                                </ListItemIcon>
                                Update profile
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    handleNavigate("/upload")
                                }
                            >
                                <ListItemIcon>
                                    <UploadIcon
                                        sx={{ color: "white" }}
                                    />
                                </ListItemIcon>
                                Upload video
                            </MenuItem>

                            <Divider
                                sx={{
                                    borderColor:
                                        "rgba(255,255,255,0.08)",
                                }}
                            />

                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon
                                        sx={{
                                            color: "#ff335f",
                                        }}
                                    />
                                </ListItemIcon>

                                <Typography
                                    sx={{
                                        color: "#ff335f",
                                    }}
                                >
                                    Logout
                                </Typography>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                onClick={() =>
                                    handleNavigate("/login")
                                }
                            >
                                <ListItemIcon>
                                    <LoginIcon
                                        sx={{ color: "white" }}
                                    />
                                </ListItemIcon>
                                Login
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    handleNavigate("/register")
                                }
                            >
                                <ListItemIcon>
                                    <RegisterIcon
                                        sx={{ color: "white" }}
                                    />
                                </ListItemIcon>
                                Register
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

