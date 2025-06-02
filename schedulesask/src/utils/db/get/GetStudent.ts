import { useState, useEffect } from 'react';

// Кастомный хук для получения данных
export const GetStudents = () => {
    const [dataStudents, setDataStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/ID_Student')
            .then(response => response.json())
            .then(data => setDataStudents(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataStudents;
};
