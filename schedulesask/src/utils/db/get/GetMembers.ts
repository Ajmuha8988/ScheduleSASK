import { useState, useEffect } from 'react';
interface Member {
    ID_members_group: string;
    Lastname: string;
    Firstname: string;
    Patronymic: string;
}
// Кастомный хук для получения данных
export const GetMember = () => {
    const [dataMembers, setadataMembers] = useState<Member[]>([]); // Данные о группе
    const [loading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch('http://localhost:8080/teacher/Members', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setadataMembers(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 2000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setadataMembers([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 2000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataMembers, loading };
};
