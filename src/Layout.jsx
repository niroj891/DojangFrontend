import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Authentication/Footer";

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