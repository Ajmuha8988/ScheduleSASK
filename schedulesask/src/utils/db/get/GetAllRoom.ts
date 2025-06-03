import { useState, useEffect } from 'react';
interface Room {
    NameRoom: string;
    ID_Room: number;
}
// Кастомный хук для получения данных
export const GetAllrooms = () => {
    const [dataRooms, setDataRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/AllRooms')
            .then(response => response.json())
            .then(data => setDataRooms(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataRooms;
};
