import { useNavigate } from 'react-router-dom';
import { GetRoleID } from '../db/get/GetRole';

export default function RouteRole() {
    const { dataRole, loading } = GetRoleID(); // Получаем оба параметра
    const roleValues = dataRole.length > 0 ? dataRole[0].Role : null;
    const navigate = useNavigate();
    if (!loading && roleValues !== null && typeof roleValues === 'string') {
            switch (roleValues) {
                case 'Администратор':
                    navigate('/administrator');
                    break;
                case 'Преподаватель':
                    navigate('/teachers');
                    break;
                case 'Студент':
                    navigate('/students');
                    break;
                default:
                    navigate('/');
            }
    }

    return { loading };
}


