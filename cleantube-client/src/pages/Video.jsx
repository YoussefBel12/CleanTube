
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
    Tooltip,
    Skeleton,
} from "@mui/material";

import {
    ThumbUpOutlined as ThumbUpIcon,
    ThumbUp as ThumbUpFilledIcon,
    ShareOutlined as ShareIcon,
    MoreHoriz as MoreIcon,
    VerifiedRounded as VerifiedIcon,
    PlayArrowRounded as PlayIcon,
    CalendarTodayOutlined as CalendarIcon,
    BookmarkBorderRounded as SaveIcon,
    LinkRounded as LinkIcon,
    DescriptionOutlined as DescriptionIcon,
    PeopleAltOutlined as PeopleIcon,
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

const formatDate = (date) => {
    if (!date) return "Recently uploaded";

    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const formatSubscribers = (count) => {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }

    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }

    return count.toLocaleString();
};

const handleShare = async () => {
    const url = window.location.href;

    try {
        if (navigator.share) {
            await navigator.share({
                title: video?.title,
                url,
            });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
        }
    } catch (error) {
        console.error("Share Error:", error);
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
                    marginLeft: {
                        xs: 0,
                        md: "220px",
                    },
                    minHeight: "100vh",
                    background:
                        "radial-gradient(circle at 50% 0%, rgba(255,51,95,0.045), transparent 35%)",
                    px: {
                        xs: 2,
                        sm: 3,
                        lg: 5,
                    },
                    pt: {
                        xs: 10,
                        md: 12,
                    },
                    pb: 8,
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1450,
                        mx: "auto",
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: "100%",
                            aspectRatio: "16 / 9",
                            borderRadius: {
                                xs: 2,
                                md: 3,
                            },
                            backgroundColor:
                                "rgba(255,255,255,0.05)",
                        }}
                    />

                    <Box sx={{ mt: 3 }}>
                        <Skeleton
                            width="65%"
                            height={40}
                            sx={{
                                backgroundColor:
                                    "rgba(255,255,255,0.05)",
                            }}
                        />

                        <Skeleton
                            width="30%"
                            height={24}
                            sx={{
                                backgroundColor:
                                    "rgba(255,255,255,0.04)",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            width={52}
                            height={52}
                            sx={{
                                backgroundColor:
                                    "rgba(255,255,255,0.05)",
                            }}
                        />

                        <Box>
                            <Skeleton
                                width={180}
                                height={24}
                                sx={{
                                    backgroundColor:
                                        "rgba(255,255,255,0.05)",
                                }}
                            />

                            <Skeleton
                                width={120}
                                height={20}
                                sx={{
                                    backgroundColor:
                                        "rgba(255,255,255,0.04)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
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
                    marginLeft: {
                        xs: 0,
                        md: "220px",
                    },
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 3,
                    pt: 10,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 560,
                        textAlign: "center",
                        p: 6,
                        borderRadius: 4,
                        border:
                            "1px solid rgba(255,255,255,0.07)",
                        background:
                            "linear-gradient(145deg, #15181d, #0e1014)",
                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.35)",
                    }}
                >
                    <Box
                        sx={{
                            width: 74,
                            height: 74,
                            mx: "auto",
                            mb: 3,
                            borderRadius: "22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "rgba(255,51,95,0.1)",
                            color: "#ff335f",
                        }}
                    >
                        <PlayIcon
                            sx={{ fontSize: 36 }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            fontSize: 26,
                            fontWeight: 800,
                            letterSpacing: "-1px",
                            mb: 1,
                        }}
                    >
                        Video not found
                    </Typography>

                    <Typography
                        sx={{
                            color: "#777c86",
                            fontSize: 14,
                        }}
                    >
                        This video may have been removed
                        or is no longer available.
                    </Typography>
                </Box>
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
                marginLeft: {
                    xs: 0,
                    md: "220px",
                },
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 50% 0%, rgba(255,51,95,0.035), transparent 32%)",
                px: {
                    xs: 1.5,
                    sm: 2.5,
                    md: 4,
                    lg: 5,
                },
                pt: {
                    xs: 9,
                    sm: 10,
                    md: 11,
                },
                pb: 8,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1450,
                    mx: "auto",
                }}
            >
                {/* ================================================= */}
                {/* PLAYER                                            */}
                {/* ================================================= */}

                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 9",
                        borderRadius: {
                            xs: 1.5,
                            sm: 2.5,
                            md: 3,
                        },
                        overflow: "hidden",
                        background:
                            "linear-gradient(145deg, #171a20, #08090c)",
                        border:
                            "1px solid rgba(255,255,255,0.08)",
                        boxShadow:
                            "0 35px 100px rgba(0,0,0,0.5)",
                    }}
                >
                    {/* Ambient glow behind player */}

                    <Box
                        sx={{
                            position: "absolute",
                            inset: -80,
                            background:
                                "radial-gradient(circle at 50% 50%, rgba(255,51,95,0.09), transparent 55%)",
                            filter: "blur(50px)",
                            pointerEvents: "none",
                        }}
                    />

                    {video.videoUrl ? (
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                zIndex: 1,
                                background: "#050608",
                            }}
                        >
                            <video
                                controls
                                poster={
                                    video.thumbnailUrl
                                        ? `https://localhost:7140${video.thumbnailUrl}`
                                        : undefined
                                }
                                src={`https://localhost:7140${video.videoUrl}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                    objectFit: "contain",
                                    backgroundColor:
                                        "#050608",
                                }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background:
                                    "radial-gradient(circle at 50% 35%, #292d36 0%, #111318 40%, #07080a 100%)",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 82,
                                    height: 82,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background:
                                        "rgba(255,255,255,0.06)",
                                    border:
                                        "1px solid rgba(255,255,255,0.08)",
                                    color: "#ff335f",
                                    mb: 2,
                                }}
                            >
                                <PlayIcon
                                    sx={{
                                        fontSize: 42,
                                        ml: 0.5,
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 34,
                                        md: 52,
                                    },
                                    fontWeight: 900,
                                    letterSpacing: "-3px",
                                    color:
                                        "rgba(255,255,255,0.08)",
                                }}
                            >
                                CLEAN
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    color: "#747983",
                                    fontSize: 13,
                                }}
                            >
                                Video preview
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* ================================================= */}
                {/* TITLE                                               */}
                {/* ================================================= */}

                <Box sx={{ mt: { xs: 2.5, md: 3.5 } }}>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 22,
                                sm: 26,
                                md: 31,
                            },
                            lineHeight: 1.18,
                            fontWeight: 800,
                            letterSpacing: "-1.1px",
                            color: "#f5f5f7",
                            maxWidth: 1100,
                        }}
                    >
                        {video.title}
                    </Typography>

                    <Box
                        sx={{
                            mt: 1.4,
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1,
                            color: "#737781",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.7,
                            }}
                        >
                            <CalendarIcon
                                sx={{ fontSize: 15 }}
                            />

                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                }}
                            >
                                {formatDate(
                                    video.uploadedAt
                                )}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                backgroundColor:
                                    "#555961",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 12.5,
                            }}
                        >
                            HD
                        </Typography>
                    </Box>
                </Box>

                {/* ================================================= */}
                {/* CHANNEL + ACTIONS                                   */}
                {/* ================================================= */}

                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 3,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Channel */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            minWidth: 0,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: {
                                    xs: 48,
                                    md: 54,
                                },
                                height: {
                                    xs: 48,
                                    md: 54,
                                },
                                flexShrink: 0,
                                background:
                                    "linear-gradient(135deg, #ff335f 0%, #9b5cff 100%)",
                                boxShadow:
                                    "0 8px 30px rgba(255,51,95,0.2)",
                                fontWeight: 800,
                                fontSize: 18,
                            }}
                        >
                            {video.channelName
                                ?.charAt(0)
                                ?.toUpperCase() || "C"}
                        </Avatar>

                        <Box
                            sx={{
                                minWidth: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        color: "#f1f1f3",
                                        fontSize: 15,
                                        whiteSpace:
                                            "nowrap",
                                        overflow:
                                            "hidden",
                                        textOverflow:
                                            "ellipsis",
                                        maxWidth: {
                                            xs: 160,
                                            sm: 280,
                                        },
                                    }}
                                >
                                    {video.channelName}
                                </Typography>

                                <VerifiedIcon
                                    sx={{
                                        fontSize: 15,
                                        color: "#ff335f",
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: 0.7,
                                    mt: 0.35,
                                }}
                            >
                                <PeopleIcon
                                    sx={{
                                        fontSize: 14,
                                        color: "#62666f",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#777c85",
                                        fontSize: 12.5,
                                    }}
                                >
                                    {formatSubscribers(
                                        subscriberCount
                                    )}{" "}
                                    subscribers
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            onClick={handleSubscribe}
                            disabled={
                                subscribeLoading
                            }
                            sx={{
                                ml: {
                                    xs: 0.5,
                                    sm: 1.5,
                                },
                                px: {
                                    xs: 1.8,
                                    sm: 2.5,
                                },
                                minWidth: 0,
                                height: 40,
                                borderRadius: "11px",
                                textTransform: "none",
                                fontWeight: 800,
                                fontSize: 13,
                                color: isSubscribed
                                    ? "#e9e9ec"
                                    : "#fff",
                                backgroundColor:
                                    isSubscribed
                                        ? "#25282e"
                                        : "#ff335f",
                                border: isSubscribed
                                    ? "1px solid rgba(255,255,255,0.08)"
                                    : "1px solid transparent",
                                boxShadow:
                                    isSubscribed
                                        ? "none"
                                        : "0 8px 24px rgba(255,51,95,0.22)",
                                "&:hover": {
                                    backgroundColor:
                                        isSubscribed
                                            ? "#30333a"
                                            : "#e92d57",
                                },
                            }}
                        >
                            {subscribeLoading
                                ? "..."
                                : isSubscribed
                                    ? "Subscribed"
                                    : "Subscribe"}
                        </Button>
                    </Box>

                    {/* Action dock */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                            p: 0.7,
                            borderRadius: "14px",
                            background:
                                "rgba(255,255,255,0.035)",
                            border:
                                "1px solid rgba(255,255,255,0.065)",
                        }}
                    >
                        <Button
                            onClick={handleLike}
                            disabled={likeLoading}
                            startIcon={
                                isLiked ? (
                                    <ThumbUpFilledIcon
                                        sx={{
                                            fontSize:
                                                19,
                                        }}
                                    />
                                ) : (
                                    <ThumbUpIcon
                                        sx={{
                                            fontSize:
                                                19,
                                        }}
                                    />
                                )
                            }
                            sx={{
                                minHeight: 38,
                                px: 1.7,
                                borderRadius: "10px",
                                color: isLiked
                                    ? "#ff4770"
                                    : "#d5d6da",
                                backgroundColor:
                                    isLiked
                                        ? "rgba(255,51,95,0.10)"
                                        : "transparent",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: 13,
                                "&:hover": {
                                    backgroundColor:
                                        isLiked
                                            ? "rgba(255,51,95,0.16)"
                                            : "rgba(255,255,255,0.06)",
                                },
                            }}
                        >
                            {likeCount > 0
                                ? likeCount
                                : "Like"}
                        </Button>

                        <Box
                            sx={{
                                width: "1px",
                                height: 22,
                                backgroundColor:
                                    "rgba(255,255,255,0.08)",
                            }}
                        />

                        <Tooltip title="Share">
                            <Button
                                onClick={handleShare}
                                startIcon={
                                    <ShareIcon
                                        sx={{
                                            fontSize: 19,
                                        }}
                                    />
                                }
                                sx={{
                                    minHeight: 38,
                                    px: 1.7,
                                    borderRadius:
                                        "10px",
                                    color: "#d5d6da",
                                    textTransform:
                                        "none",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.06)",
                                    },
                                }}
                            >
                                Share
                            </Button>
                        </Tooltip>

                        <Tooltip title="Save">
                            <IconButton
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius:
                                        "10px",
                                    color: "#d5d6da",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.06)",
                                    },
                                }}
                            >
                                <SaveIcon
                                    sx={{
                                        fontSize: 20,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="More">
                            <IconButton
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius:
                                        "10px",
                                    color: "#d5d6da",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.06)",
                                    },
                                }}
                            >
                                <MoreIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* ================================================= */}
                {/* DIVIDER                                             */}
                {/* ================================================= */}

                <Divider
                    sx={{
                        mt: 3.5,
                        mb: 3,
                        borderColor:
                            "rgba(255,255,255,0.065)",
                    }}
                />

                {/* ================================================= */}
                {/* DESCRIPTION                                        */}
                {/* ================================================= */}

                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: {
                            xs: 2.5,
                            md: 3,
                        },
                        background:
                            "linear-gradient(145deg, rgba(23,26,31,0.98), rgba(15,17,21,0.98))",
                        border:
                            "1px solid rgba(255,255,255,0.065)",
                        p: {
                            xs: 2.2,
                            sm: 3,
                            md: 3.5,
                        },
                    }}
                >
                    {/* Accent line */}

                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 22,
                            bottom: 22,
                            width: 3,
                            borderRadius: "0 4px 4px 0",
                            background:
                                "linear-gradient(to bottom, #ff335f, #8b5cf6)",
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
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
                                background:
                                    "rgba(255,255,255,0.05)",
                                color: "#c9cbd0",
                            }}
                        >
                            <DescriptionIcon
                                sx={{
                                    fontSize: 18,
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 800,
                                color: "#e8e9ec",
                            }}
                        >
                            About this video
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            color: "#a0a4ac",
                            fontSize: 14,
                            lineHeight: 1.8,
                            whiteSpace: "pre-line",
                            maxWidth: 1000,
                        }}
                    >
                        {video.description ||
                            "No description provided for this video."}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1,
                            mt: 3,
                            pt: 2.5,
                            borderTop:
                                "1px solid rgba(255,255,255,0.055)",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 0.8,
                                px: 1.2,
                                py: 0.7,
                                borderRadius: "8px",
                                background:
                                    "rgba(255,255,255,0.035)",
                            }}
                        >
                            <CalendarIcon
                                sx={{
                                    fontSize: 14,
                                    color: "#70757e",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#858a93",
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                }}
                            >
                                Published{" "}
                                {formatDate(
                                    video.uploadedAt
                                )}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 0.8,
                                px: 1.2,
                                py: 0.7,
                                borderRadius: "8px",
                                background:
                                    "rgba(255,255,255,0.035)",
                            }}
                        >
                            <LinkIcon
                                sx={{
                                    fontSize: 14,
                                    color: "#70757e",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#858a93",
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                }}
                            >
                                CleanTube
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* ================================================= */}
                {/* CHANNEL SPOTLIGHT                                  */}
                {/* ================================================= */}

                <Box
                    sx={{
                        mt: 3,
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr auto",
                        },
                        alignItems: "center",
                        gap: 2,
                        p: {
                            xs: 2.2,
                            sm: 2.8,
                        },
                        borderRadius: {
                            xs: 2.5,
                            md: 3,
                        },
                        background:
                            "linear-gradient(110deg, rgba(255,51,95,0.055), rgba(139,92,246,0.035), rgba(255,255,255,0.02))",
                        border:
                            "1px solid rgba(255,255,255,0.06)",
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
                                width: 46,
                                height: 46,
                                background:
                                    "linear-gradient(135deg, #ff335f, #8b5cf6)",
                                fontWeight: 800,
                            }}
                        >
                            {video.channelName
                                ?.charAt(0)
                                ?.toUpperCase() || "C"}
                        </Avatar>

                        <Box>
                            <Typography
                                sx={{
                                    color: "#e9e9ec",
                                    fontWeight: 800,
                                    fontSize: 14,
                                }}
                            >
                                More from{" "}
                                {video.channelName}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.3,
                                    color: "#777c85",
                                    fontSize: 12,
                                }}
                            >
                                {formatSubscribers(
                                    subscriberCount
                                )}{" "}
                                subscribers
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        onClick={handleSubscribe}
                        disabled={subscribeLoading}
                        sx={{
                            justifySelf: {
                                xs: "stretch",
                                md: "auto",
                            },
                            minWidth: {
                                xs: 0,
                                md: 130,
                            },
                            height: 40,
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 800,
                            color: isSubscribed
                                ? "#d8d9dd"
                                : "#fff",
                            backgroundColor:
                                isSubscribed
                                    ? "rgba(255,255,255,0.07)"
                                    : "#ff335f",
                            "&:hover": {
                                backgroundColor:
                                    isSubscribed
                                        ? "rgba(255,255,255,0.11)"
                                        : "#e92d57",
                            },
                        }}
                    >
                        {isSubscribed
                            ? "Subscribed"
                            : "Subscribe"}
                    </Button>
                </Box>

                {/* ================================================= */}
                {/* COMMENTS                                           */}
                {/* ================================================= */}

                <Box
                    sx={{
                        mt: 5,
                        pt: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 4,
                                height: 26,
                                borderRadius: 4,
                                background:
                                    "#ff335f",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 20,
                                    md: 24,
                                },
                                fontWeight: 800,
                                letterSpacing:
                                    "-0.7px",
                                color: "#f0f1f3",
                            }}
                        >
                            Discussion
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            borderRadius: {
                                xs: 2.5,
                                md: 3,
                            },
                            background:
                                "rgba(255,255,255,0.018)",
                            border:
                                "1px solid rgba(255,255,255,0.045)",
                            p: {
                                xs: 1.5,
                                sm: 2.5,
                                md: 3,
                            },
                        }}
                    >
                        <CommentSection
                            videoId={id}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
);
}

export default Video;


