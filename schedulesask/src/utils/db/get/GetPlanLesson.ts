import { useState, useEffect } from 'react';
import { API_URL } from '../../API/config_APIts';
interface PlanLesson {
    NameGroup: string;
    KindOfSemester: string;
    Temp_ID_User: number;
    NameLesson: string;
    ID_Lesson: number;
    ID_TeacherPlan: number;
    NumberHourInWeek: number;
}
// Кастомный хук для получения данных
export const GetPlanLesson = () => {
    const [dataPlanLesson, setPlanLesson] = useState<PlanLesson[]>([]); // Данные о ролях
    const [loadingPlanLesson, setLoading] = useState(true); // Статус загрузки

    useEffect(() => {
        fetch(API_URL + '/administrator/GetPlanLesson', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setPlanLesson(data);
                // Ждем секунду после успешной загрузки данных,
                // чтобы показать спиннер дольше, потом снимаем флаг загрузки
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Задержка в миллисекундах (секунда)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setPlanLesson([]); // Очищаем данные в случае ошибки
                setTimeout(() => {
                    setLoading(false); // Даже в случае ошибки ждём секунда
                }, 1000); // Задержка в миллисекундах (секунда)
            });
    }, []);

    return { dataPlanLesson, loadingPlanLesson };
};
