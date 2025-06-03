import { useState, useEffect } from 'react';
interface Lessons {
    NameLesson: string;
    ID_Lesson: number;
}
// Кастомный хук для получения данных
export const GetAlllessons = () => {
    const [dataLessons, setDataLessons] = useState<Lessons[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/AllLessons')
            .then(response => response.json())
            .then(data => setDataLessons(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataLessons;
};
