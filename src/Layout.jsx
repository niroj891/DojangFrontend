import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer";

function UserLayout() {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}


export default UserLayout