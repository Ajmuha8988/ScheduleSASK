import { useState, useEffect } from 'react';
interface PSchedulePart {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    NameLesson: string;
    NameGroup: string;
    NameRoom: string;
    CallNumber: string;
    TimeForLesson: number;
    NumberHourInWeek: number;
    KindOfSemester: string;
    NumberLessons: number;
    DaysOfWeek: string;
    KindOfSchedules: string;
    Temp_ID_User: number;
    ID_PSchedule: number;
}
// Кастомный хук для получения данных
export const GetAllPartPscheduleNumerator = () => {
    const [dataNumeratorPschedulePart, setaNumeratorPschedulePart] = useState<PSchedulePart[]>([]); // Данные о группе
    const [loading, setLoading] = useState(true); // Статус загрузки
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/administrator/PScheduleNumeratorPart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setaNumeratorPschedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setaNumeratorPschedulePart([]); // Очищаем данные в случае ошибки
                setErrorMessage('Ошибка при получении данных о расписании');
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataNumeratorPschedulePart, loading, errorMessage };
};