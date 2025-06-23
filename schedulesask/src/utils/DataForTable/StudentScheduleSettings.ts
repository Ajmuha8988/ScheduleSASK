import { calculateSemester } from '../Date/CalculateSemester'
import determineWeekType from '../Date/CalculateDivined'
import getAcademicWeek from '../Date/CalculateFirstSemester'
import { GetAllPartStudentPSchedule } from '../db/get/getAllPartStudentPSchedule';
import { GetAllPartStudentSchedule } from '../db/get/getAllPartStudentSchedule';
import { GetStudentNamegroup } from '../db/get/GetStudentNameGroup'
import { GetStartSecondSemester } from '../db/get/GetStartSecondSemester'
import getWeekRange from '../Date/CalculateCurrentWeek';
import ToDay from '../Date/CalculateToDay';

export const StudentScheduleSettings = (numberLesson: number, dayOfWeek: string) => {
    const { dataStudentSchedulePart, Studentloading, errorStudentMessage } = GetAllPartStudentSchedule();
    const { dataStudentPSchedulePart, StudentPloading, errorStudentPMessage } = GetAllPartStudentPSchedule();
    const { dataGroupName } = GetStudentNamegroup();
    const { dataSemester } = calculateSemester();
    const { dataSSS } = GetStartSecondSemester();
    const today = new Date();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null;
    if (dataSemester === '2-ой') {
        const currentDate = dataSSS.length > 0 ? dataSSS[0].DateSecondSemester : '';
        if (!Studentloading && Array.isArray(dataStudentSchedulePart) && currentDate !== '') {
            const secondSemesterStart = new Date(currentDate);
            const validDates = dataStudentSchedulePart
                .filter(x => new Date(x.TimeDate) >= today)
                .map(x => x.TimeDate);
            if (validDates.some(date => getWeekRange(date) === 'На этой неделе есть замена')) {
                if (errorStudentMessage || secondSemesterStart > today) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataStudentSchedulePart.filter(item => validDates.includes(item.TimeDate) &&
                        item.NumberLessons === numberLesson
                        && ToDay(new Date(item.TimeDate)) === dayOfWeek && item.NameGroup === nameGroup);
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                            dataForTable: ``,
                            about: '',
                            color: 'black',
                        }));
                    } else {
                        if (!StudentPloading && Array.isArray(dataStudentPSchedulePart) && currentDate !== '') {
                            const secondSemesterStart = new Date(currentDate);
                            const kindOfSchedules = determineWeekType(secondSemesterStart, today);
                            if (errorStudentPMessage || secondSemesterStart > today) {
                                return 'Выходной'
                            }
                            else {
                                const filteredData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                                const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                                const validateData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
                                    tempIDsFromFilteredData.has(item.Temp_ID_User));
                                if (filteredData.length > 0) {
                                    if (filteredData.length > 0) {
                                        return filteredData.map((item) => ({
                                            dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                            dataForTTable: ``,
                                            about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                            color: '',
                                        }));
                                    }
                                    else {
                                        return filteredData.map((item) => ({
                                            dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                            dataForTTable: ``,
                                            about: ``,
                                            color: '',
                                        }));
                                    }

                                } else {
                                    return 'Нет занятий';
                                }
                            }
                        } else {
                            return StudentPloading
                        }
                    }
                }
            } else {
                if (!StudentPloading && Array.isArray(dataStudentPSchedulePart) && currentDate !== '') {
                    const secondSemesterStart = new Date(currentDate);
                    const kindOfSchedules = determineWeekType(secondSemesterStart, today);
                    if (errorStudentPMessage || secondSemesterStart > today) {
                        return 'Выходной'
                    }
                    else {
                        const filteredData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                        const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                        const validateData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
                            tempIDsFromFilteredData.has(item.Temp_ID_User));
                        if (filteredData.length > 0) {
                            if (filteredData.length > 0) {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                    dataForTTable: ``,
                                    about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                    color: '',
                                }));
                            }
                            else {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                    about: ``,
                                    dataForTTable: ``,
                                    color: '',
                                }));
                            }

                        } else {
                            return 'Нет занятий';
                        }
                    }
                } else {
                    return StudentPloading
                }
            }
        } else {
            if (!StudentPloading && Array.isArray(dataStudentPSchedulePart) && currentDate !== '') {
                const secondSemesterStart = new Date(currentDate);
                const kindOfSchedules = determineWeekType(secondSemesterStart, today);
                if (errorStudentPMessage || secondSemesterStart > today) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                    const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                    const validateData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
                        tempIDsFromFilteredData.has(item.Temp_ID_User));
                    if (filteredData.length > 0) {
                        if (filteredData.length > 0) {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                dataForTTable: ``,
                                color: '',
                            }));
                        }
                        else {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                about: ``,
                                dataForTTable: ``,
                                color: '',
                            }));
                        }

                    } else {
                        return 'Нет занятий';
                    }
                }
            } else {
                return StudentPloading
            }
        }
    }
    else if (dataSemester === '1-ый') {
        const kindOfSchedules = getAcademicWeek(today)
        if (!Studentloading && Array.isArray(dataStudentSchedulePart)) {
            const validDates = dataStudentSchedulePart
                .filter(x => new Date(x.TimeDate) >= today)
                .map(x => x.TimeDate);
            if (validDates.some(date => getWeekRange(date) === 'На этой неделе есть замена')) {
                if (errorStudentMessage) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataStudentSchedulePart.filter(item => validDates.includes(item.TimeDate) &&
                        item.NumberLessons === numberLesson
                        && ToDay(item.TimeDate) === dayOfWeek && item.NameGroup === nameGroup);
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                            dataForTable: ``,
                            about: ``,
                            color: '',
                        }));
                    } else {
                        return 'Нет занятий';
                    }
                }
            } else {
                if (!StudentPloading && Array.isArray(dataStudentPSchedulePart)) {
                    if (errorStudentPMessage) {
                        return 'Выходной'
                    }
                    else {
                        const filteredData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                        const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                        const validateData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
                            tempIDsFromFilteredData.has(item.Temp_ID_User));
                        if (filteredData.length > 0) {
                            if (filteredData.length > 0) {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                    dataForTTable: ``,
                                    about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                    color: '',
                                }));
                            }
                            else {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                    about: ``,
                                    dataForTTable: ``,
                                    color: '',
                                }));
                            }

                        } else {
                            if (!StudentPloading && Array.isArray(dataStudentPSchedulePart)) {
                                if (errorStudentPMessage) {
                                    return 'Выходной'
                                }
                                else {
                                    const filteredData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                                    const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                                    const validateData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
                                        tempIDsFromFilteredData.has(item.Temp_ID_User));
                                    if (filteredData.length > 0) {
                                        if (filteredData.length > 0) {
                                            return filteredData.map((item) => ({
                                                dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                                about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                                dataForTTable: ``,
                                                color: '',
                                            }));
                                        }
                                        else {
                                            return filteredData.map((item) => ({
                                                dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                                about: ``,
                                                dataForTTable: ``,
                                                color: '',
                                            }));
                                        }

                                    } else {
                                        return 'Нет занятий';
                                    }
                                }
                            } else {
                                return StudentPloading
                            }
                        }
                    }
                } else {
                    return StudentPloading
                }
            }
        } else {
            if (!StudentPloading && Array.isArray(dataStudentPSchedulePart)) {
                if (errorStudentPMessage) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup === nameGroup);
                    const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                    const validateData = dataStudentPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules && item.NameGroup !== nameGroup &&
                        tempIDsFromFilteredData.has(item.Temp_ID_User));
                    if (filteredData.length > 0) {
                        if (filteredData.length > 0) {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                dataForTTable: ``,
                                color: '',
                            }));
                        }
                        else {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.Temp_ID_User}\n ${item.NameLesson}\n${item.NameRoom}\n${item.Lastname} ${item.Firstname} ${item.Patronymic}`,
                                about: ``,
                                dataForTTable: ``,
                                color: '',
                            }));
                        }

                    } else {
                        return 'Нет занятий';
                    }
                }
            } else {
                return StudentPloading;
            }
        }
    }
    else {
        return 'Каникулы'
    }
}