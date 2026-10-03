{/*
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

                                */}



import { useRef, useState } from "react";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
    LinearProgress,
    IconButton,
} from "@mui/material";

import {
    CloudUploadRounded as CloudUploadIcon,
    MovieCreationOutlined as MovieIcon,
    ImageOutlined as ImageIcon,
    CheckCircleRounded as CheckIcon,
    CloseRounded as CloseIcon,
    PlayArrowRounded as PlayIcon,
} from "@mui/icons-material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UploadVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!videoFile || !thumbnailFile) {
            setMessage(
                "Please select both a video and thumbnail."
            );
            return;
        }

        const formData = new FormData();

        formData.append("Title", title);
        formData.append("Description", description);
        formData.append("VideoFile", videoFile);
        formData.append("ThumbnailFile", thumbnailFile);

        try {
            setUploading(true);
            setMessage("");

            const response = await api.post(
                "/Videos",
                formData
            );

            console.log(
                "Uploaded video ID:",
                response.data
            );

            setMessage(
                "Video uploaded successfully!"
            );

            setTitle("");
            setDescription("");
            setVideoFile(null);
            setThumbnailFile(null);
            setThumbnailPreview("");

            if (videoInputRef.current) {
                videoInputRef.current.value = "";
            }

            if (thumbnailInputRef.current) {
                thumbnailInputRef.current.value = "";
            }
        } catch (error) {
            console.error(
                "Upload Error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Upload failed."
            );
        } finally {
            setUploading(false);
        }
    };

    const handleVideoChange = (event) => {
        const file =
            event.target.files?.[0] || null;

        setVideoFile(file);
        setMessage("");
    };

    const handleThumbnailChange = (event) => {
        const file =
            event.target.files?.[0] || null;

        setThumbnailFile(file);
        setMessage("");

        if (!file) {
            setThumbnailPreview("");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setThumbnailPreview(
                reader.result
            );
        };

        reader.readAsDataURL(file);
    };

    const clearVideo = () => {
        setVideoFile(null);
        setMessage("");

        if (videoInputRef.current) {
            videoInputRef.current.value = "";
        }
    };

    const clearThumbnail = () => {
        setThumbnailFile(null);
        setThumbnailPreview("");
        setMessage("");

        if (thumbnailInputRef.current) {
            thumbnailInputRef.current.value = "";
        }
    };

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
                        width: 500,
                        height: 500,
                        top: -260,
                        right: -160,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(255,51,95,0.08), transparent 68%)",
                        pointerEvents: "none",
                    },

                    "&::after": {
                        content: '""',
                        position: "absolute",
                        width: 400,
                        height: 400,
                        bottom: -250,
                        left: "35%",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(124,58,237,0.045), transparent 70%)",
                        pointerEvents: "none",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        maxWidth: 1180,
                        mx: "auto",
                    }}
                >
                    {/* HEADER */}

                    <Box sx={{ mb: 4.5 }}>
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
                                        "linear-gradient(135deg, rgba(255,51,95,0.15), rgba(255,51,95,0.035))",

                                    border:
                                        "1px solid rgba(255,51,95,0.12)",
                                }}
                            >
                                <CloudUploadIcon
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
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Creator studio
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
                            Upload a video
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1.3,
                                color: "#777b84",
                                fontSize: 14,
                                lineHeight: 1.6,
                                maxWidth: 520,
                            }}
                        >
                            Give your video a title,
                            description and thumbnail
                            before sending it to
                            CleanTube.
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                lg: "minmax(0, 1.35fr) minmax(340px, 0.65fr)",
                            },
                            gap: 3,
                            alignItems: "start",
                        }}
                    >
                        {/* LEFT SIDE */}

                        <Paper
                            elevation={0}
                            sx={{
                                p: {
                                    xs: 2.2,
                                    sm: 3,
                                    md: 3.5,
                                },

                                borderRadius: "18px",

                                background:
                                    "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",

                                border:
                                    "1px solid rgba(255,255,255,0.065)",

                                boxShadow:
                                    "0 25px 70px rgba(0,0,0,0.16)",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#f0f1f3",
                                    fontSize: 15,
                                    fontWeight: 800,
                                    mb: 0.5,
                                }}
                            >
                                Video details
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#656a73",
                                    fontSize: 12,
                                    mb: 3,
                                }}
                            >
                                Tell viewers what they're
                                about to watch.
                            </Typography>

                            <Stack spacing={2.5}>
                                <TextField
                                    label="Title"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(
                                            e.target.value
                                        )
                                    }
                                    required
                                    fullWidth
                                    placeholder="Give your video a clear title"
                                    inputProps={{
                                        maxLength: 150,
                                    }}
                                    helperText={`${ title.length }/150`}
