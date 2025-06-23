import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface StudentSchedulePart {
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
export const GetAllPartStudentSchedule = () => {
    const [dataStudentSchedulePart, setStudentSchedulePart] = useState<StudentSchedulePart[]>([]); // Данные о группе
    const [Studentloading, setStudentLoading] = useState(true); // Статус загрузки
    const [errorStudentMessage, setErrorTMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL + '/student/StudentSchedulePart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setStudentSchedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setStudentLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setStudentSchedulePart([]); // Очищаем данные в случае ошибки
                setErrorTMessage('Ошибка при получении данных о расписании');
                setTimeout(() => {
                    setStudentLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataStudentSchedulePart, Studentloading, errorStudentMessage };
};