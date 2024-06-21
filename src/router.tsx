import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InstructorProfile from "./pages/InstructorProfile";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/NavBar";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/instructor/:id" element={<InstructorProfile />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
