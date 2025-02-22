import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage";
import RegisterPage from "../Authentication/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Classes from "../pages/Classes";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/login' element={<RegisterPage />} />
        </Routes>
    )
}

export default UserRoutes;