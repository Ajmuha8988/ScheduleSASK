import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface TeacherPSchedulePart {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    NameLesson: string;
    NameGroup: string;
    NameRoom: string;
    DaysOfWeek: string;
    KindOfSchedules: string;
    KindOfSemester: string;
    NumberLessons: number;
    Temp_ID_User: number;
}
// Кастомный хук для получения данных
export const GetAllPartTeacherPSchedule = () => {
    const [dataTeacherPSchedulePart, setTeacherPSchedulePart] = useState<TeacherPSchedulePart[]>([]); // Данные о группе
    const [TeacherPloading, setTeacherPLoading] = useState(true); // Статус загрузки
    const [errorTeacherPMessage, setErrorPMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL + '/teacher/TeacherPSchedulePart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setTeacherPSchedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setTeacherPLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setTeacherPSchedulePart([]); // Очищаем данные в случае ошибки
                setErrorPMessage('Ошибка при получении данных о расписании');
                setTimeout(() => {
                    setTeacherPLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataTeacherPSchedulePart, TeacherPloading, errorTeacherPMessage };
};