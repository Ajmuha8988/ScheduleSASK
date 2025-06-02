import "../Headers/mobileheaders.css"
import AddRoomButton from "../Headers/ModalRooms"
import AddLessonButton from "../Headers/ModalLessons"
import ModalSettingsBurden from "../Headers/ModalSettingsBurden"
import { useNavigate } from 'react-router-dom';

const RoutingInAdministrators: React.FC<Props> = ({ onRouting }) => {
    const navigate = useNavigate();
    return (
        <div className="collapse navbar-collapse jcs dropdown mobile-fio-disabled" id="navbarNav">
            <div>
                <button className="btn btn btn-warning text-light dropdown-toggle" type="button" id="ADDMENU" data-bs-toggle="dropdown" aria-expanded="false">
                    Добавить
                </button>
                <ul className="dropdown-menu bg-dark" aria-labelledby="ADDMENU">
                    <AddRoomButton/>
                    <AddLessonButton />
                    <ModalSettingsBurden />
                    <li><button className="dropdown-item text-light" onClick={() => navigate('/administrator/planconstructor')}>Учебный план</button></li>
                    <li><button className="dropdown-item text-light">Временное расписание</button></li>
                </ul>
            </div>
        </div>

    );
};
export default RoutingInAdministrators;