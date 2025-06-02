import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetNameGroups } from '../db/get/GetGroups';
import { GetRoleID } from '../db/get/GetRole';

export default function RouteTeacherGroups() {
    const { dataNameGroup, loading } = GetNameGroups(); // получаем данные через кастомный хук
    const nameGroups = dataNameGroup.length > 0 ? dataNameGroup[0].NameGroup : null;
    const { dataRole } = GetRoleID();
    const roleValues = dataRole.length > 0 ? dataRole[0].Role : null;
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading && roleValues !== null && typeof roleValues === 'string') {
            switch (roleValues) {
                case 'Администратор':
                    navigate('/error');
                    break;
                case 'Преподаватель':
                    if (nameGroups !== null) {
                        navigate('/teachers/groups');
                    }
                    else {
                        navigate('/teachers/ungroups');
                    }
                    break;
                case 'Студент':
                    navigate('/error');
                    break;
                default:
                    navigate('/error');
            }
        }
    }, [nameGroups, loading]);
    return { loading }
}