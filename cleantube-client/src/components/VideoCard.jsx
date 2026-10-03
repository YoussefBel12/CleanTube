
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Chip,
} from "@mui/material";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/video/${video.id}`)}
            sx={{
                background: "transparent",
                boxShadow: "none",
                cursor: "pointer",
                overflow: "visible",

                "&:hover .thumbnail": {
                    transform: "scale(1.035)",
                },

                "&:hover .thumbnail-overlay": {
                    opacity: 1,
                },

                "&:hover .play-button": {
                    opacity: 1,
                    transform: "translate(-50%, -50%) scale(1)",
                },

                "&:hover .video-title": {
                    color: "#ff4770",
                },
            }}
        >
            {/* Thumbnail */}
            <Box
                sx={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background:
                        "linear-gradient(135deg, #202127 0%, #0e0f12 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                }}
            >
                {video.thumbnailUrl ? (
                    <Box
                        component="img"
                        className="thumbnail"
                        src={`https://localhost:7140${video.thumbnailUrl}`}
                        alt={video.title}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition:
                                "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        }}
                    />
                ) : (
                    <Box
                        className="thumbnail"
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "radial-gradient(circle at 30% 20%, #343640, #101116 70%)",
                            transition:
                                "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 36,
                                fontWeight: 900,
                                letterSpacing: "-2px",
                                color: "rgba(255,255,255,0.07)",
                            }}
                        >
                            CLEAN
                        </Typography>
                    </Box>
                )}

                {/* Hover gradient */}
                <Box
                    className="thumbnail-overlay"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        transition: "opacity 0.25s ease",
                        background:
                            "linear-gradient(to top, rgba(5,5,8,0.65), transparent 55%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Quality */}
                <Chip
                    label="HD"
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: 9,
                        right: 9,
                        height: 23,
                        borderRadius: "7px",
                        backgroundColor: "rgba(5,5,7,0.78)",
                        backdropFilter: "blur(8px)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.3px",
                    }}
                />

                {/* Play button */}
                <Box
                    className="play-button"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                            "translate(-50%, -50%) scale(0.75)",
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ff335f",
                        color: "white",
                        opacity: 0,
                        boxShadow:
                            "0 8px 30px rgba(255,51,95,0.35)",
                        transition:
                            "opacity 0.2s ease, transform 0.2s ease",
                    }}
                >
                    <PlayArrowRoundedIcon fontSize="medium" />
                </Box>
            </Box>

            {/* Information */}
            <CardContent
                sx={{
                    px: 0.5,
                    pt: 1.5,
                    pb: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 1.25,
                        alignItems: "flex-start",
                    }}
                >
                    {/* Channel avatar */}
                    <Avatar
                        sx={{
                            width: 34,
                            height: 34,
                            flexShrink: 0,
                            mt: 0.15,
                            background:
                                "linear-gradient(135deg, #ff335f, #7c3aed)",
                            fontSize: 14,
                            fontWeight: 800,
                        }}
                    >
                        C
                    </Avatar>

                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                            className="video-title"
                            sx={{
                                color: "#f3f3f5",
                                fontWeight: 700,
                                fontSize: 14.5,
                                lineHeight: 1.35,
                                letterSpacing: "-0.1px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                transition: "color 0.2s ease",
                            }}
                        >
                            {video.title}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#92929a",
                                fontSize: 12.5,
                                mt: 0.6,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {video.channelName}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.7,
                                mt: 0.2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#62636b",
                                    fontSize: 11.5,
                                }}
                            >
                                {video.uploadedAt
                                    ? new Date(
                                        video.uploadedAt
                                    ).toLocaleDateString()
                                    : "Recently uploaded"}
                            </Typography>

                            <Box
                                sx={{
                                    width: 3,
                                    height: 3,
                                    borderRadius: "50%",
                                    backgroundColor: "#55565d",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#62636b",
                                    fontSize: 11.5,
                                }}
                            >
                                HD
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default VideoCard;