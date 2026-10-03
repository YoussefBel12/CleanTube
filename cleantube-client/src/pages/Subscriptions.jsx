{/* 
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Subscriptions() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubscriptions = async () => {
            try {
                const response = await api.get(
                    "/Subscriptions/videos"
                );

                setVideos(response.data);
            } catch (error) {
                console.error(
                    "Subscriptions Error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadSubscriptions();
    }, []);

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
                <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ mb: 4 }}
                >
                    Subscriptions
                </Typography>

                {loading ? (
                    <Typography color="text.secondary">
                        Loading...
                    </Typography>
                ) : videos.length === 0 ? (
                    <Typography color="text.secondary">
                        No videos from your subscriptions yet.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: 3,
                        }}
                    >
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
}

export default Subscriptions;

*/}




import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Skeleton,
} from "@mui/material";

import {
    SubscriptionsOutlined as SubscriptionsIcon,
    PlayCircleOutlineRounded as PlayIcon,
} from "@mui/icons-material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Subscriptions() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubscriptions = async () => {
            try {
                const response = await api.get(
                    "/Subscriptions/videos"
                );

                setVideos(response.data);
            } catch (error) {
                console.error(
                    "Subscriptions Error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadSubscriptions();
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    marginLeft: "220px",
                    minHeight: "100vh",

                    px: {
                        xs: 2,
                        sm: 3,
                        lg: 5,
                    },

                    pt: {
                        xs: 11,
                        md: 12,
                    },

                    pb: 8,

                    position: "relative",
                    overflow: "hidden",

                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -180,
                        right: -120,
                        width: 420,
                        height: 420,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(255,51,95,0.07), transparent 68%)",
                        pointerEvents: "none",
                    },
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 3,
                        mb: 5,
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                                mb: 1.3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: "10px",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    color: "#ff4770",

                                    background:
                                        "linear-gradient(135deg, rgba(255,51,95,0.15), rgba(255,51,95,0.04))",

                                    border:
                                        "1px solid rgba(255,51,95,0.12)",
                                }}
                            >
                                <SubscriptionsIcon
                                    sx={{
                                        fontSize: 19,
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    color: "#626771",
                                    fontSize: 10.5,
                                    fontWeight: 800,
                                    letterSpacing: "1.5px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Your feed
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color: "#f5f5f6",
                                fontSize: {
                                    xs: 30,
                                    md: 40,
                                },
                                fontWeight: 850,
                                letterSpacing: "-2.2px",
                                lineHeight: 1,
                            }}
                        >
                            Subscriptions
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1.4,
                                color: "#777b84",
                                fontSize: 14,
                                lineHeight: 1.6,
                                maxWidth: 480,
                            }}
                        >
                            The latest videos from the
                            channels you follow.
                        </Typography>
                    </Box>

                    {!loading && videos.length > 0 && (
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "flex",
                                },

                                alignItems: "center",
                                gap: 1,

                                px: 1.5,
                                py: 0.9,

                                borderRadius: "10px",

                                backgroundColor:
                                    "rgba(255,255,255,0.025)",

                                border:
                                    "1px solid rgba(255,255,255,0.055)",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    backgroundColor:
                                        "#ff335f",
                                    boxShadow:
                                        "0 0 10px rgba(255,51,95,0.65)",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#747982",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {videos.length}{" "}
                                {videos.length === 1
                                    ? "VIDEO"
                                    : "VIDEOS"}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* CONTENT */}
                {loading ? (
                    <LoadingGrid />
                ) : videos.length === 0 ? (
                    <EmptyState />
                ) : (
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 2.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#e8e9eb",
                                    fontSize: 16,
                                    fontWeight: 750,
                                    letterSpacing:
                                        "-0.3px",
                                }}
                            >
                                Latest from your channels
                            </Typography>

                            <Box
                                sx={{
                                    flex: 1,
                                    height: "1px",
                                    background:
                                        "linear-gradient(90deg, rgba(255,255,255,0.07), transparent)",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "grid",

                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, minmax(0, 1fr))",
                                    lg: "repeat(3, minmax(0, 1fr))",
                                    xl: "repeat(4, minmax(0, 1fr))",
                                },

                                columnGap: {
                                    xs: 2,
                                    md: 2.5,
                                    xl: 3,
                                },

                                rowGap: {
                                    xs: 4,
                                    md: 4.5,
                                },
                            }}
                        >
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}

function LoadingGrid() {
    return (
        <Box
            sx={{
                display: "grid",

                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))",
                    xl: "repeat(4, minmax(0, 1fr))",
                },

                columnGap: {
                    xs: 2,
                    md: 2.5,
                    xl: 3,
                },

                rowGap: 4,
            }}
        >
            {Array.from({ length: 8 }).map((_, index) => (
                <Box key={index}>
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{
                            width: "100%",
                            aspectRatio: "16 / 9",
                            borderRadius: "16px",
                            backgroundColor:
                                "rgba(255,255,255,0.045)",
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.2,
                            mt: 1.5,
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            animation="wave"
                            width={34}
                            height={34}
                            sx={{
                                backgroundColor:
                                    "rgba(255,255,255,0.045)",
                            }}
                        />

                        <Box sx={{ flex: 1 }}>
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width="90%"
                                height={18}
                                sx={{
                                    backgroundColor:
                                        "rgba(255,255,255,0.045)",
                                }}
                            />

                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width="55%"
                                height={14}
                                sx={{
                                    mt: 0.7,
                                    backgroundColor:
                                        "rgba(255,255,255,0.035)",
                                }}
                            />

                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width="40%"
                                height={12}
                                sx={{
                                    mt: 0.5,
                                    backgroundColor:
                                        "rgba(255,255,255,0.025)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

function EmptyState() {
    return (
        <Box
            sx={{
                minHeight: 430,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                position: "relative",

                borderRadius: "20px",

                overflow: "hidden",

                background:
                    "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.008))",

                border:
                    "1px solid rgba(255,255,255,0.055)",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 300,
                    height: 300,
                    top: -170,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderRadius: "50%",
                    background:
                        "rgba(255,51,95,0.055)",
                    filter: "blur(35px)",
                },

                "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,

                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",

                    backgroundSize: "42px 42px",

                    maskImage:
                        "linear-gradient(to bottom, black, transparent 80%)",

                    pointerEvents: "none",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,

                    textAlign: "center",

                    px: 3,
                }}
            >
                <Box
                    sx={{
                        width: 72,
                        height: 72,

                        mx: "auto",
                        mb: 2.5,

                        borderRadius: "20px",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        color: "#ff4770",

                        background:
                            "linear-gradient(135deg, rgba(255,51,95,0.13), rgba(139,92,246,0.07))",

                        border:
                            "1px solid rgba(255,51,95,0.12)",

                        boxShadow:
                            "0 15px 45px rgba(255,51,95,0.08)",
                    }}
                >
                    <PlayIcon
                        sx={{
                            fontSize: 34,
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                        color: "#f0f1f3",
                        fontSize: 21,
                        fontWeight: 800,
                        letterSpacing: "-0.7px",
                    }}
                >
                    Your feed is quiet
                </Typography>

                <Typography
                    sx={{
                        color: "#70747d",
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        maxWidth: 410,
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    Videos from channels you subscribe
                    to will appear here when they have
                    something new to watch.
                </Typography>
            </Box>
        </Box>
    );
}

export default Subscriptions;

