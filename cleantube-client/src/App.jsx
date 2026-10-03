

import { Routes, Route } from "react-router-dom";
import UploadVideo from "./pages/UploadVideo";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscriptions from "./pages/Subscriptions";
import Channel from "./pages/Channel";
import CreateChannel from "./pages/CreateChannel";
import CustomizeChannel from "./pages/CustomizeChannel";
import Search from "./pages/Search";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadVideo />} />
            <Route
                path="/subscriptions"
                element={<Subscriptions />} />
            <Route path="/channel" element={<Channel />} />
            <Route
                path="/create-channel"
                element={<CreateChannel />}
            />

            <Route
                path="/channel/customize"
                element={<CustomizeChannel />}
            />

            <Route path="/search" element={<Search />} />

        </Routes>
    );
}

export default App;

