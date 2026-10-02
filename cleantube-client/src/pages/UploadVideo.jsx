import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
} from "@mui/material";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import api from "../api/axios";

function UploadVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [channelId, setChannelId] = useState(1);

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!videoFile || !thumbnailFile) {
            setMessage("Please select both a video and thumbnail.");
            return;
        }

        const formData = new FormData();

        formData.append("Title", title);
        formData.append("Description", description);
        formData.append("ChannelId", channelId);
        formData.append("VideoFile", videoFile);
        formData.append("ThumbnailFile", thumbnailFile);

        try {
            setUploading(true);
            setMessage("");

            const response = await api.post(
                "/Videos",
                formData
            );

            console.log("Uploaded video ID:", response.data);

            setMessage("Video uploaded successfully!");

            setTitle("");
            setDescription("");
            setVideoFile(null);
            setThumbnailFile(null);
        } catch (error) {
            console.error("Upload Error:", error);

            setMessage(
                error.response?.data?.message ||
                "Upload failed."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "background.default",
                display: "flex",
                justifyContent: "center",
                padding: { xs: 2, md: 6 },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 720,
                    p: { xs: 3, md: 5 },
                    backgroundColor: "background.paper",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 900,
                        mb: 1,
                    }}
                >
                    Upload video
                </Typography>

                <Typography
                    sx={{
                        color: "text.secondary",
                        mb: 4,
                    }}
                >
                    Share something with the CleanTube community.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={3}>

                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                            fullWidth
                        />

                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            multiline
                            minRows={5}
                            fullWidth
                        />

                        <TextField
                            label="Channel ID"
                            type="number"
                            value={channelId}
                            onChange={(e) =>
                                setChannelId(e.target.value)
                            }
                            required
                            fullWidth
                        />

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1,
                                }}
                            >
                                Video
                            </Typography>

                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadRoundedIcon />}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                }}
                            >
                                {videoFile
                                    ? videoFile.name
                                    : "Choose video"}

                                <input
                                    type="file"
                                    hidden
                                    accept="video/mp4,video/webm,video/quicktime"
                                    onChange={(e) =>
                                        setVideoFile(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            </Button>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    mb: 1,
                                }}
                            >
                                Thumbnail
                            </Typography>

                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadRoundedIcon />}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                }}
                            >
                                {thumbnailFile
                                    ? thumbnailFile.name
                                    : "Choose thumbnail"}

                                <input
                                    type="file"
                                    hidden
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) =>
                                        setThumbnailFile(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            </Button>
                        </Box>

                        {message && (
                            <Typography
                                sx={{
                                    color: message.includes("success")
                                        ? "#4ade80"
                                        : "#ff6b81",
                                    fontWeight: 600,
                                }}
                            >
                                {message}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={uploading}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 800,
                            }}
                        >
                            {uploading
                                ? "Uploading..."
                                : "Upload video"}
                        </Button>

                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default UploadVideo;