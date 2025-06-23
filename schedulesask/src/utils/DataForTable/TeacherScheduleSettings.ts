import { calculateSemester } from '../Date/CalculateSemester'
import determineWeekType from '../Date/CalculateDivined'
import getAcademicWeek from '../Date/CalculateFirstSemester'
import { GetAllPartTeacherPSchedule } from '../db/get/getAllPartTeacherPSchedule';
import { GetAllPartTeacherSchedule } from '../db/get/getAllPartTeacherSchedule';
import { GetStartSecondSemester } from '../db/get/GetStartSecondSemester'
import getWeekRange from '../Date/CalculateCurrentWeek';
import ToDay from '../Date/CalculateToDay';

export const TeacherScheduleSettings = (numberLesson: number, dayOfWeek: string) => {
    const { dataTeacherSchedulePart, Teacherloading, errorTeacherMessage } = GetAllPartTeacherSchedule();
    const { dataTeacherPSchedulePart, TeacherPloading, errorTeacherPMessage } = GetAllPartTeacherPSchedule();
    const { dataSemester } = calculateSemester();
    const { dataSSS } = GetStartSecondSemester();
    const today = new Date();
    if (dataSemester === '2-ой') {
        const currentDate = dataSSS.length > 0 ? dataSSS[0].DateSecondSemester : '';
        if (!Teacherloading && Array.isArray(dataTeacherSchedulePart) && currentDate !== '') {
            const secondSemesterStart = new Date(currentDate);
            const validDates = dataTeacherSchedulePart
                .filter(x => {
                    const eventDate = new Date(x.TimeDate);
                    return eventDate.getFullYear() === today.getFullYear()
                        && eventDate.getMonth() === today.getMonth()
                        && eventDate.getDate() >= today.getDate();
                })
                .map(x => x.TimeDate);
            if (validDates.some(date => getWeekRange(date) === 'На этой неделе есть замена')) {
                if (errorTeacherMessage || secondSemesterStart > today) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataTeacherSchedulePart.filter(item => validDates.includes(item.TimeDate) &&
                        item.NumberLessons === numberLesson
                        && ToDay(new Date(item.TimeDate)) === dayOfWeek);
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                            dataForTable: ``,
                            about: '',
                            color: 'black',
                        }));
                    } else {
                        if (!TeacherPloading && Array.isArray(dataTeacherPSchedulePart) && currentDate !== '') {
                            const secondSemesterStart = new Date(currentDate);
                            const kindOfSchedules = determineWeekType(secondSemesterStart, today);
                            if (errorTeacherPMessage || secondSemesterStart > today) {
                                return 'Выходной'
                            }
                            else {
                                const filteredData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules );
                                const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                                const validateData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                    && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules  && tempIDsFromFilteredData.has(item.Temp_ID_User));
                                if (filteredData.length > 0) {
                                    if (filteredData.length > 0) {
                                        return filteredData.map((item) => ({
                                            dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                            dataForTTable: ``,
                                            about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                            color: '',
                                        }));
                                    }
                                    else {
                                        return filteredData.map((item) => ({
                                            dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
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
                            return TeacherPloading
                        }
                    }
                }
            } else {
                if (!TeacherPloading && Array.isArray(dataTeacherPSchedulePart) && currentDate !== '') {
                    const secondSemesterStart = new Date(currentDate);
                    const kindOfSchedules = determineWeekType(secondSemesterStart, today);
                    if (errorTeacherPMessage || secondSemesterStart > today) {
                        return 'Выходной'
                    }
                    else {
                        const filteredData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules);
                        const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                        const validateData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules &&
                            tempIDsFromFilteredData.has(item.Temp_ID_User));
                        if (filteredData.length > 0) {
                            if (filteredData.length > 0) {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                    dataForTTable: ``,
                                    about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                    color: '',
                                }));
                            }
                            else {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
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
                    return TeacherPloading
                }
            }
        } else {
            if (!TeacherPloading && Array.isArray(dataTeacherPSchedulePart) && currentDate !== '') {
                const secondSemesterStart = new Date(currentDate);
                const kindOfSchedules = determineWeekType(secondSemesterStart, today);
                if (errorTeacherPMessage || secondSemesterStart > today) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules);
                    const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                    const validateData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules &&
                        tempIDsFromFilteredData.has(item.Temp_ID_User));
                    if (filteredData.length > 0) {
                        if (filteredData.length > 0) {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                dataForTTable: ``,
                                color: '',
                            }));
                        }
                        else {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
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
                return TeacherPloading
            }
        }
    }
    else if (dataSemester === '1-ый') {
        const kindOfSchedules = getAcademicWeek(today)
        if (!Teacherloading && Array.isArray(dataTeacherSchedulePart)) {
            const validDates = dataTeacherSchedulePart
                .filter(x => {
                    const eventDate = new Date(x.TimeDate);
                    return eventDate.getFullYear() === today.getFullYear()
                        && eventDate.getMonth() === today.getMonth()
                        && eventDate.getDate() >= today.getDate();
                })
                .map(x => x.TimeDate);
            if (validDates.some(date => getWeekRange(date) === 'На этой неделе есть замена')) {
                if (errorTeacherMessage) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataTeacherSchedulePart.filter(item => validDates.includes(item.TimeDate)
                        && item.NumberLessons === numberLesson
                        && ToDay(item.TimeDate) === dayOfWeek);
                    if (filteredData.length > 0) {
                        return filteredData.map((item) => ({
                            dataForTTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                            dataForTable: ``,
                            about: ``,
                            color: '',
                        }));
                    } else {
                        return 'Нет занятий';
                    }
                }
            } else {
                if (!TeacherPloading && Array.isArray(dataTeacherPSchedulePart)) {
                    if (errorTeacherPMessage) {
                        return 'Выходной'
                    }
                    else {
                        const filteredData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules);
                        const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                        const validateData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                            && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules &&
                            tempIDsFromFilteredData.has(item.Temp_ID_User));
                        if (filteredData.length > 0) {
                            if (filteredData.length > 0) {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                    dataForTTable: ``,
                                    about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                    color: '',
                                }));
                            }
                            else {
                                return filteredData.map((item) => ({
                                    dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                    about: ``,
                                    dataForTTable: ``,
                                    color: '',
                                }));
                            }

                        } else {
                            if (!TeacherPloading && Array.isArray(dataTeacherPSchedulePart)) {
                                if (errorTeacherPMessage) {
                                    return 'Выходной'
                                }
                                else {
                                    const filteredData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules);
                                    const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                                    const validateData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules &&
                                        tempIDsFromFilteredData.has(item.Temp_ID_User));
                                    if (filteredData.length > 0) {
                                        if (filteredData.length > 0) {
                                            return filteredData.map((item) => ({
                                                dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                                about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                                dataForTTable: ``,
                                                color: '',
                                            }));
                                        }
                                        else {
                                            return filteredData.map((item) => ({
                                                dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
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
                                return TeacherPloading
                            }
                        }
                    }
                } else {
                    return TeacherPloading
                }
            }
        } else {
            if (!TeacherPloading && Array.isArray(dataTeacherPSchedulePart)) {
                if (errorTeacherPMessage) {
                    return 'Выходной'
                }
                else {
                    const filteredData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules);
                    const tempIDsFromFilteredData = new Set(filteredData.map(item => item.Temp_ID_User));
                    const validateData = dataTeacherPSchedulePart.filter(item => item.NumberLessons === numberLesson && item.KindOfSemester === dataSemester
                        && item.DaysOfWeek === dayOfWeek && item.KindOfSchedules === kindOfSchedules &&
                        tempIDsFromFilteredData.has(item.Temp_ID_User));
                    if (filteredData.length > 0) {
                        if (filteredData.length > 0) {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
                                about: `${validateData.map(items => items.NameGroup)}\n${validateData.map(items => items.NameLesson)}\n${validateData.map(items => items.NameRoom)}\n${validateData.map(items => items.Lastname)} ${validateData.map(items => items.Firstname)} ${validateData.map(items => items.Patronymic)}`,
                                dataForTTable: ``,
                                color: '',
                            }));
                        }
                        else {
                            return filteredData.map((item) => ({
                                dataForTable: `${item.NameGroup}\n${item.NameLesson}\n${item.NameRoom}`,
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
                return TeacherPloading;
            }
        }
    }
    else {
        return 'Каникулы'
    }
}