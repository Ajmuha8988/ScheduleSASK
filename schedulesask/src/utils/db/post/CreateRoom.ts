import { API_URL } from '../../API/config_APIts';
interface RoomData {
    NameRoom: string;
}

export const RoomService = () => {
    const addRoom = async (roomData: RoomData) => {
            try {
                const response = await fetch(API_URL + '/administrator/addRoom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(roomData)
                });

                const data = await response.json();
                if (data.message === 'Такой кабинет уже существует') {
                    throw new Error(data.message);
                } else if (data.message === 'Кабинет успешно создан!') {
                    return data.message;
                } else {
                    alert("Ошибка при создании кабинета");
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
    return { addRoom };
};
