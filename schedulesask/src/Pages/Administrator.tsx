import LayoutAdministrator from "../components/Headers/LayoutAdministrator"
import TableForSchedules from "../components/Body/TableForSchedules"

const Administrator = () => {
    return (
        <>
            <div className='wrapper'>
                <LayoutAdministrator></LayoutAdministrator>
                <TableForSchedules></TableForSchedules>
            </div>
        </>
    );
};
export default Administrator;