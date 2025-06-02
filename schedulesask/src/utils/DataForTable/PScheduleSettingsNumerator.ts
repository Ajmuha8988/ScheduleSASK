import { GetAllPartPscheduleNumerator } from '../db/get/getAllPartPSchedulePartNumerator';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
export const PScheduleNumerator = (numberLesson, dayOfWeek) => {
    const { dataNumeratorPschedulePart, loading } = GetAllPartPscheduleNumerator();
    const { dataGroupName } = GetNamegroup();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null && !loading;
        if (!loading && dataNumeratorPschedulePart !== null) {
            if (dataNumeratorPschedulePart.message === 'Ошибка при получении данных о расписании') {
                return 'Выходной'
            }
            else {
                const filteredData = dataNumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === "Числитель" && item.NameGroup === nameGroup);
                const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                const validateData = dataNumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === "Числитель" && item.NameGroup !== nameGroup &&
                    tempIDsFromFilteredData.has(item.Temp_ID_User));
                if (filteredData.length > 0) {
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                            NameLessons: `${item.ID_PSchedule}`,
                            about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                            other: `${validateData.map(items => items.ID_PSchedule)}`,
                        }));
                    }
                    else {
                        return filteredData.map((item) => ({
                            dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                            NameLessons: `${item.ID_PSchedule}`
                        }));
                    }
                   
                } else {
                    return null; // Или любое другое значение, если записей не нашлось
                }
            }
        } else {
            return loading
        }
    
};
