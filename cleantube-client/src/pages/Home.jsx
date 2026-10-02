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
                    padding: { xs: 2, md: 4 },
                    paddingTop: 12,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{ mb: 4 }}
                >
                    Discover
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 3,
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