import { useNavigate } from 'react-router-dom';
import "../Headers/mobileheaders.css"

const RoutingGroup = () => {
    const navigate = useNavigate();
    return (
        <button className= "btn btn-warning text-light mobile-button ms-2" onClick={() => navigate('/teachers/ungroups')}>
            Группа
        </button>
    );
};
export default RoutingGroup;