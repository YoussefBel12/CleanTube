
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Box,
    Tooltip,
} from "@mui/material";

import {
    HomeOutlined as HomeIcon,
    SubscriptionsOutlined as SubscriptionsIcon,
    VideoLibraryOutlined as VideoLibraryIcon,
    Person as PersonIcon,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";
import { useLayout } from "../context/LayoutContext";

const expandedWidth = 220;
const collapsedWidth = 72;

function Sidebar() {
    const { sidebarOpen } = useLayout();

    const width = sidebarOpen
        ? expandedWidth
        : collapsedWidth;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width,
                    boxSizing: "border-box",
                    backgroundColor: "#0b0b0d",
                    color: "white",
                    borderRight:
                        "1px solid rgba(255,255,255,0.06)",
                    top: "72px",
                    height: "calc(100% - 72px)",
                    transition: "width 0.25s ease",
                    overflowX: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    px: sidebarOpen ? 1.5 : 1,
                    py: 2,
                    transition: "padding 0.25s ease",
                }}
            >
                {sidebarOpen && (
                    <Typography
                        variant="caption"
                        sx={{
                            px: 1.5,
                            color: "#666",
                            fontWeight: 700,
                            letterSpacing: "1px",
                        }}
                    >
                        EXPLORE
                    </Typography>
                )}

                <List sx={{ mt: sidebarOpen ? 1 : 0 }}>
                    <SidebarItem
                        to="/"
                        icon={<HomeIcon />}
                        label="Discover"
                        open={sidebarOpen}
                    />

                    <SidebarItem
                        to="/subscriptions"
                        icon={<SubscriptionsIcon />}
                        label="Subscriptions"
                        open={sidebarOpen}
                    />
                </List>

                <Divider
                    sx={{
                        my: 2,
                        borderColor:
                            "rgba(255,255,255,0.06)",
                    }}
                />

                {sidebarOpen && (
                    <Typography
                        variant="caption"
                        sx={{
                            px: 1.5,
                            color: "#666",
                            fontWeight: 700,
                            letterSpacing: "1px",
                        }}
                    >
                        LIBRARY
                    </Typography>
                )}

                <List sx={{ mt: sidebarOpen ? 1 : 0 }}>
                    <SidebarItem
                        to="/my-videos"
                        icon={<VideoLibraryIcon />}
                        label="Your videos"
                        open={sidebarOpen}
                    />

                    <SidebarItem
                        to="/channel"
                        icon={<PersonIcon />}
                        label="My channel"
                        open={sidebarOpen}
                    />
                </List>
            </Box>
        </Drawer>
    );
}

function SidebarItem({
    to,
    icon,
    label,
    open,
}) {
    return (
        <Tooltip
            title={!open ? label : ""}
            placement="right"
            arrow
            disableHoverListener={open}
        >
            <ListItemButton
                component={NavLink}
                to={to}
                end={to === "/"}
                sx={{
                    minHeight: 48,
                    justifyContent: open
                        ? "initial"
                        : "center",
                    px: open ? 1.5 : 0,
                    borderRadius: 2.5,
                    mb: 0.7,
                    color: "#888",
                    textDecoration: "none",

                    "&:hover": {
                        backgroundColor:
                            "rgba(255,255,255,0.05)",
                        color: "white",
                    },

                    "&.active": {
                        backgroundColor:
                            "rgba(255,51,95,0.12)",
                        color: "primary.main",
                    },

                    "&.active:hover": {
                        backgroundColor:
                            "rgba(255,51,95,0.18)",
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: open ? 40 : 0,
                        justifyContent: "center",
                        color: "inherit",
                    }}
                >
                    {icon}
                </ListItemIcon>

                {open && (
                    <ListItemText
                        primary={label}
                        slotProps={{
                            primary: {
                                sx: {
                                    fontSize: 14,
                                    fontWeight: 500,
                                },
                            },
                        }}
                    />
                )}
            </ListItemButton>
        </Tooltip>
    );
}

export default Sidebar;

