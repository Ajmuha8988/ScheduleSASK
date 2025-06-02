import { useState, useEffect } from 'react';

// Кастомный хук для получения данных
export const GetTeacherinburden = () => {
    const [dataTeacherInBurden, setTeacherInBurden] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/administrator/GetTeacherInBurden')
            .then(response => response.json())
            .then(data => setTeacherInBurden(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataTeacherInBurden;
};
