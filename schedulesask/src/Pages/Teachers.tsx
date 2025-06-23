import LayoutTeacher from "../components/Headers/LayoutTeacher"
import TableForTeacherSchedules from "../components/Body/TableForTeacherSchedules"

const Teachers = () => {
    return (
        <div className='wrapper'>
            <LayoutTeacher></LayoutTeacher>
            <TableForTeacherSchedules></TableForTeacherSchedules>
        </div>
    );
};
export default Teachers;