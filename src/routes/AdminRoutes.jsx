import { Route, Routes } from "react-router-dom"
import { AdminDashboard, Dashboard, UserDetails, UserList } from "../pages/AdminDashboard"

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin" element={<AdminDashboard></AdminDashboard>}>
                <Route path="" element={<Dashboard></Dashboard>}></Route>
                <Route path="users" element={<UserList></UserList>}></Route>
                <Route path="userdetails" element={<UserDetails></UserDetails>}></Route>
            </Route>

        </Routes>
    )
}


export default AdminRoutes