import { useNavigate } from 'react-router-dom';
interface MembersData {
    ID_Students: string;
}

export const DeleteMemberService = () => {
    const navigate = useNavigate();
    const deleteGroupMember = async (membersData: MembersData) => {
            try {
                const response = await fetch('http://localhost:8080/teacher/deleteStudentInGroup', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(membersData)
                });

                const data = await response.json();
                if (data.message === 'Студент успешно был удален из группы!') {
                    navigate('/teachers/groups');
                } else {
                    throw {
                        message: 'Произошла ошибка при удаление студента из группы'
                    };
                }
            } catch (error) {
                throw {
                    message: error.message || 'Произошла ошибка при удаление студента из группы'
                };
            }
    }
    return {deleteGroupMember};
};