import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface TSchedulePart {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    NameLesson: string;
    NameGroup: string;
    NameRoom: string;
    TimeDate: Date;
    NumberLessons: number;
    Temp_ID_User: number;
    ID_TSchedule: number;
}
// Кастомный хук для получения данных
export const GetAllPartTSchedule = () => {
    const [dataTSchedulePart, setTSchedulePart] = useState<TSchedulePart[]>([]); // Данные о группе
    const [Tloading, setTLoading] = useState(true); // Статус загрузки
    const [errorTMessage, setErrorTMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL + '/administrator/TSchedulePart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setTSchedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setTLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setTSchedulePart([]); // Очищаем данные в случае ошибки
                setErrorTMessage('Ошибка при получении данных о расписании');
                setTimeout(() => {
                    setTLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataTSchedulePart, Tloading, errorTMessage };
};