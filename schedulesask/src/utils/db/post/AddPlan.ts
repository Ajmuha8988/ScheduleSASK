import { useNavigate } from 'react-router-dom';
interface PlanData {
    ID_Teacher: bigint;
    ID_Lesson: bigint;
    ID_Group: bigint;
    TimeForLesson: number;
    NumberHourInWeek: number;
    KindOfSemester: string;
}

export const PlanDataService = () => {
    const navigate = useNavigate()
    const addPlan = async (planData: PlanData) => {
        try {
            const response = await fetch('http://localhost:8080/administrator/addPlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(planData)
            });
            const data = await response.json();
            if (data.message === 'Учебный план успешно воссоздан!') {
                return data.message;
            } else if (data.error === 'Такая запись уже существует!') {
                throw new Error(data.error);
            } else if (data.error === 'Превышено нагрузка на преподавателя!') {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            throw new Error(error.message || 'Произошла ошибка при редактировании учебного плана.');
        }
    };
    return { addPlan };
};
