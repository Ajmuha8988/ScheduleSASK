import { API_URL } from '../../API/config_APIts';
interface PScheduleData {
    NameGroup: string;
    ID_Lesson: bigint;
    ID_Room: bigint;
    ID_user: bigint;
    NumberLesson: number;
    DaysOfWeek: string;
    KindOfSchedules: string;
    CombinedCouple: boolean;
}
interface ServerErrors {
    errorInServer?: string;
    firstError?: string;
    HourError?: string;
    TeacherError?: string;
}
export const PScheduleService = () => {
    const addPSchedule = async (pscheduleData: PScheduleData) => {
        try {
            const response = await fetch(API_URL + '/administrator/addPSchedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(pscheduleData)
            });
            const data = await response.json();
            if (data.message === 'Успешно внесены изменения в расписании!') {
                return 'Предмет добавлен в расписании!';
            } else if (data.message === 'Успешно внесено совмещённая пара в расписании!') {
                return 'Успешно внесено совмещённая пара в расписании!';
            } else if (data.errormessagefirst === 'В это время уже установлено пара! Пожалуйста, выберите другое время') {
                throw {
                    firstError: 'В это время уже установлено пара! Пожалуйста, выберите другое время!'
                }
            } else if (data.errormessagefirst === 'Невозможно внести изменение в расписание, так как у преподавателя уже стоит пара в этой группе!') {
                throw {
                    firstError: 'Невозможно внести изменение в расписание, так как у преподавателя уже стоит пара в этой группе!'
                }
            } else if (data.errormessagehour === 'Вы больше не можете назначить пару, так как вы превышаете установленную нагрузку на преподавателя') {
                throw {
                    HourError: 'Вы больше не можете назначить пару, так как вы превышаете установленную нагрузку на преподавателя'
                }
            } else if (data.errormessageteacher === 'В это время уже установлено пара у преподавателя! Пожалуйста, выберите другое время') {
                throw {
                    TeacherError: 'В это время уже установлено пара у преподавателя! Пожалуйста, выберите другое время'
                }
            } else if (data.errormessageteacher === 'Вы больше не можете добавлять совмещённые пары, ибо их колличество превышает допустимого!') {
                throw {
                    TeacherError: 'Вы больше не можете добавлять совмещённые пары, ибо их колличество превышает допустимого!'
                }
            } else if (data.errormessageroom === 'Кабинет занят!') {
                throw {
                    TeacherError: 'Кабинет занят!'
                }
            } else if (data.errormessageroom === 'Невозможно добавить совмещённую пару, так как кабинеты не совпадают!') {
                throw {
                    TeacherError: 'Невозможно добавить совмещённую пару, так как кабинеты не совпадают!'
                }
            } else {
                throw {
                    errorInServer: 'Произошло непредвиденное ошибка в сервере. Повторите действие попозже!'
                }
            }
        } catch (error) {
            const serverErrors: ServerErrors = {};
            if (typeof error === 'object' && error !== null) {
                Object.assign(serverErrors, error);
            }
            throw new Error(JSON.stringify(serverErrors));
            
        }
    };
    return { addPSchedule };
};
