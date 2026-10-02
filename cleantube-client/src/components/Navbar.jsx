import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    InputBase,
    Box,
    Avatar,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Add as AddIcon,
    NotificationsNone as NotificationsIcon,
} from "@mui/icons-material";

function Navbar() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: "rgba(11, 11, 13, 0.92)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <Toolbar sx={{ minHeight: "72px !important", px: 3, gap: 2 }}>

                <IconButton
                    sx={{
                        color: "text.secondary",
                        "&:hover": {
                            color: "white",
                            backgroundColor: "rgba(255,255,255,0.06)",
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
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        px: 2,
                        height: 42,
                        maxWidth: 520,
                        width: "100%",
                        margin: "0 auto",

                        "&:focus-within": {
                            borderColor: "rgba(255,51,95,0.6)",
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

                <IconButton
                    sx={{
                        color: "text.secondary",
                        "&:hover": {
                            color: "white",
                        },
                    }}
                >
                    <AddIcon />
                </IconButton>

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

                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        background:
                            "linear-gradient(135deg, #ff335f, #8b5cf6)",
                        fontWeight: 700,
                    }}
                >
                    Y
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;