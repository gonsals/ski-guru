import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Navbar from "../components/NavBar";
import { OnboardingProvider } from "../context/OnboardingContext";
import OnboardingRole from "../pages/OnBoardingRole";
import SignUp from "../pages/Register";
import OnboardingSport from "../pages/OnBoardingSport";

const AppRouter = () => (
    <Router>
        <Navbar />
        <OnboardingProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:userType/:id" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/onboarding/role" element={<OnboardingRole />} />
                <Route path="/onboarding/sport" element={<OnboardingSport />} />
            </Routes>
        </OnboardingProvider>
    </Router>
);

export default AppRouter;
