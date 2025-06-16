import { API_URL } from '../../API/config_APIts';
interface DateSecondSemesterBody {
    DateSecondSemester: string;
}

export const DateSecondSemesterService = () => {
    const addDateSecondSemester = async (DateData: DateSecondSemesterBody) => {
            try {
                const response = await fetch(API_URL + '/administrator/addDateSecondSemester', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(DateData)
                });

                const data = await response.json();
                if (data.message === 'Обновлена дата выхода на учёбу') {
                    throw new Error(data.message);
                } else if (data.message === 'Назначен дата выхода на учёбу!') {
                    return data.message;
                } else {
                    alert("Ошибка при назначении даты выхода на учёбу");
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при назначении даты выхода на учёбу.';
                }
                throw new Error(errorMessage);
            }
    };
    return { addDateSecondSemester };
};
