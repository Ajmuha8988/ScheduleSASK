import { useNavigate } from 'react-router-dom';
import { GetTeacherID } from '../get/GetTeacher';

interface GroupData {
    NameGroup: string;
}

export const GroupService = () => {
    const navigate = useNavigate();
    const addGroup = async (groupData: GroupData) => {
            try {
                const response = await fetch('http://localhost:8080/teacher/addGroup', {
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
                console.error("Ошибка:", error);
                throw new Error(error.message || 'Произошла ошибка при создании группы.');
            }
        };

        return { addGroup };
};
