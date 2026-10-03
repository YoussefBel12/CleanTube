
import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

import {
    Box,
    Typography,
    Avatar,
    TextField,
    Button,
    Divider,
    IconButton,
    Tooltip,
    Skeleton,
} from "@mui/material";

import {
    SendRounded as SendIcon,
    ForumRounded as ForumIcon,
    FavoriteBorderRounded as HeartIcon,
    MoreHorizRounded as MoreIcon,
    AccessTimeRounded as TimeIcon,
    PersonRounded as PersonIcon,
} from "@mui/icons-material";

import api from "../api/axios";

function CommentSection({ videoId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    /*
     * ============================================================
     * CURRENT USER
     * ============================================================
     */

    const token = localStorage.getItem("token");

    let currentUsername = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);

            currentUsername =
                decoded.unique_name ||
                decoded.name ||
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ] ||
                "";
        } catch (error) {
            console.error("JWT decode error:", error);
        }
    }

    const currentAvatarLetter = currentUsername
        ? currentUsername.charAt(0).toUpperCase()
        : "U";

    /*
     * ============================================================
     * HELPERS
     * ============================================================
     */

    const formatDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "";
        }

        return parsedDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatRelativeDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "";
        }

        const now = new Date();
        const difference =
            now.getTime() - parsedDate.getTime();

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return "just now";
        }

        if (minutes < 60) {
            return `${ minutes }m ago`;
        }

        if (hours < 24) {
            return `${ hours }h ago`;
        }

        if (days < 7) {
            return `${ days }d ago`;
        }

        return formatDate(date);
    };

    const getAvatarGradient = (name) => {
        const gradients = [
            "linear-gradient(135deg, #ff335f, #8b5cf6)",
            "linear-gradient(135deg, #06b6d4, #6366f1)",
            "linear-gradient(135deg, #f97316, #ec4899)",
            "linear-gradient(135deg, #22c55e, #06b6d4)",
            "linear-gradient(135deg, #8b5cf6, #ec4899)",
        ];

        let value = 0;

        for (let i = 0; i < name.length; i++) {
            value =
                name.charCodeAt(i) +
                ((value << 5) - value);
        }

        return gradients[
            Math.abs(value) % gradients.length
        ];
    };

    const sortedComments = useMemo(() => {
        return [...comments].sort(
            (a, b) =>
                new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0)
        );
    }, [comments]);

    /*
     * ============================================================
     * LOAD COMMENTS
     * ============================================================
     */

    useEffect(() => {
        api.get(`/Comments/video/${videoId}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error(
                    "Comments API Error:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [videoId]);

    /*
     * ============================================================
     * CREATE COMMENT
     * ============================================================
     */

    const handleSubmit = async () => {
        if (!content.trim() || submitting) {
            return;
        }

        try {
            setSubmitting(true);

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
            console.error(
                "Create Comment Error:",
                error
            );
        } finally {
            setSubmitting(false);
        }
    };

    /*
     * ============================================================
     * KEYBOARD SUBMIT
     * ============================================================
     */

    const handleKeyDown = (event) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            if (content.trim()) {
                handleSubmit();
            }
        }
    };

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            {/* ================================================== */}
            {/* HEADER                                               */}
            {/* ================================================== */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(145deg, rgba(255,51,95,0.14), rgba(139,92,246,0.10))",
                            border:
                                "1px solid rgba(255,255,255,0.06)",
                            color: "#ff4770",
                        }}
                    >
                        <ForumIcon
                            sx={{
                                fontSize: 21,
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                color: "#f1f2f4",
                                fontWeight: 800,
                                fontSize: {
                                    xs: 18,
                                    sm: 20,
                                },
                                letterSpacing:
                                    "-0.5px",
                            }}
                        >
                            Discussion
                        </Typography>

                        <Typography
                            sx={{
                                color: "#686d76",
                                fontSize: 12,
                                mt: 0.25,
                            }}
                        >
                            Join the conversation
                        </Typography>
                    </Box>
                </Box>

                {/* Comment count */}

                <Box
                    sx={{
                        px: 1.4,
                        py: 0.7,
                        borderRadius: "9px",
                        background:
                            "rgba(255,255,255,0.035)",
                        border:
                            "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#898e97",
                            fontSize: 12,
                            fontWeight: 700,
                        }}
                    >
                        {comments.length}{" "}
                        {comments.length === 1
                            ? "comment"
                            : "comments"}
                    </Typography>
                </Box>
            </Box>

            {/* ================================================== */}
            {/* COMMENT COMPOSER                                    */}
            {/* ================================================== */}

            <Box
                sx={{
                    position: "relative",
                    p: {
                        xs: 1.5,
                        sm: 2,
                    },
                    borderRadius: {
                        xs: 2,
                        sm: 2.5,
                    },
                    background:
                        "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))",
                    border:
                        "1px solid rgba(255,255,255,0.065)",
                    transition:
                        "border-color 0.2s ease, box-shadow 0.2s ease",
                    "&:focus-within": {
                        borderColor:
                            "rgba(255,51,95,0.28)",
                        boxShadow:
                            "0 0 0 1px rgba(255,51,95,0.06), 0 16px 45px rgba(0,0,0,0.18)",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: {
                            xs: 1.2,
                            sm: 1.5,
                        },
                    }}
                >
                    {/* Current user avatar */}

                    <Avatar
                        sx={{
                            width: {
                                xs: 38,
                                sm: 44,
                            },
                            height: {
                                xs: 38,
                                sm: 44,
                            },
                            flexShrink: 0,
                            mt: 0.25,
                            background:
                                "linear-gradient(135deg, #ff335f, #8b5cf6)",
                            fontWeight: 800,
                            fontSize: 15,
                            boxShadow:
                                "0 6px 20px rgba(255,51,95,0.16)",
                        }}
                    >
                        {currentAvatarLetter}
                    </Avatar>

                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        {/* User identity */}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.7,
                                mb: 0.8,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#dfe0e4",
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                }}
                            >
                                {currentUsername ||
                                    "You"}
                            </Typography>

                            <Box
                                sx={{
                                    width: 4,
                                    height: 4,
                                    borderRadius:
                                        "50%",
                                    backgroundColor:
                                        "#555961",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#656a73",
                                    fontSize: 11.5,
                                }}
                            >
                                Leave a comment
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            maxRows={8}
                            placeholder="What did you think about this video?"
                            value={content}
                            onChange={(event) =>
                                setContent(
                                    event.target.value
                                )
                            }
                            onKeyDown={handleKeyDown}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius:
                                        "12px",
                                    backgroundColor:
                                        "rgba(5,6,8,0.35)",
                                    color: "#e8e9ec",
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                    alignItems:
                                        "flex-start",
                                    transition:
                                        "background-color 0.2s ease",
                                    "& fieldset": {
                                        borderColor:
                                            "rgba(255,255,255,0.055)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor:
                                            "rgba(255,255,255,0.10)",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor:
                                            "rgba(255,51,95,0.45)",
                                    },
                                    "&:focus-within": {
                                        backgroundColor:
                                            "rgba(5,6,8,0.55)",
                                    },
                                },

                                "& textarea::placeholder": {
                                    color: "#5f646d",
                                    opacity: 1,
                                },
                            }}
                        />

                        {/* Composer footer */}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "space-between",
                                gap: 2,
                                mt: 1.2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#555a63",
                                    fontSize: 11,
                                    display: {
                                        xs: "none",
                                        sm: "block",
                                    },
                                }}
                            >
                                Press Enter to post
                                · Shift + Enter for
                                a new line
                            </Typography>

                            <Box
                                sx={{
                                    ml: "auto",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: 1,
                                }}
                            >
                                {content.length >
                                    0 && (
                                    <Typography
                                        sx={{
                                            color:
                                                content.length >
                                                900
                                                    ? "#ff335f"
                                                    : "#555a63",
                                            fontSize: 11,
                                        }}
                                    >
                                        {content.length}
                                    </Typography>
                                )}

                                <Button
                                    onClick={
                                        handleSubmit
                                    }
                                    disabled={
                                        !content.trim() ||
                                        submitting
                                    }
                                    endIcon={
                                        <SendIcon
                                            sx={{
                                                fontSize:
                                                    17,
                                            }}
                                        />
                                    }
                                    sx={{
                                        height: 36,
                                        px: 1.8,
                                        borderRadius:
                                            "9px",
                                        textTransform:
                                            "none",
                                        fontWeight: 800,
                                        fontSize: 12,
                                        color: "#fff",
                                        backgroundColor:
                                            content.trim()
                                                ? "#ff335f"
                                                : "rgba(255,255,255,0.06)",
                                        boxShadow:
                                            content.trim()
                                                ? "0 7px 20px rgba(255,51,95,0.20)"
                                                : "none",
                                        "&:hover": {
                                            backgroundColor:
                                                "#e92d57",
                                        },
                                        "&.Mui-disabled": {
                                            color: "#555a63",
                                            backgroundColor:
                                                "rgba(255,255,255,0.045)",
                                        },
                                    }}
                                >
                                    {submitting
                                        ? "Posting..."
                                        : "Comment"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ================================================== */}
            {/* SEPARATOR                                           */}
            {/* ================================================== */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    my: 4,
                }}
            >
                <Divider
                    sx={{
                        flex: 1,
                        borderColor:
                            "rgba(255,255,255,0.055)",
                    }}
                />

                <Typography
                    sx={{
                        color: "#555a63",
                        fontSize: 10,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                    }}
                >
                    Latest
                </Typography>

                <Divider
                    sx={{
                        flex: 1,
                        borderColor:
                            "rgba(255,255,255,0.055)",
                    }}
                />
            </Box>

            {/* ================================================== */}
            {/* LOADING                                             */}
            {/* ================================================== */}

            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {[1, 2, 3].map((item) => (
                        <Box
                            key={item}
                            sx={{
                                display: "flex",
                                gap: 1.5,
                            }}
                        >
                            <Skeleton
                                variant="circular"
                                width={42}
                                height={42}
                                sx={{
                                    backgroundColor:
                                        "rgba(255,255,255,0.05)",
                                }}
                            />

                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >
                                <Skeleton
                                    width="20%"
                                    height={22}
                                    sx={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.05)",
                                    }}
                                />

                                <Skeleton
                                    width="75%"
                                    height={22}
                                    sx={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.04)",
                                    }}
                                />

                                <Skeleton
                                    width="45%"
                                    height={18}
                                    sx={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.035)",
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : comments.length === 0 ? (
                /* ================================================== */
                /* EMPTY STATE                                        */
                /* ================================================== */

                <Box
                    sx={{
                        py: {
                            xs: 6,
                            sm: 8,
                        },
                        px: 3,
                        textAlign: "center",
                        borderRadius: 3,
                        border:
                            "1px dashed rgba(255,255,255,0.08)",
                        background:
                            "rgba(255,255,255,0.012)",
                    }}
                >
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            mx: "auto",
                            mb: 2,
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "rgba(255,51,95,0.07)",
                            color: "#ff4770",
                        }}
                    >
                        <ForumIcon
                            sx={{
                                fontSize: 29,
                            }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            color: "#dedfe3",
                            fontWeight: 800,
                            fontSize: 16,
                            mb: 0.7,
                        }}
                    >
                        Start the conversation
                    </Typography>

                    <Typography
                        sx={{
                            color: "#656a73",
                            fontSize: 13,
                            maxWidth: 420,
                            mx: "auto",
                            lineHeight: 1.6,
                        }}
                    >
                        There are no comments yet.
                        Share what you thought about
                        the video and start the
                        discussion.
                    </Typography>
                </Box>
            ) : (
                /* ================================================== */
                /* COMMENTS                                            */
                /* ================================================== */

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {sortedComments.map(
                        (comment, index) => {
                            const commentUsername =
                                comment.userName ||
                                "User";

                            const commentAvatarLetter =
                                commentUsername
                                    .charAt(0)
                                    .toUpperCase();

                            return (
                                <Box
                                    key={comment.id}
                                    sx={{
                                        position:
                                            "relative",
                                        display: "flex",
                                        gap: {
                                            xs: 1.2,
                                            sm: 1.8,
                                        },
                                        py: {
                                            xs: 2,
                                            sm: 2.4,
                                        },
                                        px: {
                                            xs: 1,
                                            sm: 1.5,
                                        },
                                        mx: -1.5,
                                        borderRadius:
                                            "14px",
                                        transition:
                                            "background-color 0.2s ease",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(255,255,255,0.025)",
                                        },
                                    }}
                                >
                                    {/* Avatar */}

                                    <Avatar
                                        sx={{
                                            width: {
                                                xs: 38,
                                                sm: 44,
                                            },
                                            height: {
                                                xs: 38,
                                                sm: 44,
                                            },
                                            flexShrink: 0,
                                            background:
                                                getAvatarGradient(
                                                    commentUsername
                                                ),
                                            fontSize: 14,
                                            fontWeight: 800,
                                            boxShadow:
                                                "0 5px 16px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        {
                                            commentAvatarLetter
                                        }
                                    </Avatar>

                                    {/* Body */}

                                    <Box
                                        sx={{
                                            flex: 1,
                                            minWidth: 0,
                                        }}
                                    >
                                        {/* User row */}

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                flexWrap:
                                                    "wrap",
                                                gap: 0.8,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#e5e6e9",
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                }}
                                            >
                                                {
                                                    commentUsername
                                                }
                                            </Typography>

                                            <Box
                                                sx={{
                                                    width: 3,
                                                    height: 3,
                                                    borderRadius:
                                                        "50%",
                                                    backgroundColor:
                                                        "#50545c",
                                                }}
                                            />

                                            <Tooltip
                                                title={
                                                    comment.createdAt
                                                        ? formatDate(
                                                              comment.createdAt
                                                          )
                                                        : ""
                                                }
                                            >
                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        gap: 0.4,
                                                        cursor: "default",
                                                    }}
                                                >
                                                    <TimeIcon
                                                        sx={{
                                                            fontSize: 12,
                                                            color: "#555a63",
                                                        }}
                                                    />

                                                    <Typography
                                                        sx={{
                                                            color: "#666b74",
                                                            fontSize: 11.5,
                                                        }}
                                                    >
                                                        {formatRelativeDate(
                                                            comment.createdAt
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Tooltip>
                                        </Box>

                                        {/* Comment text */}

                                        <Typography
                                            sx={{
                                                color: "#b0b3ba",
                                                fontSize: {
                                                    xs: 13,
                                                    sm: 14,
                                                },
                                                lineHeight: 1.7,
                                                mt: 0.7,
                                                whiteSpace:
                                                    "pre-line",
                                                wordBreak:
                                                    "break-word",
                                            }}
                                        >
                                            {
                                                comment.content
                                            }
                                        </Typography>

                                        {/* Comment actions */}

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: 0.5,
                                                mt: 1,
                                            }}
                                        >
                                            <Tooltip title="Like">
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius:
                                                            "8px",
                                                        color: "#666b74",
                                                        "&:hover": {
                                                            color: "#ff4770",
                                                            backgroundColor:
                                                                "rgba(255,51,95,0.07)",
                                                        },
                                                    }}
                                                >
                                                    <HeartIcon
                                                        sx={{
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>

                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth:
                                                        0,
                                                    px: 1,
                                                    height: 30,
                                                    borderRadius:
                                                        "8px",
                                                    color: "#666b74",
                                                    textTransform:
                                                        "none",
                                                    fontWeight: 700,
                                                    fontSize: 11,
                                                    "&:hover": {
                                                        color: "#c4c6cb",
                                                        backgroundColor:
                                                            "rgba(255,255,255,0.04)",
                                                    },
                                                }}
                                            >
                                                Reply
                                            </Button>

                                            <Tooltip title="More">
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius:
                                                            "8px",
                                                        color: "#555a63",
                                                        ml: "auto",
                                                        opacity: {
                                                            xs: 1,
                                                            md: 0,
                                                        },
                                                        ".MuiBox-root:hover &":
                                                            {
                                                                opacity: 1,
                                                            },
                                                        "&:hover": {
                                                            color: "#c4c6cb",
                                                            backgroundColor:
                                                                "rgba(255,255,255,0.04)",
                                                        },
                                                    }}
                                                >
                                                    <MoreIcon
                                                        sx={{
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>

                                    {/* Separator */}

                                    {index <
                                        sortedComments.length -
                                            1 && (
                                        <Divider
                                            sx={{
                                                position:
                                                    "absolute",
                                                left: {
                                                    xs: 59,
                                                    sm: 67,
                                                },
                                                right: 0,
                                                bottom: 0,
                                                borderColor:
                                                    "rgba(255,255,255,0.045)",
                                            }}
                                        />
                                    )}
                                </Box>
                            );
                        }
                    )}
                </Box>
            )}

            {/* ================================================== */}
            {/* FOOTER                                              */}
            {/* ================================================== */}

            {!loading &&
                comments.length > 0 && (
                    <Box
                        sx={{
                            mt: 2,
                            pt: 3,
                            borderTop:
                                "1px solid rgba(255,255,255,0.045)",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 0.8,
                                color: "#50555e",
                            }}
                        >
                            <PersonIcon
                                sx={{
                                    fontSize: 15,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: 11,
                                }}
                            >
                                {comments.length}{" "}
                                people joined
                                the discussion
                            </Typography>
                        </Box>
                    </Box>
                )}
        </Box>
    );
}

export default CommentSection;

