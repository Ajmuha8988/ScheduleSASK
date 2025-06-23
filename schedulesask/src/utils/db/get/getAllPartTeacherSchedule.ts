import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface TeacherSchedulePart {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    NameLesson: string;
    NameGroup: string;
    NameRoom: string;
    TimeDate: Date;
    NumberLessons: number;
}
// Кастомный хук для получения данных
export const GetAllPartTeacherSchedule = () => {
    const [dataTeacherSchedulePart, setTeacherSchedulePart] = useState<TeacherSchedulePart[]>([]); // Данные о группе
    const [Teacherloading, setTeacherLoading] = useState(true); // Статус загрузки
    const [errorTeacherMessage, setErrorTMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL + '/teacher/TeacherSchedulePart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setTeacherSchedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setTeacherLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setTeacherSchedulePart([]); // Очищаем данные в случае ошибки
                setErrorTMessage('Ошибка при получении данных о расписании');
                setTimeout(() => {
                    setTeacherLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataTeacherSchedulePart, Teacherloading, errorTeacherMessage };
};