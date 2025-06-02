import { GetPlan } from '../db/get/GetPlan';

export const ListPlanFirstSemester = () => {
    const { dataPlan, loadingPlan } = GetPlan();
    const dataFirstPlan = dataPlan;
    const loadingFirstPlan = loadingPlan
    if (!loadingFirstPlan && dataFirstPlan !== null) {
        if (dataFirstPlan.message === 'Ошибка при получении данных.') {
            return { filteredData: [], error: true, loadingFirstPlan };
        } else {
            // Шаг 1: Фильтрация данных по семестру
            const filteredFirstData = dataFirstPlan.filter(item => item.KindOfSemester === "1-ый");

            // Шаг 2: Многократная сортировка по фамилии, имени и отчеству
            const sortedData = filteredFirstData.sort((a, b) => {
                let comparisonResult = 0;

                // Сначала сравниваем по фамилии
                const lastNameA = a.Lastname ? a.Lastname.toLowerCase() : '';
                const lastNameB = b.Lastname ? b.Lastname.toLowerCase() : '';
                if (lastNameA > lastNameB) return -1;
                if (lastNameA < lastNameB) return 1;

                // Если фамилии равны — сортируем по имени
                const firstNameA = a.Firstname ? a.Firstname.toLowerCase() : '';
                const firstNameB = b.Firstname ? b.Firstname.toLowerCase() : '';
                if (firstNameA > firstNameB) return -1;
                if (firstNameA < firstNameB) return 1;

                // Если имена также совпадают — сортируем по отчеству
                const patronymicA = a.Patronymic ? a.Patronymic.toLowerCase() : '';
                const patronymicB = b.Patronymic ? b.Patronymic.toLowerCase() : '';
                if (patronymicA > patronymicB) return -1;
                if (patronymicA < patronymicB) return 1;

                const callNumberA = a.CallNumber ? a.CallNumber.toLowerCase() : '';
                const callNumberB = b.CallNumber ? b.CallNumber.toLowerCase() : '';
                if (callNumberA > callNumberB) return -1;
                if (callNumberA < callNumberB) return 1;

                return comparisonResult;
            });

            const resultArray = [];
            let previousFullName = '';

            sortedData.forEach((item, index) => {
                const fullName = `${item.Lastname || ''} ${item.Firstname || ''} ${item.Patronymic || ''}`;
                const phoneNumber = item.CallNumber;
                const namelesson = item.NameLesson;
                const namegroup = item.NameGroup;
                const timeforlesson = item.TimeForLesson;
                const numberhourinweek = item.NumberHourInWeek;

                if (index === 0 || fullName !== previousFullName) {
                    // Первое появление или новый человек — выводим полное ФИО и номер телефона
                    resultArray.push({
                        Lastname: item.Lastname,
                        Firstname: item.Firstname,
                        Patronymic: item.Patronymic,
                        CallNumber: item.CallNumber,
                        NameLesson: item.NameLesson,
                        NameGroup: item.NameGroup,
                        TimeForLesson: item.TimeForLesson,
                        NumberHourInWeek: item.NumberHourInWeek
                    });
                } else {
                    // Повторение ФИО — сохраняем только номер телефона и остальные поля
                    resultArray.push({
                        CallNumber: phoneNumber,
                        NameLesson: namelesson,
                        NameGroup: namegroup,
                        TimeForLesson: timeforlesson,
                        NumberHourInWeek: numberhourinweek
                    });
                }

                previousFullName = fullName;
            });

            // Здесь мы НЕ делаем stringify(), так как нам нужен массив объектов
            return { filteredFirstData: resultArray, loadingFirstPlan };
        }
    } else {
        return { filteredFirstData: [], loadingFirstPlan };
    }
};