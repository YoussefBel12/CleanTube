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
    PersonOutlineRounded as PersonIcon,
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

                    top: "70px",
                    height: "calc(100% - 70px)",

                    overflowX: "hidden",
                    overflowY: "auto",

                    background:
                        "linear-gradient(180deg, #0b0d10 0%, #090a0d 100%)",

                    color: "#f3f4f6",

                    borderRight:
                        "1px solid rgba(255,255,255,0.055)",

                    transition:
                        "width 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",

                    boxShadow:
                        "8px 0 35px rgba(0,0,0,0.10)",

                    scrollbarWidth: "thin",

                    "&::-webkit-scrollbar": {
                        width: 4,
                    },

                    "&::-webkit-scrollbar-track": {
                        background: "transparent",
                    },

                    "&::-webkit-scrollbar-thumb": {
                        background:
                            "rgba(255,255,255,0.08)",
                        borderRadius: 10,
                    },

                    /*
                     * Small ambient accent on the right edge.
                     */

                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "1px",
                        height: "40%",
                        background:
                            "linear-gradient(180deg, rgba(255,51,95,0.22), transparent)",
                        pointerEvents: "none",
                    },

                    /*
                     * Very subtle bottom fade.
                     */

                    "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 70,
                        background:
                            "linear-gradient(transparent, #090a0d)",
                        pointerEvents: "none",
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,

                    px: sidebarOpen ? 1.25 : 1,
                    py: 2,

                    transition:
                        "padding 0.28s ease",
                }}
            >
                {/* ================================================== */}
                {/* EXPLORE SECTION                                     */}
                {/* ================================================== */}

                {sidebarOpen && (
                    <SectionHeader>
                        Explore
                    </SectionHeader>
                )}

                <List
                    disablePadding
                    sx={{
                        mt: sidebarOpen ? 1.2 : 0,
                    }}
                >
                    <SidebarItem
                        to="/"
                        label="Discover"
                        icon={<HomeIcon />}
                        open={sidebarOpen}
                    />

                    <SidebarItem
                        to="/subscriptions"
                        label="Subscriptions"
                        icon={<SubscriptionsIcon />}
                        open={sidebarOpen}
                    />
                </List>

                {/* ================================================== */}
                {/* SECTION DIVIDER                                     */}
                {/* ================================================== */}

                <Box
                    sx={{
                        px: sidebarOpen ? 1 : 0,
                        my: 2.2,
                    }}
                >
                    <Divider
                        sx={{
                            borderColor:
                                "rgba(255,255,255,0.055)",
                        }}
                    />
                </Box>

                {/* ================================================== */}
                {/* LIBRARY SECTION                                     */}
                {/* ================================================== */}

                {sidebarOpen && (
                    <SectionHeader>
                        Library
                    </SectionHeader>
                )}

                <List
                    disablePadding
                    sx={{
                        mt: sidebarOpen ? 1.2 : 0,
                    }}
                >
                    <SidebarItem
                        to="/channel"
                        label="My channel"
                        icon={<PersonIcon />}
                        open={sidebarOpen}
                    />
                </List>

                {/* ================================================== */}
                {/* BRAND AREA                                           */}
                {/* ================================================== */}

                {sidebarOpen && (
                    <BrandPanel />
                )}

                {/* ================================================== */}
                {/* COLLAPSED BRAND                                     */}
                {/* ================================================== */}

                {!sidebarOpen && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "center",
                            mt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                position:
                                    "relative",

                                width: 34,
                                height: 34,

                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",

                                borderRadius: "11px",

                                background:
                                    "linear-gradient(135deg, rgba(255,51,95,0.16), rgba(139,92,246,0.12))",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                boxShadow:
                                    "0 8px 25px rgba(0,0,0,0.18)",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 7,
                                    height: 7,
                                    borderRadius:
                                        "50%",
                                    backgroundColor:
                                        "#ff335f",
                                    boxShadow:
                                        "0 0 12px rgba(255,51,95,0.65)",
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}

/*
 * ================================================================
 * SECTION HEADER
 * ================================================================
 */

function SectionHeader({ children }) {
    return (
        <Typography
            sx={{
                px: 1.5,

                color: "#555a63",

                fontSize: 10,

                fontWeight: 800,

                letterSpacing: "1.5px",

                textTransform: "uppercase",

                lineHeight: 1,
            }}
        >
            {children}
        </Typography>
    );
}

/*
 * ================================================================
 * SIDEBAR ITEM
 * ================================================================
 */

