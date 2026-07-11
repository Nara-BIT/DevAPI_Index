import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ApiDetailPage from "./pages/ApiDetailPage";
import SubmitApi from "./pages/SubmitApi";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ModerationQueue from "./pages/admin/ModerationQueue";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/api/:id" element={<ApiDetailPage />} />
          <Route path="/submit" element={<SubmitApi />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<ModerationQueue />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
