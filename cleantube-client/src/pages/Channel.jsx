
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Avatar,
    Button,
    Skeleton,
    IconButton,
    Tooltip,
} from "@mui/material";

import {
    UploadRounded as UploadIcon,
    EditRounded as EditIcon,
    PlayArrowRounded as PlayIcon,
    VideoLibraryRounded as VideoLibraryIcon,
    PeopleAltRounded as PeopleIcon,
    //ArrowForwardRounded as ArrowForwardIcon,
    MoreHorizRounded as MoreIcon,
    VerifiedRounded as VerifiedIcon,
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

setSubscriberCount(
    subscriberResponse.data
);

const videosResponse = await api.get(
    "/Videos"
);

const myVideos =
    videosResponse.data.filter(
        (video) =>
            video.channelId ===
            channelResponse.data.id
    );

setVideos(myVideos);
            } catch (error) {
    if (error.response?.status === 404) {
        setChannel(null);
        return;
    }

    console.error(
        "Channel Error:",
        error
    );
} finally {
    setLoading(false);
}
        };

loadChannel();
    }, []);

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

const formatNumber = (number) => {
    if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1)}M`;
    }

    if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}K`;
    }

    return number.toLocaleString();
};

/*
 * ============================================================
 * LOADING STATE
 * ============================================================
 */

if (loading) {
    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    ml: {
                        xs: 0,
                        md: "220px",
                    },
                    minHeight: "100vh",
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
                        maxWidth: 1500,
                        mx: "auto",
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: "100%",
                            height: {
                                xs: 180,
                                md: 270,
                            },
                            borderRadius: {
                                xs: 2,
                                md: 3,
                            },
                            backgroundColor:
                                "rgba(255,255,255,0.045)",
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: 2,
                            mt: -6,
                            px: 3,
                            position: "relative",
                        }}
                    >
                        <Skeleton
                            variant="circular"
                            width={130}
                            height={130}
                            sx={{
                                flexShrink: 0,
                                border:
                                    "6px solid #0a0c0f",
                                backgroundColor:
                                    "rgba(255,255,255,0.07)",
                            }}
                        />

                        <Box
                            sx={{
                                flex: 1,
                                pb: 1,
                            }}
                        >
                            <Skeleton
                                width={260}
                                height={45}
                                sx={{
                                    backgroundColor:
                                        "rgba(255,255,255,0.05)",
                                }}
                            />

                            <Skeleton
                                width={180}
                                height={24}
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

/*
 * ============================================================
 * NO CHANNEL
 * ============================================================
 */