sx = { fieldSx }
    />

                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    minRows={8}
                                    fullWidth
                                    placeholder="Tell viewers about your video..."
                                    inputProps={{
                                        maxLength: 5000,
                                    }}
                                    helperText={`${description.length}/5000`}
                                    sx={fieldSx}
                                />

                                <UploadBox
                                    title="Video file"
                                    description="MP4, WebM or MOV"
                                    icon={
                                        <MovieIcon />
                                    }
                                    file={videoFile}
                                    onClick={() =>
                                        videoInputRef.current?.click()
                                    }
                                    onClear={
                                        clearVideo
                                    }
                                    accept="video/mp4,video/webm,video/quicktime"
                                    inputRef={
                                        videoInputRef
                                    }
                                    onChange={
                                        handleVideoChange
                                    }
                                />

                                <UploadBox
                                    title="Thumbnail"
                                    description="JPG, PNG or WebP"
                                    icon={
                                        <ImageIcon />
                                    }
                                    file={
                                        thumbnailFile
                                    }
                                    preview={
                                        thumbnailPreview
                                    }
                                    onClick={() =>
                                        thumbnailInputRef.current?.click()
                                    }
                                    onClear={
                                        clearThumbnail
                                    }
                                    accept="image/jpeg,image/png,image/webp"
                                    inputRef={
                                        thumbnailInputRef
                                    }
                                    onChange={
                                        handleThumbnailChange
                                    }
                                />
                            </Stack >
                        </Paper >

    {/* RIGHT SIDE */ }

    < Box
sx = {{
    display: "flex",
        flexDirection: "column",
            gap: 2.5,
                            }}
                        >
    {/* PREVIEW */ }

    < Paper
