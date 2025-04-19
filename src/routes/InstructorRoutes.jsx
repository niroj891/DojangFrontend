import { Route, Routes } from "react-router-dom";
import InstructorLayout, { Dashboard, Players } from "../pages/instructor.jsx/InstructorLayout";
import ErrorPage from "../pages/instructor.jsx/Error";
import Events from "../pages/instructor.jsx/Events";
import RegistrationForm from "../Component/RegistrationForm";
import TournamentManager from "../pages/instructor.jsx/Tournament";

function InstructorRoutes() {


    return (
        <Routes>
            <Route path="/instructor" element={<InstructorLayout></InstructorLayout>} >
                <Route index element={<Dashboard></Dashboard>} ></Route>
                <Route path="players" element={<Players></Players>}></Route>
                <Route path="events" element={<Events></Events>}></Route>
                <Route path="game" element={<TournamentManager></TournamentManager>}></Route>
            </Route>
            <Route path="*" element={<ErrorPage></ErrorPage>} ></Route>




        </Routes >
    )
}


export default InstructorRoutes