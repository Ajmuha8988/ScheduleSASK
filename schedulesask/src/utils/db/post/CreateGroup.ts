import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../API/config_APIts';
interface GroupData {
    NameGroup: string;
}

export const GroupService = () => {
    const navigate = useNavigate();
    const addGroup = async (groupData: GroupData) => {
            try {
                const response = await fetch(API_URL + '/teacher/addGroup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        NameGroup: groupData.NameGroup
                    })
                });

                const data = await response.json();
                if (data.message === 'Такая группа уже существует') {
                    throw new Error(data.message);
                }
                else if (data.message === 'У вас уже есть группа') {
                    throw new Error(data.message);
                }
                else {
                    navigate('/teachers/groups');
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при создании группы.';
                }
                throw new Error(errorMessage);
            }
        };

        return { addGroup };
};
