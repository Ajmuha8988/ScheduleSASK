import LayoutStudent from "../components/Headers/LayoutStudent"
import TableForStudentsSchedules from "../components/Body/TableForStudentsSchedules"

const Students = () => {
    return (
        <div className='wrapper'>
            <LayoutStudent></LayoutStudent>
            <TableForStudentsSchedules></TableForStudentsSchedules>
        </div>

    );
};
export default Students;