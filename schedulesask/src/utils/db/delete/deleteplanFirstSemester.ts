interface FirstSemesterData {
    CallNumbers: string;
    NameLessons: string;
    NameGroups: string;
    TimeForLessons: number;
    NumberHourInWeeks: number;
}

export const DeleteFirstSemesterPlanService = () => {
    const deleteFirstSemesterPlan = async (firstsemesterData: FirstSemesterData) => {
            try {
                const response = await fetch('http://localhost:8080/administrator/deleteFirstPlan', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(firstsemesterData)
                });

                const data = await response.json();
                if (data.message === 'Запись успешно был удален из учебного плана!') {
                    return;
                } else {
                    throw {
                        message: 'Ошибка при удаление записи из учебного плана'
                    };
                }
            } catch (error) {
                throw {
                    message: error.message || 'Ошибка при удаление записи из учебного плана'
                };
            }
    }
    return { deleteFirstSemesterPlan };
};