if (!channel) {
    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    ml: {
                        xs: 0,
                        md: "220px",
                    },
                    minHeight: "100vh",
                    px: 2,
                    pt: {
                        xs: 11,
                        md: 14,
                    },
                    pb: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "radial-gradient(circle at 50% 20%, rgba(255,51,95,0.07), transparent 38%)",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 620,
                        textAlign: "center",
                        p: {
                            xs: 3,
                            sm: 5,
                        },
                        borderRadius: {
                            xs: 3,
                            md: 4,
                        },
                        background:
                            "linear-gradient(145deg, rgba(22,25,30,0.98), rgba(13,15,19,0.98))",
                        border:
                            "1px solid rgba(255,255,255,0.07)",
                        boxShadow:
                            "0 35px 100px rgba(0,0,0,0.35)",
                    }}
                >
                    <Box
                        sx={{
                            width: 92,
                            height: 92,
                            mx: "auto",
                            mb: 3,
                            borderRadius: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(135deg, rgba(255,51,95,0.14), rgba(139,92,246,0.14))",
                            border:
                                "1px solid rgba(255,255,255,0.07)",
                            color: "#ff4770",
                        }}
                    >
                        <VideoLibraryIcon
                            sx={{
                                fontSize: 40,
                            }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 27,
                                sm: 34,
                            },
                            fontWeight: 900,
                            letterSpacing:
                                "-1.5px",
                            color: "#f2f3f5",
                        }}
                    >
                        Create your channel
                    </Typography>

                    <Typography
                        sx={{
                            color: "#747983",
                            fontSize: 14,
                            lineHeight: 1.7,
                            maxWidth: 470,
                            mx: "auto",
                            mt: 1.5,
                        }}
                    >
                        Give your content a home. Create
                        a channel, upload videos, and
                        start building your audience on
                        CleanTube.
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() =>
                            navigate(
                                "/create-channel"
                            )
                        }
                        sx={{
                            mt: 3.5,
                            height: 46,
                            px: 3,
                            borderRadius: "11px",
                            textTransform: "none",
                            fontWeight: 800,
                            backgroundColor:
                                "#ff335f",
                            boxShadow:
                                "0 10px 30px rgba(255,51,95,0.22)",
                            "&:hover": {
                                backgroundColor:
                                    "#e92d57",
                            },
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

/*
 * ============================================================
 * CHANNEL PAGE
 * ============================================================
 */

return (
    <>
        <Navbar />
        <Sidebar />

        <Box
            component="main"
            sx={{
                ml: {
                    xs: 0,
                    md: "220px",
                },
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 70% 0%, rgba(255,51,95,0.035), transparent 28%)",
                pb: 8,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1550,
                    mx: "auto",
                }}
            >
                {/* ================================================== */}
                {/* HERO / BANNER                                       */}
                {/* ================================================== */}

                <Box
                    sx={{
                        position: "relative",
                        height: {
                            xs: 210,
                            sm: 250,
                            md: 310,
                        },
                        overflow: "hidden",
                        background:
                            "linear-gradient(120deg, #151820 0%, #25202c 35%, #171923 68%, #0d1015 100%)",
                        borderBottom:
                            "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    {/* Ambient pink light */}

                    <Box
                        sx={{
                            position: "absolute",
                            width: {
                                xs: 280,
                                md: 520,
                            },
                            height: {
                                xs: 280,
                                md: 520,
                            },
                            left: "8%",
                            top: "-45%",
                            borderRadius: "50%",
                            background:
                                "rgba(255,51,95,0.18)",
                            filter: "blur(80px)",
                        }}
                    />

                    {/* Purple light */}

                    <Box
                        sx={{
                            position: "absolute",
                            width: {
                                xs: 260,
                                md: 450,
                            },
                            height: {
                                xs: 260,
                                md: 450,
                            },
                            right: "5%",
                            bottom: "-55%",
                            borderRadius: "50%",
                            background:
                                "rgba(124,58,237,0.18)",
                            filter: "blur(80px)",
                        }}
                    />

                    {/* Grid texture */}

                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0.28,
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                            backgroundSize:
                                "42px 42px",
                            maskImage:
                                "linear-gradient(to bottom, black, transparent)",
                        }}
                    />

                    {/* Bottom gradient */}

                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to bottom, transparent 20%, rgba(10,12,15,0.25) 55%, #0a0c0f 100%)",
                        }}
                    />

                    {/* Decorative CLEAN mark */}

                    <Typography
                        sx={{
                            position: "absolute",
                            right: {
                                xs: 20,
                                md: 55,
                            },
                            top: {
                                xs: 30,
                                md: 50,
                            },
                            fontSize: {
                                xs: 42,
                                md: 90,
                            },
                            lineHeight: 1,
                            fontWeight: 900,
                            letterSpacing:
                                "-5px",
                            color:
                                "rgba(255,255,255,0.035)",
                            userSelect: "none",
                        }}
                    >
                        CLEAN
                    </Typography>
                </Box>

                {/* ================================================== */}
                {/* CHANNEL IDENTITY                                    */}
                {/* ================================================== */}

                <Box
                    sx={{
                        px: {
                            xs: 2,
                            sm: 3,
                            lg: 5,
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            mt: {
                                xs: -6,
                                md: -7,
                            },
                            display: "flex",
                            alignItems: {
                                xs: "center",
                                md: "flex-end",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: 2,
                                md: 3,
                            },
                        }}
                    >
                        {/* Avatar */}

                        <Avatar
                            sx={{
                                width: {
                                    xs: 112,
                                    sm: 128,
                                    md: 150,
                                },
                                height: {
                                    xs: 112,
                                    sm: 128,
                                    md: 150,
                                },
                                flexShrink: 0,
                                border:
                                    "7px solid #0a0c0f",
                                background:
                                    "linear-gradient(135deg, #ff335f 0%, #8b5cf6 100%)",
                                fontSize: {
                                    xs: 43,
                                    md: 58,
                                },
                                fontWeight: 900,
                                boxShadow:
                                    "0 18px 50px rgba(0,0,0,0.45)",
                            }}
                        >
                            {channelInitial}
                        </Avatar>

                        {/* Main identity */}

                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                pb: {
                                    xs: 0,
                                    md: 1,
                                },
                                textAlign: {
                                    xs: "center",
                                    md: "left",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                    },
                                    gap: 0.7,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: 29,
                                            sm: 34,
                                            md: 40,
                                        },
                                        fontWeight: 900,
                                        lineHeight: 1,
                                        letterSpacing:
                                            "-1.8px",
                                        color: "#f4f5f7",
                                        overflow:
                                            "hidden",
                                        textOverflow:
                                            "ellipsis",
                                        whiteSpace:
                                            "nowrap",
                                    }}
                                >
                                    {channel.name}
                                </Typography>

                                <VerifiedIcon
                                    sx={{
                                        flexShrink: 0,
                                        fontSize: {
                                            xs: 18,
                                            md: 21,
                                        },
                                        color:
                                            "#ff4770",
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    color: "#737883",
                                    fontSize: 13,
                                    mt: 0.8,
                                }}
                            >
                                @
                                {channel.name
                                    ?.replace(
                                        /\s+/g,
                                        ""
                                    )
                                    .toLowerCase()}
                            </Typography>

                            {/* Stats */}

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent: {
                                        xs: "center",
                                        md: "flex-start",
                                    },
                                    flexWrap:
                                        "wrap",
                                    gap: {
                                        xs: 1.5,
                                        sm: 2,
                                    },
                                    mt: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 0.8,
                                    }}
                                >
                                    <VideoLibraryIcon
                                        sx={{
                                            fontSize: 17,
                                            color: "#777c85",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            color: "#b5b7bd",
                                            fontSize: 13,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {
                                            videos.length
                                        }{" "}
                                        {videos.length ===
                                            1
                                            ? "video"
                                            : "videos"}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius:
                                            "50%",
                                        backgroundColor:
                                            "#50545c",
                                    }}
                                />

                                <Box
                                    sx={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 0.8,
                                    }}
                                >
                                    <PeopleIcon
                                        sx={{
                                            fontSize: 17,
                                            color: "#777c85",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            color: "#b5b7bd",
                                            fontSize: 13,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {formatNumber(
                                            subscriberCount
                                        )}{" "}
                                        {subscriberCount ===
                                            1
                                            ? "subscriber"
                                            : "subscribers"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Actions */}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 1,
                                pb: {
                                    xs: 0,
                                    md: 1,
                                },
                                width: {
                                    xs: "100%",
                                    md: "auto",
                                },
                            }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={
                                    <EditIcon />
                                }
                                onClick={() =>
                                    navigate(
                                        "/channel/customize"
                                    )
                                }
                                sx={{
                                    flex: {
                                        xs: 1,
                                        md: "initial",
                                    },
                                    height: 42,
                                    px: 2,
                                    borderRadius:
                                        "11px",
                                    borderColor:
                                        "rgba(255,255,255,0.10)",
                                    color: "#d7d8dc",
                                    textTransform:
                                        "none",
                                    fontWeight: 800,
                                    "&:hover": {
                                        borderColor:
                                            "rgba(255,255,255,0.2)",
                                        backgroundColor:
                                            "rgba(255,255,255,0.045)",
                                    },
                                }}
                            >
                                Customize
                            </Button>

                            <Button
                                variant="contained"
                                startIcon={
                                    <UploadIcon />
                                }
                                onClick={() =>
                                    navigate(
                                        "/upload"
                                    )
                                }
                                sx={{
                                    flex: {
                                        xs: 1,
                                        md: "initial",
                                    },
                                    height: 42,
                                    px: 2.2,
                                    borderRadius:
                                        "11px",
                                    backgroundColor:
                                        "#ff335f",
                                    color: "#fff",
                                    textTransform:
                                        "none",
                                    fontWeight: 800,
                                    boxShadow:
                                        "0 9px 25px rgba(255,51,95,0.20)",
                                    "&:hover": {
                                        backgroundColor:
                                            "#e92d57",
                                    },
                                }}
                            >
                                Upload
                            </Button>

                            <Tooltip title="More">
                                <IconButton
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius:
                                            "11px",
                                        color: "#858991",
                                        border:
                                            "1px solid rgba(255,255,255,0.07)",
                                        display: {
                                            xs: "none",
                                            sm: "flex",
                                        },
                                    }}
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    {/* ================================================== */}
                    {/* CHANNEL NAVIGATION                                 */}
                    {/* ================================================== */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",
                            gap: 3,
                            mt: 4,
                            borderBottom:
                                "1px solid rgba(255,255,255,0.065)",
                        }}
                    >
                        <Box
                            sx={{
                                position:
                                    "relative",
                                pb: 1.6,
                                px: 0.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#f0f1f3",
                                    fontSize: 13,
                                    fontWeight: 800,
                                }}
                            >
                                Videos
                            </Typography>

                            <Box
                                sx={{
                                    position:
                                        "absolute",
                                    left: 0,
                                    right: 0,
                                    bottom: -1,
                                    height: 2,
                                    borderRadius:
                                        "2px",
                                    background:
                                        "#ff335f",
                                    boxShadow:
                                        "0 0 15px rgba(255,51,95,0.5)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* ================================================== */}
                {/* CONTENT                                             */}
                {/* ================================================== */}

                <Box
                    sx={{
                        px: {
                            xs: 2,
                            sm: 3,
                            lg: 5,
                        },
                        pt: {
                            xs: 3,
                            md: 4,
                        },
                    }}
                >
                    {/* Section heading */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent:
                                "space-between",
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 22,
                                        md: 27,
                                    },
                                    fontWeight: 850,
                                    letterSpacing:
                                        "-1px",
                                    color: "#f0f1f3",
                                }}
                            >
                                Your videos
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#696e77",
                                    fontSize: 12.5,
                                    mt: 0.5,
                                }}
                            >
                                Everything you've
                                published on
                                CleanTube.
                            </Typography>
                        </Box>

                        {videos.length > 0 && (
                            <Typography
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "block",
                                    },
                                    color: "#555a63",
                                    fontSize: 11,
                                    textTransform:
                                        "uppercase",
                                    letterSpacing:
                                        "1px",
                                    fontWeight: 800,
                                }}
                            >
                                {videos.length}{" "}
                                {videos.length ===
                                    1
                                    ? "upload"
                                    : "uploads"}
                            </Typography>
                        )}
                    </Box>

                    {/* ================================================== */}
                    {/* EMPTY VIDEOS                                      */}
                    {/* ================================================== */}

                    {videos.length === 0 ? (
                        <Box
                            sx={{
                                position:
                                    "relative",
                                overflow:
                                    "hidden",
                                textAlign:
                                    "center",
                                py: {
                                    xs: 7,
                                    md: 10,
                                },
                                px: 3,
                                borderRadius: {
                                    xs: 2.5,
                                    md: 3,
                                },
                                background:
                                    "linear-gradient(145deg, rgba(23,26,31,0.9), rgba(14,16,20,0.9))",
                                border:
                                    "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <Box
                                sx={{
                                    position:
                                        "absolute",
                                    width: 240,
                                    height: 240,
                                    left: "50%",
                                    top: "50%",
                                    transform:
                                        "translate(-50%, -50%)",
                                    borderRadius:
                                        "50%",
                                    background:
                                        "rgba(255,51,95,0.06)",
                                    filter:
                                        "blur(70px)",
                                }}
                            />

                            <Box
                                sx={{
                                    position:
                                        "relative",
                                    zIndex: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 72,
                                        height: 72,
                                        mx: "auto",
                                        mb: 2.5,
                                        borderRadius:
                                            "22px",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",
                                        background:
                                            "rgba(255,51,95,0.08)",
                                        border:
                                            "1px solid rgba(255,51,95,0.12)",
                                        color: "#ff4770",
                                    }}
                                >
                                    <PlayIcon
                                        sx={{
                                            fontSize: 32,
                                        }}
                                    />
                                </Box>

                                <Typography
                                    sx={{
                                        fontSize: 21,
                                        fontWeight: 800,
                                        color: "#e9eaed",
                                    }}
                                >
                                    Your channel is
                                    waiting for its
                                    first video
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#686d76",
                                        fontSize: 13,
                                        lineHeight: 1.7,
                                        maxWidth: 430,
                                        mx: "auto",
                                        mt: 1,
                                    }}
                                >
                                    Upload something
                                    you're proud of
                                    and start building
                                    your library.
                                </Typography>

                                <Button
                                    variant="contained"
                                    startIcon={
                                        <UploadIcon />
                                    }
                                    onClick={() =>
                                        navigate(
                                            "/upload"
                                        )
                                    }
                                    sx={{
                                        mt: 3,
                                        height: 42,
                                        px: 2.5,
                                        borderRadius:
                                            "10px",
                                        textTransform:
                                            "none",
                                        fontWeight: 800,
                                        backgroundColor:
                                            "#ff335f",
                                        boxShadow:
                                            "0 8px 25px rgba(255,51,95,0.20)",
                                        "&:hover": {
                                            backgroundColor:
                                                "#e92d57",
                                        },
                                    }}
                                >
                                    Upload your
                                    first video
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        /* ================================================== */
                        /* VIDEO GRID                                         */
                        /* ================================================== */

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                {
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
                            {videos.map(
                                (video) => (
                                    <VideoCard
                                        key={
                                            video.id
                                        }
                                        video={
                                            video
                                        }
                                    />
                                )
                            )}
                        </Box>
                    )}

                    {/* ================================================== */}
                    {/* CHANNEL FOOTER                                      */}
                    {/* ================================================== */}

                    <Box
                        sx={{
                            mt: 7,
                            pt: 3,
                            borderTop:
                                "1px solid rgba(255,255,255,0.045)",
                            display: "flex",
                            justifyContent:
                                "center",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#454a52",
                                fontSize: 11,
                                letterSpacing:
                                    "0.4px",
                            }}
                        >
                            {channel.name} ·{" "}
                            {formatNumber(
                                subscriberCount
                            )}{" "}
                            subscribers ·
                            CleanTube
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
);
}

export default Channel;

