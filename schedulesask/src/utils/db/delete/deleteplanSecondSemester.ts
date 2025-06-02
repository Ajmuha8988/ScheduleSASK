interface SecondSemesterData {
    CallNumbers: string;
    NameLessons: string;
    NameGroups: string;
    TimeForLessons: number;
    NumberHourInWeeks: number;
}

export const DeleteSecondSemesterPlanService = () => {
    const deleteSecondSemesterPlan = async (secondsemesterData: SecondSemesterData) => {
            try {
                const response = await fetch('http://localhost:8080/administrator/deleteSecondPlan', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(secondsemesterData)
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
    return { deleteSecondSemesterPlan };
};