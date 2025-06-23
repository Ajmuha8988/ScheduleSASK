import { API_URL } from '../../API/config_APIts';
interface TScheduleData {
    NameGroup: string;
    ID_Lesson: bigint;
    ID_Room: bigint;
    ID_user: bigint;
    NumberLesson: number;
    TimeDate: string;
}

export const TScheduleService = () => {
    const addTSchedule = async (pscheduleData: TScheduleData) => {
        try {
            const response = await fetch(API_URL + '/administrator/addTSchedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(pscheduleData)
            });
            const data = await response.json();
            if (data.message === 'Замена переиздана') {
                return data.message;
            } else if (data.message === 'Замена назначена!') {
                return data.message;
            } else if (data.message === 'У преподавателя уже назначена замена на это время') {
                throw new Error(data.message);
            } else {
                alert("Ошибка при назначении замен");
            }
        } catch (error) {
            let errorMessage = '';
            if (typeof error === 'object' && error !== null && 'message' in error) {
                // Приводим тип error к типу Error
                const typedError = error as Error;
                errorMessage = typedError.message;
            } else {
                errorMessage = 'Произошла неизвестная ошибка при создании кабинета.';
            }
            throw new Error(errorMessage);
            
        }
    };
    return { addTSchedule };
};
