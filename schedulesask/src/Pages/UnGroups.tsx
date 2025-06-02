import LayoutTeacher from "../components/Headers/LayoutTeacher"
import UnBodyGroups from "../components/Body/UnBodyGroups"
import RouteTeacherGroups from '../utils/Validation/ValidataionStatusGroupTeacher';
import { BeatLoader } from 'react-spinners';

const UnGroups = () => {
    const { loading } = RouteTeacherGroups();
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <BeatLoader color="#ffc107" size={20} />
                </div>
            ) : (
                <html>
                    <LayoutTeacher></LayoutTeacher>
                    <UnBodyGroups></UnBodyGroups>
                </html>
            )}
        </>
    );
};
export default UnGroups;