elevation = { 0}
sx = {{
    overflow: "hidden",
        borderRadius: "18px",

            background:
    "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",

        border:
    "1px solid rgba(255,255,255,0.065)",
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 2.2,
                                        py: 1.8,

                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.055)",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color:
                                                "#f0f1f3",
                                            fontSize: 14,
                                            fontWeight: 800,
                                        }}
                                    >
                                        Preview
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color:
                                                "#626771",
                                            fontSize: 11.5,
                                            mt: 0.3,
                                        }}
                                    >
                                        How your video
                                        will look.
                                    </Typography>
                                </Box>

                                <Box sx={{ p: 2.2 }}>
                                    <Box
                                        sx={{
                                            position:
                                                "relative",

                                            aspectRatio:
                                                "16 / 9",

                                            borderRadius:
                                                "13px",

                                            overflow:
                                                "hidden",

                                            background:
                                                "linear-gradient(135deg, #1b1d23, #0d0e11)",

                                            border:
                                                "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        {thumbnailPreview ? (
                                            <Box
                                                component="img"
                                                src={
                                                    thumbnailPreview
                                                }
                                                alt="Thumbnail preview"
                                                sx={{
                                                    width:
                                                        "100%",
                                                    height:
                                                        "100%",
                                                    objectFit:
                                                        "cover",
                                                    display:
                                                        "block",
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width:
                                                        "100%",
                                                    height:
                                                        "100%",

                                                    display:
                                                        "flex",
                                                    flexDirection:
                                                        "column",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center",

                                                    color:
                                                        "#4f535c",
                                                }}
                                            >
                                                <ImageIcon
                                                    sx={{
                                                        fontSize:
                                                            34,
                                                        mb: 1,
                                                    }}
                                                />

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            11,
                                                        fontWeight:
                                                            700,
                                                    }}
                                                >
                                                    Thumbnail
                                                    preview
                                                </Typography>
                                            </Box>
                                        )}

                                        <Box
                                            sx={{
                                                position:
                                                    "absolute",
                                                left: 12,
                                                bottom: 12,

                                                width: 40,
                                                height: 40,

                                                borderRadius:
                                                    "50%",

                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",

                                                backgroundColor:
                                                    "rgba(5,5,7,0.82)",

                                                backdropFilter:
                                                    "blur(10px)",

                                                color:
                                                    "#fff",
                                            }}
                                        >
                                            <PlayIcon
                                                sx={{
                                                    fontSize:
                                                        22,
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        sx={{
                                            mt: 1.7,

                                            color:
                                                title
                                                    ? "#f0f1f3"
                                                    : "#555962",

                                            fontSize: 14,
                                            fontWeight: 750,

                                            overflow:
                                                "hidden",

                                            textOverflow:
                                                "ellipsis",

                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        {title ||
                                            "Your video title will appear here"}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 0.5,

                                            color:
                                                "#656a73",

                                            fontSize: 11.5,

                                            display:
                                                "-webkit-box",

                                            WebkitLineClamp:
                                                2,

                                            WebkitBoxOrient:
                                                "vertical",

                                            overflow:
                                                "hidden",
                                        }}
                                    >
                                        {description ||
                                            "Your description will appear here."}
                                    </Typography>
                                </Box>
                            </Paper >

    {/* FILE SUMMARY */ }

    < Paper
elevation = { 0}
sx = {{
    p: 2.3,

        borderRadius: "18px",

            background:
    "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",

        border:
    "1px solid rgba(255,255,255,0.055)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:
                                            "#e9eaec",
                                        fontSize: 13,
                                        fontWeight: 800,
                                        mb: 1.5,
                                    }}
                                >
                                    Upload checklist
                                </Typography>

                                <ChecklistItem
                                    done={!!videoFile}
                                    label="Video selected"
                                />

                                <ChecklistItem
                                    done={
                                        !!thumbnailFile
                                    }
                                    label="Thumbnail selected"
                                />

                                <ChecklistItem
                                    done={
                                        title.trim()
                                            .length > 0
                                    }
                                    label="Title added"
                                />
                            </Paper >

    {/* STATUS */ }

{
    message && (
        <Box
            sx={{
                display:
                    "flex",
                alignItems:
                    "center",
                gap: 1,

                px: 1.7,
                py: 1.3,

                borderRadius:
                    "11px",

                backgroundColor:
                    message.includes(
                        "success"
                    )
                        ? "rgba(74,222,128,0.07)"
                        : "rgba(255,107,129,0.07)",

                border: `1px solid ${message.includes(
                    "success"
                )
                        ? "rgba(74,222,128,0.12)"
                        : "rgba(255,107,129,0.12)"
                    }`,
            }}
        >
            {message.includes(
                "success"
            ) && (
                    <CheckIcon
                        sx={{
                            fontSize:
                                18,
                            color:
                                "#4ade80",
                        }}
                    />
                )}

            <Typography
                sx={{
                    color:
                        message.includes(
                            "success"
                        )
                            ? "#4ade80"
                            : "#ff7b91",

                    fontSize: 12,
                    fontWeight: 650,
                }}
            >
                {message}
            </Typography>
        </Box>
    )
}

<Button
    type="submit"
    variant="contained"
    disabled={uploading}
    startIcon={
        !uploading && (
            <CloudUploadIcon />
        )
    }
    sx={{
        minHeight: 54,

        borderRadius:
            "13px",

        fontSize: 13.5,
        fontWeight: 800,

        background:
            "linear-gradient(135deg, #ff335f, #e62955)",

        boxShadow:
            "0 12px 30px rgba(255,51,95,0.20)",

        "&:hover": {
            background:
                "linear-gradient(135deg, #ff4770, #ed315c)",

            boxShadow:
                "0 15px 35px rgba(255,51,95,0.28)",
        },

        "&.Mui-disabled": {
            background:
                "rgba(255,255,255,0.07)",
            color:
                "#656970",
        },
    }}
>
    {uploading
        ? "Uploading video..."
        : "Publish video"}
</Button>

{
    uploading && (
        <LinearProgress
            sx={{
                height: 3,
                borderRadius: 3,

                backgroundColor:
                    "rgba(255,255,255,0.05)",

                "& .MuiLinearProgress-bar":
                {
                    backgroundColor:
                        "#ff335f",
                },
            }}
        />
    )
}
                        </Box >
                    </Box >
                </Box >
            </Box >
        </>
    );
}

