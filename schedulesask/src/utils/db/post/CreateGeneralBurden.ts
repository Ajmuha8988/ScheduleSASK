import { API_URL } from '../../API/config_APIts';
interface GeneralBurdenData {
    ID_Teacher: bigint;
    FirstSemester: number;
    SecondSemester: number;
}

export const GeneralBurdenService = () => {
        const addGeneralBurden = async (groupData: GeneralBurdenData) => {
            try {
                const response = await fetch(API_URL + '/administrator/addGeneralBurden', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(groupData)
                });

                const data = await response.json();
                if (data.message === 'У преподавателя уже установлено учебная нагрузка') {
                    throw new Error(data.message);
                }
                else {
                    return data.message;
                }
            } catch (error) {
                let errorMessage = '';
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    // Приводим тип error к типу Error
                    const typedError = error as Error;
                    errorMessage = typedError.message;
                } else {
                    errorMessage = 'Произошла неизвестная ошибка при установке нагрузки преподавателя.';
                }
                throw new Error(errorMessage);
            }
        };

        return { addGeneralBurden };
};
