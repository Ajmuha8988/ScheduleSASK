import { useState, useEffect } from 'react';

// Кастомный хук для получения данных
export const GetNamegroup = () => {
    const [dataGroupName, setGroupName] = useState([]); // Данные о ролях
    const [loading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch('http://localhost:8080/administrator/GroupInConstructor', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setGroupName(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setGroupName([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataGroupName, loading };
};
