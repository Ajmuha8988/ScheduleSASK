import LayoutTeacher from "../components/Headers/LayoutTeacher"
import UnBodyGroups from "../components/Body/UnBodyGroups"
import RouteTeacherGroups from '../utils/Validation/ValidataionStatusGroupTeacher';
import { BeatLoader } from 'react-spinners';
import ScheduleFooter from '../components/Footer/ScheduleFooter';

const UnGroups = () => {
    const { loading } = RouteTeacherGroups();
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <BeatLoader color="#ffc107" size={20} />
                </div>
            ) : (
                <>
                    <LayoutTeacher></LayoutTeacher>
                     <div className='wrapper'>
                            <UnBodyGroups></UnBodyGroups>
                            <ScheduleFooter></ScheduleFooter>
                     </div>
                </>
            )}
        </>
    );
};
export default UnGroups;