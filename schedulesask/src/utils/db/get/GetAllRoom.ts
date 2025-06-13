import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';

interface Room {
    NameRoom: string;
    ID_Room: number;
}
// Кастомный хук для получения данных
export const GetAllrooms = () => {
    const [dataRooms, setDataRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetch(API_URL + '/AllRooms')
            .then(response => response.json())
            .then(data => setDataRooms(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataRooms;
};
