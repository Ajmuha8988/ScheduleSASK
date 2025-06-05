import { useNavigate } from 'react-router-dom';
import { GetNameGroups } from '../get/GetGroups';

export const DeleteGroupService = () => {
    const navigate = useNavigate();
    const { dataNameGroup, loading } = GetNameGroups();
    const IDgroups = dataNameGroup.length > 0 ? dataNameGroup[0].ID_Group : null;
    if (!loading && IDgroups !== null) {
        const exitgroup = async () => {
            try {
                const response = await fetch('http://localhost:8080/teacher/exitgroup', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ID_Groups: IDgroups
                    })
                });

                const data = await response.json();
                if (data.message === 'Группа успешно была удалена!') {
                    navigate('/teachers');
                    localStorage.removeItem('IDGroups');
                } else {
                    throw {
                        message: 'Произошла ошибка при удаление группы'
                    };
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при удаление группы';
                }
                throw new Error(errorMessage);
            }
    };

        return { exitgroup };
    }
    return {};
};