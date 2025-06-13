import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface TeacherBurden {
    Lastname: string;
    Firstname: string;
    Patronymic: string; // Средний может отсутствовать
    Temp_ID_User: number;
    FirstSemesterHour: number;
    SecondSemesterHour: number;
}
// Кастомный хук для получения данных
export const GetTeacherinburden = () => {
    const [dataTeacherInBurden, setTeacherInBurden] = useState<TeacherBurden[]>([]);

    useEffect(() => {
        fetch(API_URL + '/administrator/GetTeacherInBurden')
            .then(response => response.json())
            .then(data => setTeacherInBurden(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataTeacherInBurden;
};
