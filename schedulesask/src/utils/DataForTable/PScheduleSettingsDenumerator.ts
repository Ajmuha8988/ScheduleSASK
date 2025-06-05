import { GetAllPartPscheduleDenumerator } from '../db/get/getAllPartPSchedulePartDenumerator';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
export const PScheduleDenumerator = (numberLesson: number, dayOfWeek: string) => {
    const { dataDenumeratorPschedulePart, DenumeratorLoading, errorMessage } = GetAllPartPscheduleDenumerator();
    const { dataGroupName, loading } = GetNamegroup();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null;
    if (!DenumeratorLoading && Array.isArray(dataDenumeratorPschedulePart) && !loading) {
            if (errorMessage) {
                return 'Выходной'
            }
            else {
                const filteredData = dataDenumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === "Знаменатель" && item.NameGroup === nameGroup);
                const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                const validateData = dataDenumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === "Знаменатель" && item.NameGroup !== nameGroup &&
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
                            NameLessons: `${item.ID_PSchedule}`,
                            about: ``,
                            other: ``,
                        }));
                    }

                } else {
                    return 'Нет занятий';
                }
            }
        } else {
            return DenumeratorLoading
        }
};
