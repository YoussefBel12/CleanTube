

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        api.get("/Videos")
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("API Error:", error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    marginLeft: "220px",
                    minHeight: "100vh",
                    px: { xs: 2, sm: 3, lg: 5 },
                    pt: { xs: 11, md: 12 },
                    pb: 6,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        mb: 4,
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: 30, md: 38 },
                                fontWeight: 800,
                                letterSpacing: "-2px",
                                lineHeight: 1,
                                color: "#f5f5f5",
                            }}
                        >
                            Discover
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1.2,
                                color: "#777982",
                                fontSize: 14,
                            }}
                        >
                            Explore something worth watching.
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            display: { xs: "none", sm: "block" },
                            color: "#555861",
                            fontSize: 12,
                            letterSpacing: "0.4px",
                            textTransform: "uppercase",
                            fontWeight: 700,
                        }}
                    >
                        {videos.length} {videos.length === 1 ? "video" : "videos"}
                    </Typography>
                </Box>

                {/* Video grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(3, minmax(0, 1fr))",
                            xl: "repeat(4, minmax(0, 1fr))",
                        },
                        columnGap: { xs: 2, md: 2.5, xl: 3 },
                        rowGap: { xs: 4, md: 4.5 },
                    }}
                >
                    {videos.map(video => (
                        <VideoCard
                            key={video.id}
                            video={video}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default Home;