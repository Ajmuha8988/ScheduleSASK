import { calculateSemester } from '../Date/CalculateSemester'
import determineWeekType from '../Date/CalculateDivined'
import getAcademicWeek from '../Date/CalculateFirstSemester'
import { GetAllPartPscheduleNumerator } from '../db/get/getAllPartPSchedulePartNumerator';
import { GetAllPartTSchedule } from '../db/get/getAllPartTSchedule';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup'
import { GetStartSecondSemester } from '../../utils/db/get/GetStartSecondSemester'
import getWeekRange from '../Date/CalculateCurrentWeek';
import ToDay from '../Date/CalculateToDay';

export const TScheduleSettings = (numberLesson: number, dayOfWeek: string) => {
    const { dataTSchedulePart, Tloading, errorTMessage } = GetAllPartTSchedule();
    const { dataNumeratorPschedulePart, loading, errorMessage } = GetAllPartPscheduleNumerator();
    const { dataGroupName } = GetNamegroup();
    const { dataSemester } = calculateSemester();
    const { dataSSS } = GetStartSecondSemester();
    const today = new Date();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null;
    if (dataSemester === '2-ой') {
        const currentDate = dataSSS.length > 0 ? dataSSS[0].DateSecondSemester : '';
        if (!Tloading && Array.isArray(dataTSchedulePart) && currentDate !== '') {
            const secondSemesterStart = new Date(currentDate);
            const validDates = dataTSchedulePart
                .filter(x => {
                    const eventDate = new Date(x.TimeDate);
                    return eventDate.getFullYear() === today.getFullYear()
                        && eventDate.getMonth() === today.getMonth()
                        && eventDate.getDate() >= today.getDate();
                })
                .map(x => x.TimeDate);
            if (validDates.some(date => getWeekRange(new Date(date)) === 'На этой неделе есть замена')) {
                if (errorTMessage || secondSemesterStart > today) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataTSchedulePart.filter(item => validDates.includes(item.TimeDate) &&
                        item.NumberLessons === numberLesson
                        && ToDay(new Date(item.TimeDate)) === dayOfWeek && item.NameGroup === nameGroup);
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                            dataForTable: ``,
                            NameLessons: `${item.ID_TSchedule}`,
                            about: ``,
                            other: ``,
                            color: 'black',
                        }));
                    } else {
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
                                            dataForTTable: ``,
                                            NameLessons: `${item.ID_PSchedule}`,
                                            about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                            other: `${validateData.map(items => items.ID_PSchedule)}`,
                                            color: '',
                                        }));
                                    }
                                    else {
                                        return filteredData.map((item) => ({
                                            dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                            dataForTTable: ``,
                                            NameLessons: `${item.ID_PSchedule}`,
                                            about: ``,
                                            other: ``,
                                            color: '',
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
                }
            } else {
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
                                    dataForTTable: ``,
                                    NameLessons: `${item.ID_PSchedule}`,
                                    about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                    other: `${validateData.map(items => items.ID_PSchedule)}`,
                                    color: '',
                                }));
                            }
                            else {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                    NameLessons: `${item.ID_PSchedule}`,
                                    about: ``,
                                    other: ``,
                                    dataForTTable: ``,
                                    color: '',
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
        } else {
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
                                dataForTTable: ``,
                                color: '',
                            }));
                        }
                        else {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                NameLessons: `${item.ID_PSchedule}`,
                                about: ``,
                                other: ``,
                                dataForTTable: ``,
                                color: '',
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
    }
    else if (dataSemester === '1-ый') {
        const kindOfSchedules = getAcademicWeek(today)
        if (!Tloading && Array.isArray(dataTSchedulePart)) {
            const validDates = dataTSchedulePart
                .filter(x => {
                    const eventDate = new Date(x.TimeDate);
                    return eventDate.getFullYear() === today.getFullYear()
                        && eventDate.getMonth() === today.getMonth()
                        && eventDate.getDate() >= today.getDate();
                })
                .map(x => x.TimeDate);
            if (validDates.some(date => getWeekRange(date) === 'На этой неделе есть замена')) {
                if (errorTMessage) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataTSchedulePart.filter(item => validDates.includes(item.TimeDate) &&
                        item.NumberLessons === numberLesson
                        && ToDay(item.TimeDate) === dayOfWeek && item.NameGroup === nameGroup);
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                            dataForTable: ``,
                            NameLessons: `${item.ID_TSchedule}`,
                            about: ``,
                            other: ``,
                            color: '',
                        }));
                    } else {
                        return 'Нет занятий';
                    }
                }
            } else {
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
                                    dataForTTable: ``,
                                    NameLessons: `${item.ID_PSchedule}`,
                                    about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                    other: `${validateData.map(items => items.ID_PSchedule)}`,
                                    color: '',
                                }));
                            }
                            else {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                    NameLessons: `${item.ID_PSchedule}`,
                                    about: ``,
                                    other: ``,
                                    dataForTTable: ``,
                                    color: '',
                                }));
                            }

                        } else {
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
                                                dataForTTable: ``,
                                                color: '',
                                            }));
                                        }
                                        else {
                                            return filteredData.map((item) => ({
                                                dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                                NameLessons: `${item.ID_PSchedule}`,
                                                about: ``,
                                                other: ``,
                                                dataForTTable: ``,
                                                color: '',
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
                    }
                } else {
                    return loading
                }
            }
        } else {
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
                                dataForTTable: ``,
                                color: '',
                            }));
                        }
                        else {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                NameLessons: `${item.ID_PSchedule}`,
                                about: ``,
                                other: ``,
                                dataForTTable: ``,
                                color: '',
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
    }
    else {
        return 'Каникулы'
    }
}