import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Box,
} from "@mui/material";

import {
    HomeOutlined as HomeIcon,
    ExploreOutlined as ExploreIcon,
    SubscriptionsOutlined as SubscriptionsIcon,
    HistoryOutlined as HistoryIcon,
    VideoLibraryOutlined as VideoLibraryIcon,
    BookmarkBorderOutlined as BookmarkIcon,
} from "@mui/icons-material";

const drawerWidth = 220;

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#0b0b0d",
                    color: "white",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    top: "72px",
                    height: "calc(100% - 72px)",
                },
            }}
        >
            <Box sx={{ px: 1.5, py: 2 }}>
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

                <List sx={{ mt: 1 }}>
                    <ListItemButton
                        selected
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            "&.Mui-selected": {
                                backgroundColor:
                                    "rgba(255,51,95,0.12)",
                                color: "primary.main",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor:
                                    "rgba(255,51,95,0.18)",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "inherit",
                            }}
                        >
                            <HomeIcon />
                        </ListItemIcon>

                        <ListItemText primary="Discover" />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "#888",
                            }}
                        >
                            <ExploreIcon />
                        </ListItemIcon>

                        <ListItemText primary="Explore" />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: 2 }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "#888",
                            }}
                        >
                            <SubscriptionsIcon />
                        </ListItemIcon>

                        <ListItemText primary="Subscriptions" />
                    </ListItemButton>
                </List>

                <Divider
                    sx={{
                        my: 2,
                        borderColor: "rgba(255,255,255,0.06)",
                    }}
                />

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

                <List sx={{ mt: 1 }}>
                    <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "#888",
                            }}
                        >
                            <HistoryIcon />
                        </ListItemIcon>

                        <ListItemText primary="History" />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "#888",
                            }}
                        >
                            <BookmarkIcon />
                        </ListItemIcon>

                        <ListItemText primary="Saved" />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: 2 }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "#888",
                            }}
                        >
                            <VideoLibraryIcon />
                        </ListItemIcon>

                        <ListItemText primary="Your videos" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;