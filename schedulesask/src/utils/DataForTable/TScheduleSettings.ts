import { calculateSemester } from '../Date/CalculateSemester'
import determineWeekType from '../Date/CalculateDivined'
import getAcademicWeek from '../Date/CalculateFirstSemester'
import { GetAllPartPscheduleNumerator } from '../db/get/getAllPartPSchedulePartNumerator';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup'
import { GetStartSecondSemester } from '../../utils/db/get/GetStartSecondSemester'

export const TScheduleSettings = (numberLesson: number, dayOfWeek: string) => {
    const { dataNumeratorPschedulePart, loading, errorMessage } = GetAllPartPscheduleNumerator();
    const { dataGroupName } = GetNamegroup();
    const { dataSemester } = calculateSemester();
    const { dataSSS } = GetStartSecondSemester();
    const today = new Date();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null;
    if (dataSemester === '2-ой') {
        const currentDate = dataSSS.length > 0 ? dataSSS[0].DateSecondSemester : '';
        if (!loading && Array.isArray(dataNumeratorPschedulePart) && currentDate !== '') {
            const secondSemesterStart = new Date(currentDate);
            const kindOfSchedules = determineWeekType(secondSemesterStart, today);
            if (errorMessage || secondSemesterStart > today) {
                return 'Выходной'
            }
            else {
                const filteredData = dataNumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                const validateData = dataNumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
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
            return loading
        }
    }
    else if (dataSemester === '1-ый') {
        const kindOfSchedules = getAcademicWeek(today)
        if (!loading && Array.isArray(dataNumeratorPschedulePart)) {
            if (errorMessage) {
                return 'Выходной'
            }
            else {
                const filteredData = dataNumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                const validateData = dataNumeratorPschedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
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
            return loading
        }
    }
    else {
        return 'Каникулы'
    }
}