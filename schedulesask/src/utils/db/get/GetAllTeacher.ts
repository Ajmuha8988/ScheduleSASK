import { useState, useEffect } from 'react';
interface Teacher {
    Lastname: string;
    Firstname: string;
    Patronymic: string; // Средний может отсутствовать
    Temp_ID_User: number;
}
// Кастомный хук для получения данных
export const GetAllTeacher = () => {
    const [dataStudents, setDataStudents] = useState<Teacher[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/AllTeachers')
            .then(response => response.json())
            .then(data => setDataStudents(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataStudents;
};
