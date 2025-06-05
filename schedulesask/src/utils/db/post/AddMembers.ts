import { useNavigate } from 'react-router-dom';
import { GetNameGroups } from '../get/GetGroups';
interface MembersData {
    ID_Students: bigint;
}

export const MemberService = () => {
    const navigate = useNavigate();
    const { dataNameGroup, loading } = GetNameGroups();
    const IDgroups = dataNameGroup.length > 0 ? dataNameGroup[0].ID_Group : null;
    const namegroups = dataNameGroup.length > 0 ? dataNameGroup[0].NameGroup : null;
    if (!loading && IDgroups !== null) {
        const addMember = async (membersData: MembersData) => {
            try {
                const response = await fetch('http://localhost:8080/teacher/AddMember', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ID_Groups: IDgroups,
                        ID_Students: membersData.ID_Students
                    })
                });

                const data = await response.json();
                if (data.message === 'Студент успешно добавлен в группу!') {
                    navigate('/teachers/groups');
                } else {
                    throw {
                        message: 'Произошла ошибка при процессе добавлении студента в группу'
                    };
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при процессе добавлении студента в группу';
                }
                throw new Error(errorMessage);
            }
        };

        return { addMember, namegroups };
    }

    return {};
};