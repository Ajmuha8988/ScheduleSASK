import { API_URL } from '../../API/config_APIts';
interface TScheduleRequestBody {
    ID_TSchedule: bigint
}

export const DeleteTScheduleService = () => {
    const deleteTScheduleMember = async (TScheduleData: TScheduleRequestBody) => {
            try {
                const response = await fetch(API_URL + '/administrator/deleteTSchedule', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(TScheduleData)
                });

                const data = await response.json();
                if (data.message === 'Запись успешно был удален из временного расписания!') {
                    console.log('Всё работает!');
                } else {
                    throw {
                        message: 'Ошибка при удаление записи из временного расписания. Повторите попытку попозже'
                    };
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при удаление записи из временного расписания.';
                }
                throw new Error(errorMessage);
            }
    }
    return { deleteTScheduleMember };
};