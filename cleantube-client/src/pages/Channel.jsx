import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Avatar,
    Button,
    CircularProgress,
    Chip,
} from "@mui/material";

import {
    Upload as UploadIcon,
    Edit as EditIcon,
} from "@mui/icons-material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Channel() {
    const navigate = useNavigate();

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
const loadChannel = async () => {
    try {
        const channelResponse = await api.get(
            "/Channels/me"
        );

        setChannel(channelResponse.data);

        const subscriberResponse = await api.get(
            `/Subscriptions/channel/${channelResponse.data.id}/count`
        );

    setSubscriberCount(subscriberResponse.data);

    const videosResponse = await api.get(
        "/Videos"
    );

    const myVideos = videosResponse.data.filter(
        (video) =>
            video.channelId === channelResponse.data.id
    );

    setVideos(myVideos);
} catch (error) {
    if (error.response?.status === 404) {
        setChannel(null);
        return;
    }

    console.error("Channel Error:", error);
} finally {
    setLoading(false);
}
};



        loadChannel();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <Sidebar />

                <Box
                    sx={{
                        marginLeft: "220px",
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </>
        );
    }

    if (!channel) {
        return (
            <>
                <Navbar />
                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        marginLeft: "220px",
                        minHeight: "100vh",
                        padding: { xs: 2, md: 4 },
                        paddingTop: 12,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 700,
                            mx: "auto",
                            textAlign: "center",
                            py: 10,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                mx: "auto",
                                mb: 3,
                                fontSize: 40,
                                fontWeight: 800,
                                bgcolor: "primary.main",
                            }}
                        >
                            ?
                        </Avatar>

                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{ mb: 2 }}
                        >
                            Create your channel
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mb: 4,
                                maxWidth: 500,
                                mx: "auto",
                            }}
                        >
                            Create your own channel to upload videos,
                            build your audience, and share your content.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<EditIcon />}
                            onClick={() =>
                                navigate("/create-channel")
                            }
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontWeight: 700,
                            }}
                        >
                            Create Channel
                        </Button>
                    </Box>
                </Box>
            </>
        );
    }

    const channelInitial =
        channel.name?.charAt(0).toUpperCase() || "?";

    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    marginLeft: "220px",
                    minHeight: "100vh",
                    paddingTop: 8,
                }}
            >
                {/* Banner */}
                <Box
                    sx={{
                        height: { xs: 180, md: 260 },
                        position: "relative",
                        overflow: "hidden",
                        background:
                            "linear-gradient(135deg, #ff335f 0%, #7c3aed 50%, #2563eb 100%)",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15), transparent 30%)",
                        }}
                    />
                </Box>

                {/* Channel Header */}
                <Box
                    sx={{
                        px: { xs: 2, md: 5 },
                        pb: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            alignItems: {
                                xs: "center",
                                md: "flex-end",
                            },
                            gap: 3,
                            mt: -7,
                            position: "relative",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: { xs: 110, md: 140 },
                                height: { xs: 110, md: 140 },
                                border: "6px solid #0b0b0d",
                                bgcolor: "primary.main",
                                fontSize: { xs: 42, md: 56 },
                                fontWeight: 800,
                                flexShrink: 0,
                            }}
                        >
                            {channelInitial}
                        </Avatar>

                        <Box
                            sx={{
                                flex: 1,
                                textAlign: {
                                    xs: "center",
                                    md: "left",
                                },
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontWeight={900}
                                sx={{
                                    fontSize: {
                                        xs: "2rem",
                                        md: "2.8rem",
                                    },
                                    letterSpacing: "-1.5px",
                                }}
                            >
                                {channel.name}
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                @{channel.name?.replace(/\s+/g, "").toLowerCase()}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                    },
                                    gap: 1,
                                    mt: 2,
                                }}
                            >
                                <Chip
                                    label={`${ videos.length } ${
    videos.length === 1
        ? "video"
        : "videos"
} `}
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                />


                                <Chip
                                    label={`${subscriberCount} ${subscriberCount === 1
                                            ? "subscriber"
                                            : "subscribers"
                                        }`}
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                />



                                <Chip
                                    label="Your Channel"
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                flexShrink: 0,
                            }}
                        >
                            
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => navigate("/channel/customize")}
                                sx={{
                                    borderRadius: 3,
                                    fontWeight: 700,
                                }}
                            >
                                Customize
                            </Button>
                           


                            <Button
                                variant="contained"
                                startIcon={<UploadIcon />}
                                onClick={() =>
                                    navigate("/upload")
                                }
                                sx={{
                                    borderRadius: 3,
                                    fontWeight: 700,
                                }}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Divider */}
                <Box
                    sx={{
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                />

                {/* Videos */}
                <Box
                    sx={{
                        px: { xs: 2, md: 5 },
                        py: 4,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={800}
                        sx={{ mb: 3 }}
                    >
                        Your videos
                    </Typography>

                    {videos.length === 0 ? (
                        <Box
                            sx={{
                                textAlign: "center",
                                py: 10,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                sx={{ mb: 1 }}
                            >
                                Your channel is empty
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Upload your first video and start
                                building your channel.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<UploadIcon />}
                                onClick={() =>
                                    navigate("/upload")
                                }
                                sx={{
                                    borderRadius: 3,
                                    fontWeight: 700,
                                }}
                            >
                                Upload your first video
                            </Button>
                        </Box>
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
            </Box>
        </>
    );
}

export default Channel;

