import { useState, useEffect } from 'react';

// Кастомный хук для получения данных
export const GetAllTeacher = () => {
    const [dataStudents, setDataStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/AllTeachers')
            .then(response => response.json())
            .then(data => setDataStudents(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataStudents;
};
