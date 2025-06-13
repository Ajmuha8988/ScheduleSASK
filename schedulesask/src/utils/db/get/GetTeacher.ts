import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';

// Кастомный хук для получения данных
export const GetTeacherID = () => {
    const [datateacherID, setteacher] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL + '/ID_Teacher', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setteacher(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setteacher([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);
    return { datateacherID, loading };
};
