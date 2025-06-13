import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface Lessons {
    NameLesson: string;
    ID_Lesson: number;
}
// Кастомный хук для получения данных
export const GetAlllessons = () => {
    const [dataLessons, setDataLessons] = useState<Lessons[]>([]);

    useEffect(() => {
        fetch(API_URL + '/AllLessons')
            .then(response => response.json())
            .then(data => setDataLessons(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataLessons;
};
