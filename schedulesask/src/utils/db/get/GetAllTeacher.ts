import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
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
        fetch(API_URL + '/AllTeachers')
            .then(response => response.json())
            .then(data => setDataStudents(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataStudents;
};
