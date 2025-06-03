import { GetPlan } from '../db/get/GetPlan';

export const ListPlanSecondSemester = () => {
    const { dataPlan, loadingPlan } = GetPlan();
    const dataSecondPlan = dataPlan;
    const loadingSecondPlan = loadingPlan
    if (!loadingPlan && dataPlan !== null) {
        if (dataSecondPlan.message === 'Ошибка при получении данных.') {
            return { filteredData: [], error: true, loadingSecondPlan };
        } else {
            // Шаг 1: Фильтруем данные по первому семестру
            const filteredDataForSecondSemester = dataPlan.filter(item => item.KindOfSemester === "2-ой")
                                              .map((item, index) => ({...item, ID: index + 1 }));
            
            // Теперь возвращаем исходные данные без дополнительной группировки
            return { filteredDataForSecondSemester, loadingSecondPlan: false };
        }
    } else {
        return { filteredDataForSecondSemester: [], loadingSecondPlan: true };
    }
};