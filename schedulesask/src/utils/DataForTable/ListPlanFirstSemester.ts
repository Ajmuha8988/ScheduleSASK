import { GetPlan } from '../db/get/GetPlan';

export const ListPlanFirstSemester = () => {
    const { dataPlan, loadingPlan } = GetPlan();

    if (!loadingPlan && dataPlan !== null) {
        if (dataPlan.message === 'Ошибка при получении данных.') {
            return { filteredData: [], error: true, loadingFirstPlan: false };
        } else {
            // Шаг 1: Фильтрация данных по первому семестру
            const filteredFirstData = dataPlan.filter(item => item.KindOfSemester === "1-ый")
                .map((item, index) => ({ ...item, ID: index + 1 }));

            // Возвращаем обработанные данные
            return { filteredFirstData, loadingFirstPlan: false };
        }
    } else {
        return { filteredFirstData: [], loadingFirstPlan: true };
    }
};