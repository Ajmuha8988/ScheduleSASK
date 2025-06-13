import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface Plan {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    NameLesson: string;
    NameGroup: string;
    CallNumber: string;
    TimeForLesson: number;
    NumberHourInWeek: number;
    KindOfSemester: string;
}
// Кастомный хук для получения данных
export const GetPlan = () => {
    const [dataPlan, setPlan] = useState<Plan[] | null>(null); // Изменили тип, теперь допускаем null
    const [loadingPlan, setLoading] = useState(true); // Статус загрузки
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Новое состояние для сообщений об ошибках

    useEffect(() => {
        fetch(API_URL + '/Plan', { credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.statusText}`);
                }
                return response.json(); // Преобразуем тело ответа в JSON
            })
            .then(data => {
                setPlan(data);
                setErrorMessage(null); // Обнуляем возможное старое сообщение об ошибке
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setPlan([]);
                setErrorMessage('Ошибка при получении данных.');
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждем секундочку
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataPlan, loadingPlan, errorMessage };
};
