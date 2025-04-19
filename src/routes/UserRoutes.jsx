import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Authentication/Register";
import About from "../pages/About";
import Contact from "../pages/Contact/Contact";
import Events from "../pages/Events/Events";
import LoginPage from "../Authentication/Login";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Community from "../pages/Community";
import UserLayout from "../Layout";
import ProfilePage from "../Component/ProfilePage";
import Profile from "../pages/Profile/Profile";
import RegistrationForm from "../Component/RegistrationForm";
import HomePage from "../pages/Homepage/HomePage";
import CreatePostModal from "../pages/CreatePost/CreatePostModal";










function UserRoutes() {
    return (
        <Routes>

            <Route path="/" element={<UserLayout></UserLayout>}>
                <Route index element={<HomePage></HomePage>}></Route>
                <Route path="home" element={<HomePage ></HomePage>} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='events' element={<Events />} />
                <Route path="community" element={<Community />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="events/:eventId/register" element={<RegistrationForm />} />
                <Route path="post" element={<CreatePostModal />} />


            </Route>


        </Routes>
    )
}

export default UserRoutes;