function SidebarItem({
    to,
    label,
    icon,
    open,
}) {
    return (
        <Tooltip
            title={!open ? label : ""}
            placement="right"
            arrow
            disableHoverListener={open}
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor:
                            "#191c21",

                        color: "#f0f1f3",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        fontSize: 11,

                        fontWeight: 600,

                        px: 1.2,
                        py: 0.7,

                        borderRadius: "8px",

                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.35)",
                    },
                },

                arrow: {
                    sx: {
                        color: "#191c21",
                    },
                },
            }}
        >
            <ListItemButton
                component={NavLink}
                to={to}
                end={to === "/"}
                sx={{
                    position: "relative",

                    minHeight: 49,

                    width: "100%",

                    justifyContent: open
                        ? "initial"
                        : "center",

                    px: open ? 1.35 : 0,

                    mb: 0.65,

                    borderRadius: "11px",

                    color: "#747982",

                    textDecoration: "none",

                    overflow: "hidden",

                    transition:
                        "background-color 0.2s ease, color 0.2s ease, transform 0.18s ease",

                    "&:hover": {
                        backgroundColor:
                            "rgba(255,255,255,0.045)",

                        color: "#e5e6e8",

                        "& .sidebar-icon": {
                            transform:
                                "scale(1.05)",
                        },
                    },

                    "&:active": {
                        transform:
                            "scale(0.985)",
                    },

                    /*
                     * ACTIVE ITEM
                     */

                    "&.active": {
                        color: "#ff4770",

                        background:
                            "linear-gradient(90deg, rgba(255,51,95,0.14), rgba(255,51,95,0.045))",

                        boxShadow:
                            "inset 0 0 0 1px rgba(255,51,95,0.035)",

                        "&::before": {
                            content: '""',

                            position: "absolute",

                            left: 0,
                            top: "50%",

                            transform:
                                "translateY(-50%)",

                            width: 3,
                            height: 24,

                            borderRadius:
                                "0 4px 4px 0",

                            backgroundColor:
                                "#ff335f",

                            boxShadow:
                                "0 0 14px rgba(255,51,95,0.6)",
                        },

                        "&::after": {
                            content: '""',

                            position: "absolute",

                            right: -25,
                            top: "50%",

                            transform:
                                "translateY(-50%)",

                            width: 70,
                            height: 70,

                            borderRadius: "50%",

                            background:
                                "rgba(255,51,95,0.045)",

                            filter:
                                "blur(18px)",

                            pointerEvents:
                                "none",
                        },
                    },

                    "&.active:hover": {
                        background:
                            "linear-gradient(90deg, rgba(255,51,95,0.18), rgba(255,51,95,0.065))",
                    },
                }}
            >
                {/* ================================================== */}
                {/* ICON                                                  */}
                {/* ================================================== */}

                <ListItemIcon
                    className="sidebar-icon"
                    sx={{
                        minWidth: open ? 40 : 0,

                        width: open
                            ? 40
                            : "auto",

                        mr: open ? 0.2 : 0,

                        justifyContent:
                            "center",

                        color: "inherit",

                        transition:
                            "transform 0.2s ease, color 0.2s ease",

                        "& svg": {
                            fontSize: 21,
                        },
                    }}
                >
                    {icon}
                </ListItemIcon>

                {/* ================================================== */}
                {/* LABEL                                                 */}
                {/* ================================================== */}

                {open && (
                    <ListItemText
                        primary={label}
                        slotProps={{
                            primary: {
                                sx: {
                                    fontSize: 13,

                                    fontWeight: 650,

                                    letterSpacing:
                                        "-0.05px",

                                    color:
                                        "inherit",
                                },
                            },
                        }}
                    />
                )}

                {/* ================================================== */}
                {/* ACTIVE DOT                                            */}
                {/* ================================================== */}

                {open && (
                    <Box
                        sx={{
                            width: 4,
                            height: 4,

                            borderRadius: "50%",

                            backgroundColor:
                                "currentColor",

                            opacity: 0,

                            transition:
                                "opacity 0.2s ease",

                            ".active &": {
                                opacity: 0.9,
                            },
                        }}
                    />
                )}
            </ListItemButton>
        </Tooltip>
    );
}

/*
 * ================================================================
 * BRAND PANEL
 * ================================================================
 */

function BrandPanel() {
    return (
        <Box
            sx={{
                mt: 5,

                mx: 0.5,

                px: 1.5,
                py: 1.6,

                borderRadius: "13px",

                position: "relative",

                overflow: "hidden",

                background:
                    "linear-gradient(135deg, rgba(255,51,95,0.055), rgba(139,92,246,0.035))",

                border:
                    "1px solid rgba(255,255,255,0.045)",

                "&::before": {
                    content: '""',

                    position: "absolute",

                    width: 100,
                    height: 100,

                    right: -55,
                    top: -55,

                    borderRadius: "50%",

                    background:
                        "rgba(255,51,95,0.07)",

                    filter:
                        "blur(20px)",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",

                    display: "flex",

                    alignItems:
                        "center",

                    gap: 0.8,
                }}
            >
                <Box
                    sx={{
                        width: 7,
                        height: 7,

                        flexShrink: 0,

                        borderRadius:
                            "50%",

                        backgroundColor:
                            "#ff335f",

                        boxShadow:
                            "0 0 11px rgba(255,51,95,0.65)",
                    }}
                />

                <Typography
                    sx={{
                        color: "#b9bcc3",

                        fontSize: 10.5,

                        fontWeight: 850,

                        letterSpacing:
                            "1px",
                    }}
                >
                    CLEANTUBE
                </Typography>
            </Box>

            <Typography
                sx={{
                    position:
                        "relative",

                    mt: 0.8,

                    color: "#5f646d",

                    fontSize: 10.5,

                    lineHeight: 1.5,
                }}
            >
                A quieter place for
                things worth watching.
            </Typography>
        </Box>
    );
}

export default Sidebar;

