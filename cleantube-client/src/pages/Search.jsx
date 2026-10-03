import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    Box,
    Typography,
} from "@mui/material";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Search() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") || "";

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchVideos = async () => {
            if (!query.trim()) {
                setVideos([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await api.get(
                    `/Videos/search?query=${encodeURIComponent(query)}`
                );

                setVideos(response.data);
            } catch (error) {
                console.error("Search Error:", error);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        searchVideos();
    }, [query]);

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
                    Search results for "{query}"
                </Typography>

                {loading ? (
                    <Typography color="text.secondary">
                        Searching...
                    </Typography>
                ) : videos.length === 0 ? (
                    <Typography color="text.secondary">
                        No videos found.
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

export default Search;

