import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface Student {
    Lastname: string;
    Firstname: string;
    Patronymic: string; // Средний может отсутствовать
    Temp_ID_User: number;
}
// Кастомный хук для получения данных
export const GetStudents = () => {
    const [dataStudents, setDataStudents] = useState<Student[]>([]);

    useEffect(() => {
        fetch(API_URL + '/ID_Student')
            .then(response => response.json())
            .then(data => setDataStudents(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataStudents;
};
