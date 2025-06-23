import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface TeacherNameGroup {
    NameGroup: string;
}
// Кастомный хук для получения данных
export const GetTeacherNamegroup = () => {
    const [dataGroupName, setGroupName] = useState<TeacherNameGroup[]>([]); // Данные о ролях
    const [loading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch(API_URL + '/teacher/GroupInTeacher', { credentials: 'include' })
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