function UploadBox({
    title,
    description,
    icon,
    file,
    preview,
    onClick,
    onClear,
    accept,
    inputRef,
    onChange,
}) {
    return (
        <Box>
            <Typography
                sx={{
                    color: "#e6e7e9",
                    fontSize: 12.5,
                    fontWeight: 750,
                    mb: 1,
                }}
            >
                {title}
            </Typography>

            <Box
                onClick={!file ? onClick : undefined}
                sx={{
                    position: "relative",

                    minHeight: 105,

                    borderRadius: "13px",

                    border: `1px dashed ${file
                            ? "rgba(255,51,95,0.25)"
                            : "rgba(255,255,255,0.10)"
                        }`,

                    backgroundColor:
                        file
                            ? "rgba(255,51,95,0.025)"
                            : "rgba(255,255,255,0.018)",

                    display: "flex",
                    alignItems: "center",

                    cursor: file
                        ? "default"
                        : "pointer",

                    overflow: "hidden",

                    transition:
                        "border-color 0.2s ease, background-color 0.2s ease",

                    "&:hover": !file
                        ? {
                            borderColor:
                                "rgba(255,51,95,0.35)",
                            backgroundColor:
                                "rgba(255,51,95,0.025)",
                        }
                        : {},
                }}
            >
                {preview && (
                    <Box
                        component="img"
                        src={preview}
                        alt=""
                        sx={{
                            width: 145,
                            height: 82,
                            objectFit: "cover",
                            ml: 1.4,
                            borderRadius: "8px",
                        }}
                    />
                )}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.4,

                        px: preview
                            ? 1.5
                            : 2,

                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: 42,
                            height: 42,

                            flexShrink: 0,

                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",

                            borderRadius: "11px",

                            color: file
                                ? "#ff4770"
                                : "#686d76",

                            backgroundColor:
                                file
                                    ? "rgba(255,51,95,0.09)"
                                    : "rgba(255,255,255,0.035)",
                        }}
                    >
                        {icon}
                    </Box>

                    <Box
                        sx={{
                            minWidth: 0,
                            flex: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                color: file
                                    ? "#eceef0"
                                    : "#b4b7bd",

                                fontSize: 12.5,
                                fontWeight: 700,

                                overflow:
                                    "hidden",

                                textOverflow:
                                    "ellipsis",

                                whiteSpace:
                                    "nowrap",
                            }}
                        >
                            {file
                                ? file.name
                                : `Choose ${title.toLowerCase()}`}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#5e636c",
                                fontSize: 10.5,
                                mt: 0.4,
                            }}
                        >
                            {file
                                ? formatFileSize(
                                    file.size
                                )
                                : description}
                        </Typography>
                    </Box>
                </Box>

                {file ? (
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation();
                            onClear();
                        }}
                        size="small"
                        sx={{
                            mr: 1,
                            color: "#777b84",

                            "&:hover": {
                                color: "#ff4770",
                                backgroundColor:
                                    "rgba(255,51,95,0.08)",
                            },
                        }}
                    >
                        <CloseIcon
                            sx={{
                                fontSize: 18,
                            }}
                        />
                    </IconButton>
                ) : (
                    <CloudUploadIcon
                        sx={{
                            mr: 2,
                            color: "#4f545d",
                            fontSize: 21,
                        }}
                    />
                )}

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={accept}
                    onChange={onChange}
                />
            </Box>
        </Box>
    );
}

function ChecklistItem({ done, label }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 0.7,
            }}
        >
            <Box
                sx={{
                    width: 18,
                    height: 18,

                    borderRadius: "50%",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: done
                        ? "#4ade80"
                        : "#555a63",

                    backgroundColor: done
                        ? "rgba(74,222,128,0.10)"
                        : "rgba(255,255,255,0.035)",
                }}
            >
                {done && (
                    <CheckIcon
                        sx={{
                            fontSize: 12,
                        }}
                    />
                )}
            </Box>

            <Typography
                sx={{
                    color: done
                        ? "#bfc2c7"
                        : "#666b74",

                    fontSize: 11.5,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
}

function formatFileSize(bytes) {
    if (!bytes) {
        return "Unknown size";
    }

    const units = [
        "B",
        "KB",
        "MB",
        "GB",
    ];

    const index = Math.min(
        Math.floor(
            Math.log(bytes) / Math.log(1024)
        ),
        units.length - 1
    );

    const size =
        bytes /
        Math.pow(1024, index);

    return `${size.toFixed(
        index === 0 ? 0 : 1
    )} ${units[index]}`;
}

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "11px",

        backgroundColor:
            "rgba(255,255,255,0.018)",

        "& fieldset": {
            borderColor:
                "rgba(255,255,255,0.075)",
        },

        "&:hover fieldset": {
            borderColor:
                "rgba(255,255,255,0.14)",
        },

        "&.Mui-focused fieldset": {
            borderColor: "#ff335f",
            borderWidth: "1px",
        },
    },

    "& .MuiInputLabel-root": {
        color: "#747982",
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#ff4770",
    },

    "& .MuiInputBase-input": {
        color: "#eceef0",
        fontSize: 13,
    },

    "& .MuiFormHelperText-root": {
        color: "#555a63",
        textAlign: "right",
        marginRight: 0,
    },
};

export default UploadVideo;

