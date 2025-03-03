import { useState } from "react";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

export default function RouteHandler() {
    const [currentUser, setCurrentUser] = useState("USER");

    if (currentUser == "USER") {
        return (
            <UserRoutes></UserRoutes>
        )
    } else if (currentUser == "ADMIN") {
        return (
            <AdminRoutes></AdminRoutes>
        )
    }
}