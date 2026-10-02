
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Button,
    Divider,
} from "@mui/material";

import {
    ThumbUpOutlined as ThumbUpIcon,
    ShareOutlined as ShareIcon,
    MoreHoriz as MoreIcon,
} from "@mui/icons-material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Video() {
    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/ Videos / ${ id } `)
            .then((response) => {
                setVideo(response.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        marginLeft: "220px",
                        padding: { xs: 2, md: 4 },
                        paddingTop: 12,
                    }}
                >
                    <Typography color="text.secondary">
                        Loading video...
                    </Typography>
                </Box>
            </>
        );
    }

    if (!video) {
        return (
            <>
                <Navbar />
                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        marginLeft: "220px",
                        padding: { xs: 2, md: 4 },
                        paddingTop: 12,
                    }}
                >
                    <Typography variant="h5">
                        Video not found
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    marginLeft: "220px",
                    padding: { xs: 2, md: 4 },
                    paddingTop: 12,
                    maxWidth: 1400,
                }}
            >
                {/* Video player */}
                <Box
                    sx={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        backgroundColor: "#050507",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow:
                            "0 20px 60px rgba(0,0,0,0.35)",
                    }}
                >
                    <video
                        controls
                        poster={video.thumbnailUrl}
                        src={video.videoUrl}
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                        }}
                    />
                </Box>

                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{
                        mt: 3,
                        fontWeight: 800,
                        color: "white",
                    }}
                >
                    {video.title}
                </Typography>

                {/* Actions */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 44,
                                height: 44,
                                background:
                                    "linear-gradient(135deg, #ff335f, #8b5cf6)",
                                fontWeight: 700,
                            }}
                        >
                            C
                        </Avatar>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "white",
                                }}
                            >
                                CleanTube Channel
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#777",
                                }}
                            >
                                Creator
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                ml: 2,
                                borderRadius: 3,
                                backgroundColor: "primary.main",
                                textTransform: "none",
                                fontWeight: 700,
                                "&:hover": {
                                    backgroundColor: "#e62d55",
                                },
                            }}
                        >
                            Subscribe
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        <Button
                            startIcon={<ThumbUpIcon />}
                            sx={{
                                color: "white",
                                backgroundColor: "#151518",
                                borderRadius: 3,
                                textTransform: "none",
                                px: 2,
                            }}
                        >
                            Like
                        </Button>

                        <Button
                            startIcon={<ShareIcon />}
                            sx={{
                                color: "white",
                                backgroundColor: "#151518",
                                borderRadius: 3,
                                textTransform: "none",
                                px: 2,
                            }}
                        >
                            Share
                        </Button>

                        <IconButton
                            sx={{
                                color: "white",
                                backgroundColor: "#151518",
                            }}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Divider
                    sx={{
                        my: 3,
                        borderColor: "rgba(255,255,255,0.07)",
                    }}
                />

                {/* Description */}
                <Box
                    sx={{
                        backgroundColor: "#151518",
                        borderRadius: 3,
                        p: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Description
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {video.description || "No description provided."}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default Video;

