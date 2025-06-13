import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../API/config_APIts';
interface PScheduleRequestBody {
    ID_PSchedule: bigint
}

export const DeletePScheduleService = () => {
    const navigate = useNavigate();
    const deletePScheduleMember = async (PScheduleData: PScheduleRequestBody) => {
            try {
                const response = await fetch(API_URL + '/administrator/deletePSchedule', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(PScheduleData)
                });

                const data = await response.json();
                if (data.message === 'Запись успешно был удален из постоянного расписания!') {
                    navigate('/administrator/pscheduleconstructor');
                } else {
                    throw {
                        message: 'Ошибка при удаление записи из постоянного расписания. Повторите попытку попозже'
                    };
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при удаление записи из постоянного расписания.';
                }
                throw new Error(errorMessage);
            }
    }
    return { deletePScheduleMember };
};