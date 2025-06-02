import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetRoleID } from '../../utils/db/get/GetRole';
export default function ValidationTeacher() {
    const [Firstname, setFirstname] = useState<string | null>(null);
    const [Patronymic, setPatronymic] = useState<string | null>(null);
    const { dataRole, loading } = GetRoleID(); // Получаем роли
    const roleValues = dataRole.length > 0 ? dataRole[0].Role : null;
    const navigate = useNavigate();
    useEffect(() => {
        const storedFirstname = localStorage.getItem('Имя');
        const storedPatronymic = localStorage.getItem('Отчество');
        setFirstname(storedFirstname);
        setPatronymic(storedPatronymic);

    }, []);
    useEffect(() => {
        if (!loading && roleValues !== null && typeof roleValues === 'string') {
            switch (roleValues) {
                case 'Администратор':
                    navigate('/error');
                    break;
                case 'Преподаватель':
                    break;
                case 'Студент':
                    navigate('/error');
                    break;
                default:
                    navigate('/error');
            }
        }
    }, [roleValues, loading]);
    if (Firstname === null && Patronymic === null) {
        navigate('/error');
    }
    return { Firstname, Patronymic, loading };
}