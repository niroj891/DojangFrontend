import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import { useRecoilState } from "recoil";
import { userInformationSelector } from "../recoil/user";
import InstructorRoutes from "./InstructorRoutes";

export default function RouteHandler() {
    const [currentUser, setCurrentUser] = useRecoilState(userInformationSelector)

    console.log(currentUser.role)
    if (currentUser.role == "USER" || !currentUser.role) {
        return (
            <UserRoutes></UserRoutes>
        )
    } else if (currentUser.role == "ADMIN") {
        return (
            <AdminRoutes></AdminRoutes>
        )
    } else if (currentUser.role == "INSTRUCTOR") {
        return <InstructorRoutes></InstructorRoutes>
    }
}