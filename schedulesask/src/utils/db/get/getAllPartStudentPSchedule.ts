import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface StudentPSchedulePart {
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
export const GetAllPartStudentPSchedule = () => {
    const [dataStudentPSchedulePart, setStudentPSchedulePart] = useState<StudentPSchedulePart[]>([]); // Данные о группе
    const [StudentPloading, setStudentPLoading] = useState(true); // Статус загрузки
    const [errorStudentPMessage, setErrorPMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL + '/student/StudentPSchedulePart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setStudentPSchedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setStudentPLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setStudentPSchedulePart([]); // Очищаем данные в случае ошибки
                setErrorPMessage('Ошибка при получении данных о расписании');
                setTimeout(() => {
                    setStudentPLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataStudentPSchedulePart, StudentPloading, errorStudentPMessage };
};