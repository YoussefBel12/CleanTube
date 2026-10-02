
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
                backgroundColor: "transparent",
                boxShadow: "none",
                cursor: "pointer",
                overflow: "visible",

                "&:hover .thumbnail": {
                    transform: "scale(1.025)",
                },

                "&:hover .play-button": {
                    opacity: 1,
                    transform: "translate(-50%, -50%) scale(1)",
                },
            }}
        >
            <Box
                className="thumbnail-container"
                sx={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    borderRadius: 3,
                    overflow: "hidden",
                    background:
                        "linear-gradient(135deg, #24242a 0%, #111116 100%)",
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
                            transition: "transform 0.35s ease",
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
                                "radial-gradient(circle at 30% 20%, #383842, #111116 70%)",
                            transition: "transform 0.35s ease",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 42,
                                fontWeight: 900,
                                color: "rgba(255,255,255,0.08)",
                            }}
                        >
                            CLEAN
                        </Typography>
                    </Box>
                )}

                <Chip
                    label="HD"
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        height: 24,
                        backgroundColor: "rgba(0,0,0,0.75)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 11,
                    }}
                />

                <Box
                    className="play-button"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                            "translate(-50%, -50%) scale(0.85)",
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,51,95,0.95)",
                        color: "white",
                        opacity: 0,
                        transition: "all 0.2s ease",
                    }}
                >
                    <PlayArrowRoundedIcon fontSize="large" />
                </Box>
            </Box>

            <CardContent sx={{ px: 0, pt: 1.5 }}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            background:
                                "linear-gradient(135deg, #ff335f, #8b5cf6)",
                            fontWeight: 700,
                        }}
                    >
                        C
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            sx={{
                                color: "white",
                                fontWeight: 700,
                                fontSize: 15,
                                lineHeight: 1.35,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {video.title}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#888",
                                fontSize: 13,
                                mt: 0.5,
                            }}
                        >
                            {video.channelName}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#5f5f66",
                                fontSize: 12,
                                mt: 0.2,
                            }}
                        >
                            {video.uploadedAt
                                ? new Date(
                                      video.uploadedAt
                                  ).toLocaleDateString()
                                : "Recently uploaded"}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default VideoCard;





