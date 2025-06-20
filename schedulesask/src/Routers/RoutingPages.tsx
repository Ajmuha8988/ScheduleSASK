import Students from "../Pages/Students"
import MainPage from "../Pages/MainPage"
import Teachers from "../Pages/Teachers"
import Administrator from "../Pages/Administrator"
import PScheduleConstructor from "../Pages/PScheduleConstructor"
import TScheduleConstructor from "../Pages/TScheduleConstructor"
import PlanConstructor from "../Pages/PlanConstructor"
import UnGroups from "../Pages/UnGroups"
import Groups from "../Pages/Groups"
import ErrorPage from "../Pages/ErrorPage"
import { Routes, Route } from 'react-router-dom';

const RoutingPages = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/ungroups" element={<UnGroups />} />
            <Route path="/teachers/groups" element={<Groups />} />
            <Route path="/administrator" element={<Administrator />} />
            <Route path="/administrator/planconstructor" element={<PlanConstructor />} />
            <Route path="/administrator/pscheduleconstructor" element={<PScheduleConstructor />} />
            <Route path="/administrator/tscheduleconstructor" element={<TScheduleConstructor />} />
            <Route path="/error" element={<ErrorPage />} />
        </Routes>
    );
};
export default RoutingPages;