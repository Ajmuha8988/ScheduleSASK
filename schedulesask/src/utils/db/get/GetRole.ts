import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface Role {
    Role: string
}
// Кастомный хук для получения данных
export const GetRoleID = () => {
    const [dataRole, setDataRole] = useState<Role[]>([]); // Данные о ролях
    const [loading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch(API_URL + '/RoleID', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setDataRole(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setDataRole([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                },  1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataRole, loading };
};
