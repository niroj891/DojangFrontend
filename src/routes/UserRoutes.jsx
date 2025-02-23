import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage";
import RegisterPage from "../Authentication/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Classes from "../pages/Classes";
import Events from "../pages/Events";
import LoginPage from "../Authentication/Login";
import Leaderboard from "../pages/Leaderboard";
import Community from "../pages/Community";









function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage ></HomePage>} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/events' element={<Events />} />
            <Route path="/community" element={<Community />} />


            <Route path="/register" element={<RegisterPage />} />


        </Routes>
    )
}

export default UserRoutes;