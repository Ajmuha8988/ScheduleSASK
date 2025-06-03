import { useState, useEffect } from 'react';
interface SubBurden {
    ID_TeacherPlan: number;
    NumeratorPlan: number;
    DenominatorPlan: number;
}
// Кастомный хук для получения данных
export const GetAllSubBurden = () => {
    const [dataAllSubBurden, setAllSubBurden] = useState<SubBurden[]>([]); // Данные о группе
    const [SubBurdenloading, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch('http://localhost:8080/AllSubBurden', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setAllSubBurden(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setAllSubBurden([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataAllSubBurden, SubBurdenloading };
};