{/* 
import CommentSection from "../components/CommentSection";
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

    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        api.get(`/Videos/${id}`)
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

    useEffect(() => {
        const loadLikeData = async () => {
            try {
                const countResponse = await api.get(
                    `/Likes/video/${id}/count`
                );

setLikeCount(countResponse.data);

const likedResponse = await api.get(
    `/Likes/video/${id}`
);

setIsLiked(likedResponse.data);
            } catch (error) {
    console.error("Like API Error:", error);
}
        };

if (id) {
    loadLikeData();
}
    }, [id]);

const handleLike = async () => {
    if (likeLoading) return;

    try {
        setLikeLoading(true);

        if (isLiked) {
            await api.delete(`/Likes/${id}`);

            setIsLiked(false);
            setLikeCount((count) => Math.max(0, count - 1));
        } else {
            await api.post("/Likes", {
                videoId: Number(id),
            });

            setIsLiked(true);
            setLikeCount((count) => count + 1);
        }
    } catch (error) {
        console.error("Like Error:", error);
    } finally {
        setLikeLoading(false);
    }
};

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
            
            <Box
                sx={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    background:
                        "radial-gradient(circle at 30% 20%, #292932, #08080b 70%)",
                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",
                }}
            >
                {video.videoUrl ? (
                    <video
                        controls
                        poster={`https://localhost:7140${video.thumbnailUrl}`}
                        src={`https://localhost:7140${video.videoUrl}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "12px",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 48,
                                fontWeight: 900,
                                color: "rgba(255,255,255,0.08)",
                                letterSpacing: "-2px",
                            }}
                        >
                            CLEAN
                        </Typography>

                        <Typography
                            sx={{
                                color: "#777",
                                fontSize: 14,
                            }}
                        >
                            Video preview
                        </Typography>
                    </Box>
                )}
            </Box>

            
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
                            {video.channelName}
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
                        onClick={handleLike}
                        disabled={likeLoading}
                        startIcon={<ThumbUpIcon />}
                        sx={{
                            color: isLiked ? "primary.main" : "white",
                            backgroundColor: "#151518",
                            borderRadius: 3,
                            textTransform: "none",
                            px: 2,
                            fontWeight: isLiked ? 700 : 400,
                        }}
                    >
                        Like {likeCount > 0 ? `(${likeCount})` : ""}
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

            
            <CommentSection videoId={id} />
        </Box>
    </>
);
}

export default Video;


*/}



import CommentSection from "../components/CommentSection";
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

    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [subscribeLoading, setSubscribeLoading] = useState(false);

    useEffect(() => {
        api.get(`/Videos/${id}`)
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

    useEffect(() => {
        const loadLikeData = async () => {
            try {
                const countResponse = await api.get(
                    `/Likes/video/${id}/count`
                );

setLikeCount(countResponse.data);

const likedResponse = await api.get(
    `/Likes/video/${id}`
);

setIsLiked(likedResponse.data);
            } catch (error) {
    console.error("Like API Error:", error);
}
        };

if (id) {
    loadLikeData();
}
    }, [id]);

useEffect(() => {
    const loadSubscriptionData = async () => {
        try {
            const countResponse = await api.get(
                `/Subscriptions/channel/${video.channelId}/count`
            );

            setSubscriberCount(countResponse.data);

            const subscribedResponse = await api.get(
                `/Subscriptions/channel/${video.channelId}`
            );

            setIsSubscribed(subscribedResponse.data);
        } catch (error) {
            console.error(
                "Subscription API Error:",
                error
            );
        }
    };

    if (video?.channelId) {
        loadSubscriptionData();
    }
}, [video]);

const handleLike = async () => {
    if (likeLoading) return;

    try {
        setLikeLoading(true);

        if (isLiked) {
            await api.delete(`/Likes/${id}`);

            setIsLiked(false);
            setLikeCount((count) =>
                Math.max(0, count - 1)
            );
        } else {
            await api.post("/Likes", {
                videoId: Number(id),
            });

            setIsLiked(true);
            setLikeCount((count) => count + 1);
        }
    } catch (error) {
        console.error("Like Error:", error);
    } finally {
        setLikeLoading(false);
    }
};

const handleSubscribe = async () => {
    if (subscribeLoading) return;

    try {
        setSubscribeLoading(true);

        if (isSubscribed) {
            await api.delete(
                `/Subscriptions/${video.channelId}`
            );

            setIsSubscribed(false);
            setSubscriberCount((count) =>
                Math.max(0, count - 1)
            );
        } else {
            await api.post("/Subscriptions", {
                channelId: video.channelId,
            });

            setIsSubscribed(true);
            setSubscriberCount((count) => count + 1);
        }
    } catch (error) {
        console.error("Subscription Error:", error);
    } finally {
        setSubscribeLoading(false);
    }
};

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
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    background:
                        "radial-gradient(circle at 30% 20%, #292932, #08080b 70%)",
                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",
                }}
            >
                {video.videoUrl ? (
                    <video
                        controls
                        poster={`https://localhost:7140${video.thumbnailUrl}`}
                        src={`https://localhost:7140${video.videoUrl}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "12px",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 48,
                                fontWeight: 900,
                                color: "rgba(255,255,255,0.08)",
                                letterSpacing: "-2px",
                            }}
                        >
                            CLEAN
                        </Typography>

                        <Typography
                            sx={{
                                color: "#777",
                                fontSize: 14,
                            }}
                        >
                            Video preview
                        </Typography>
                    </Box>
                )}
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

            {/* Channel + Actions */}
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
                {/* Channel */}
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
                            {video.channelName}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 13,
                                color: "#777",
                            }}
                        >
                            {subscriberCount} subscribers
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleSubscribe}
                        disabled={subscribeLoading}
                        sx={{
                            ml: 2,
                            borderRadius: 3,
                            backgroundColor: isSubscribed
                                ? "#333338"
                                : "primary.main",
                            color: "white",
                            textTransform: "none",
                            fontWeight: 700,
                            "&:hover": {
                                backgroundColor: isSubscribed
                                    ? "#44444a"
                                    : "#e62d55",
                            },
                        }}
                    >
                        {isSubscribed
                            ? "Subscribed"
                            : "Subscribe"}
                    </Button>
                </Box>

                {/* Actions */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={handleLike}
                        disabled={likeLoading}
                        startIcon={<ThumbUpIcon />}
                        sx={{
                            color: isLiked
                                ? "primary.main"
                                : "white",
                            backgroundColor: "#151518",
                            borderRadius: 3,
                            textTransform: "none",
                            px: 2,
                            fontWeight: isLiked ? 700 : 400,
                        }}
                    >
                        Like
                        {likeCount > 0
                            ? ` (${likeCount})`
                            : ""}
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
                    {video.description ||
                        "No description provided."}
                </Typography>
            </Box>

            {/* Comments */}
            <CommentSection videoId={id} />
        </Box>
    </>
);
}

export default Video;

