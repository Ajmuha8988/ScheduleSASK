import { useState, useEffect } from 'react';
// Кастомный хук для получения данных
export const GetAllPartPscheduleDenumerator = () => {
    const [dataDenumeratorPschedulePart, setaDenumeratorPschedulePart] = useState([]); // Данные о группе
    const [DenumeratorLoading, setDenumeratorLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch('http://localhost:8080/administrator/PScheduleDenumeratorPart', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setaDenumeratorPschedulePart(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setDenumeratorLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setaDenumeratorPschedulePart([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setDenumeratorLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataDenumeratorPschedulePart, DenumeratorLoading };
};