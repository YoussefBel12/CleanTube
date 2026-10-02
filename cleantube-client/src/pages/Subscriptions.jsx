
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Subscriptions() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubscriptions = async () => {
            try {
                const response = await api.get(
                    "/Subscriptions/videos"
                );

                setVideos(response.data);
            } catch (error) {
                console.error(
                    "Subscriptions Error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadSubscriptions();
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
                    Subscriptions
                </Typography>

                {loading ? (
                    <Typography color="text.secondary">
                        Loading...
                    </Typography>
                ) : videos.length === 0 ? (
                    <Typography color="text.secondary">
                        No videos from your subscriptions yet.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: 3,
                        }}
                    >
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
}

export default Subscriptions;

