import { useState, useEffect } from 'react';
interface NameGroup {
    ID_Group: bigint;
    NameGroup: string;
}
// Кастомный хук для получения данных
export const GetNameGroups = () => {
    const [dataNameGroup, setaNameGroup] = useState<NameGroup[]>([]); // Данные о группе
    const [loading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch('http://localhost:8080/teacher/validategroup', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setaNameGroup(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setaNameGroup([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataNameGroup, loading };
};
