import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface StartSecondSemester {
    DateSecondSemester: string
}
// Кастомный хук для получения данных
export const GetStartSecondSemester = () => {
    const [dataSSS, setDataSSS] = useState<StartSecondSemester[]>([]); // Данные о ролях
    const [loading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch(API_URL + '/StartSecondSemester', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setDataSSS(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setDataSSS([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                },  1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataSSS, loading };
};
