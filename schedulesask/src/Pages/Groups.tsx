import LayoutTeacher from "../components/Headers/LayoutTeacher"
import BodyGroups from "../components/Body/BodyGroups"
import RouteTeacherGroups from '../utils/Validation/ValidataionStatusGroupTeacher';
import { BeatLoader } from 'react-spinners';

const Groups = () => {
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
                    <BodyGroups></BodyGroups>
                </>
            )}
        </>
    );
};
export default Groups;