
import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Avatar,
    TextField,
    Button,
    Divider,
} from "@mui/material";

import api from "../api/axios";

function CommentSection({ videoId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/Comments/video/${videoId}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error("Comments API Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [videoId]);

    const handleSubmit = async () => {
        if (!content.trim()) return;

        try {
            await api.post("/Comments", {
                content: content.trim(),
                videoId: Number(videoId),
            });

            setContent("");

            const response = await api.get(
                `/Comments/video/${videoId}`
            );

            setComments(response.data);
        } catch (error) {
            console.error("Create Comment Error:", error);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 800,
                    mb: 3,
                }}
            >
                Comments
            </Typography>

            {/* Add comment */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    mb: 4,
                }}
            >
                <Avatar
                    sx={{
                        background:
                            "linear-gradient(135deg, #ff335f, #8b5cf6)",
                        fontWeight: 700,
                    }}
                >
                    Y
                </Avatar>

                <Box sx={{ flex: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder="Share your thoughts..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                backgroundColor: "#151518",
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 1,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                            sx={{
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 700,
                            }}
                        >
                            Comment
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Divider
                sx={{
                    mb: 3,
                    borderColor: "rgba(255,255,255,0.06)",
                }}
            />

            {/* Comments */}
            {loading ? (
                <Typography color="text.secondary">
                    Loading comments...
                </Typography>
            ) : comments.length === 0 ? (
                <Typography color="text.secondary">
                    No comments yet. Be the first to comment.
                </Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {comments.map((comment) => (
                        <Box
                            key={comment.id}
                            sx={{
                                display: "flex",
                                gap: 2,
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    background:
                                        "linear-gradient(135deg, #ff335f, #8b5cf6)",
                                    fontWeight: 700,
                                }}
                            >
                                {comment.userId?.charAt(0).toUpperCase() ||
                                    "U"}
                            </Avatar>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                    }}
                                >
                                    {comment.userName || "User"}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: 14,
                                        mt: 0.5,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {comment.content}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#666",
                                        fontSize: 12,
                                        mt: 0.5,
                                    }}
                                >
                                    {comment.createdAt
                                        ? new Date(
                                              comment.createdAt
                                          ).toLocaleDateString()
                                        : ""}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default CommentSection;

