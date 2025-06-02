import { useState, useEffect } from 'react';

// Кастомный хук для получения данных
export const GetAllrooms = () => {
    const [dataRooms, setDataRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/AllRooms')
            .then(response => response.json())
            .then(data => setDataRooms(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataRooms;
};
