import { useState, useEffect } from 'react';

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
    const [dataPlan, setPlan] = useState<Plan[]>([]); // Данные о ролях
    const [loadingPlan, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch('http://localhost:8080/Plan', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setPlan(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setPlan([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataPlan, loadingPlan };
};
