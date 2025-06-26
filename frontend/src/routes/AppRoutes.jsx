import { Routes, Route } from "react-router-dom";
import MovieList from "../pages/MovieList";
import Login from "../pages/login";
import Register from "../pages/register";
import AddMovie from "../pages/addMovie";
import MovieDetail from "../pages/movieDetail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/movie/:id" element={<MovieDetail />} />

        </Routes>
    )
}