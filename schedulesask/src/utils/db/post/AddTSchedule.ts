import { API_URL } from '../../API/config_APIts';
interface TScheduleData {
    NameGroup: string;
    ID_Lesson: bigint;
    ID_Room: bigint;
    ID_user: bigint;
    NumberLesson: number;
    TimeDate: string;
}
interface ServerErrors {
    errorInServer?: string;
    firstError?: string;
    HourError?: string;
    TeacherError?: string;
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
            } else {
                alert("Ошибка при назначении замен");
            }
        } catch (error) {
            const serverErrors: ServerErrors = {};
            if (typeof error === 'object' && error !== null) {
                Object.assign(serverErrors, error);
            }
            throw new Error(JSON.stringify(serverErrors));
            
        }
    };
    return { addTSchedule };
};
