import { useState, useEffect } from 'react';
import "./mobilebody.css";
import {
    TextField, Autocomplete, ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { changeGroupService } from '../../utils/db/post/changeGroupInPSchedule';
import { TScheduleService } from '../../utils/db/post/AddTSchedule';
import { GeneralSubBurdenService } from '../../utils/db/post/CreateSubBurden';
import { GetAllgroups } from '../../utils/db/get/GetAllGroup';
import { GetPlanLesson } from '../../utils/db/get/GetPlanLesson';
import { GetAllrooms } from '../../utils/db/get/GetAllRoom';
import { GetAllTeacher } from '../../utils/db/get/GetAllTeacher';
import { GetAllSubBurden } from '../../utils/db/get/getAllSubBurden';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
import { styled } from "@mui/material/styles";
import { calculateSemester } from '../../utils/Date/CalculateSemester';
import { Modal } from 'react-bootstrap';
import dayjs, { Dayjs } from 'dayjs'; // Обязательно импортируйте библиотеку Day.js
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface OptionType {
    label: string;
    value: bigint;
}
interface OptionTypeNumberLessons {
    label: string;
    value: number;
}
interface OptionTypeLessons {
    label: string;
    value: bigint;
    validate: bigint;
    lessonlabel: number;

}

const theme = createTheme({
    palette: {
        warning: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});
const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiFormLabel-root.Mui-focused": {
        fontFamily: 'Vollda',
        color: '#616161'
    },
    "& .MuiFormLabel-root": {
        fontFamily: 'Vollda',
        color: '#616161'
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
        fontFamily: 'Vollda',
        color: "#616161"
    },
    "& .MuiAutocomplete-inputRoot": {
        fontFamily: 'Vollda',
        color: "#616161",

        "& .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#616161"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#616161"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#ffc107"
        }
    }
});
const numberLesson = [1, 2, 3, 4, 5, 6, 7];
const AddTScheduleForm = () => {
    const [DateTSchedules, setDatesecondSemester] = useState<Dayjs | null>(dayjs());
    const [showAddSubBurden, SetAddSubBurden] = useState(false);
    const [errorFirst, SetErrorFirst] = useState<string | null>(null);
    const [errorSecond, SetErrorSecond] = useState<string | null>(null);
    const [errorInServer, SetErrorInServer] = useState<string | null>(null);
    const [errorInServerFirst, SetErrorInServerFirst] = useState<string | null>(null);
    const [errorInServerSecond, SetErrorInServerSecond] = useState<string | null>(null);
    const [errorInTeacherTime, SetErrorInTeacherTime] = useState<string | null>(null);
    const [successSubBurden, SetSuccessSubBurden] = useState<string | null>(null);
    const [successPSchedule, SetSuccessPSchedule] = useState<string | null>(null);
    const { addTSchedule } = TScheduleService();
    const { addGeneralSubBurden } = GeneralSubBurdenService();
    const { EventChangeGroup } = changeGroupService();
    const { dataSemester } = calculateSemester();
    const { dataGroupName } = GetNamegroup();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : '';
    const [CurrentNameGroup, SetCurrentNameGroup] = useState('');
    useEffect(() => {
        SetCurrentNameGroup(nameGroup); // устанавливаем состояние только один раз
    }, [nameGroup]);
    const [LabelTeacher, setLabelTeacher] = useState<string | null>(null);
    const [LabelLesson, setLabelLesson] = useState<string | null>('');;
    const [LabelLessonWeek, setLabelLessonWeek] = useState<number | null>(null);
    const [ID_TeacherPlans, setID_TeacherPlan] = useState<bigint | null>(null);
    const [ID_Lessons, setID_Lesson] = useState<bigint | null>(null);
    const [ID_Rooms, setID_Room] = useState<bigint | null>(null);
    const [ID_Teacher, setID_Teacher] = useState<bigint | null>(null);
    const [NumberLessons, setNumberLesson] = useState<number | null>(null);
    const [FirstHours, setFirstHour] = useState<number | null>(null);
    const [SecondHours, setSecondHour] = useState<number | null>(null);
    const group = GetAllgroups();
    const { dataPlanLesson } = GetPlanLesson();
    const { dataAllSubBurden } = GetAllSubBurden();
    const room = GetAllrooms();
    const teacher = GetAllTeacher();
    const handleChange = (newValue: Dayjs | null) => {
        setDatesecondSemester(newValue); // Теперь это работает правильно
    };
    const filteredDataPlanLesson = dataPlanLesson.filter(
        lesson => Number(lesson.Temp_ID_User) === Number(ID_Teacher) && // Предполагается, что данные содержат Teacher_Temp_ID
        lesson.NameGroup === CurrentNameGroup && lesson.KindOfSemester === dataSemester
    );
    const optionsGroup = group?.length > 0 ? group.map(groups => ({
        label: `${groups.NameGroup}`,
        value: groups.ID_Group,
    })) : [];
    const optionsTeacher = teacher?.length > 0 ? teacher.map(teachers => ({
        label: `${teachers.Lastname} ${teachers.Firstname} ${teachers.Patronymic}`,
        value: teachers.Temp_ID_User,
    })) : [];
    const optionsLesson = filteredDataPlanLesson?.length > 0 ?
        filteredDataPlanLesson.map(dataPlanLessons => ({
        label: `${dataPlanLessons.NameLesson}`,
        value: dataPlanLessons.ID_Lesson,
        validate: dataPlanLessons.ID_TeacherPlan,
        lessonlabel: dataPlanLessons.NumberHourInWeek,
        })) : [];
    const optionsRoom = room?.length > 0 ? room.map(rooms => ({
        label: `${rooms.NameRoom}`,
        value: rooms.ID_Room,
    })) : [];
    const optionsNLessons = numberLesson.map(numberLessonss => ({
        label: numberLessonss,
        value: numberLessonss,
    }));
    const [error, setError] = useState<string | null>(null);
    const changeGroup = async (groupId: string) => {
        try {
            await EventChangeGroup({ NameGroup: groupId }); // Выполняем изменение группы
            window.location.reload(); // Перезагружаем страницу после успешного изменения
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            } // Устанавливаем ошибку в состояние
        }
    };
    const AddPScheduleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!ID_Rooms || !ID_Lessons || !NumberLessons || !ID_Teacher
            || !DateTSchedules) {
            console.log("Невозможно добавить учебный расписание.");
            return;
        }
        try {
             const successPSchedule = await addTSchedule({
                NameGroup: CurrentNameGroup,
                ID_Lesson: ID_Lessons,
                ID_Room: ID_Rooms,
                ID_user: ID_Teacher,
                NumberLesson: NumberLessons,
                TimeDate: DateTSchedules.format('DD/MM/YYYY'),
             });
            if (successPSchedule && typeof successPSchedule === 'string') { // Убедитесь, что возвращается именно строка
                SetSuccessPSchedule(successPSchedule); // Устанавливаем сообщение успеха
            } else {
                SetSuccessPSchedule('Ошибка добавления предмета.');
            }
            SetErrorInServerFirst(null);
            SetErrorInServer(null);
            SetErrorInServerSecond(null);
            SetErrorInTeacherTime(null);
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);
                // Выводим наиболее значимую ошибку
                const primaryError = [
                    parsedError.firstError,
                    parsedError.HourError,
                    parsedError.TeacherError,
                    parsedError.errorInServer
                ].find((msg) => msg) || 'Ошибка при обработке запроса.';

                SetErrorInServer(primaryError);
            } else {
                SetErrorInServer(String(error));
            }
            
        }

    };
    const AddSubBurden = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!ID_TeacherPlans || !FirstHours || !SecondHours) {
            console.log("Невозможно добавить учебный расписание.");
            return;
        }
        try {
            const successfullSubBurden = await addGeneralSubBurden({
                ID_TeacherPlan: ID_TeacherPlans,
                NumeratorPlan: FirstHours,
                DenominatorPlan: SecondHours
            });
            SetErrorFirst(null);
            SetErrorSecond(null);
            if (successfullSubBurden && typeof successfullSubBurden === 'string') { // Убедитесь, что возвращается именно строка
                SetSuccessSubBurden(successfullSubBurden); // Устанавливаем сообщение успеха
            } else {
                SetSuccessSubBurden('Ошибка распределение поднагрузки.');
            }
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);
                // Выводим наиболее значимую ошибку
                SetErrorFirst(parsedError.firstmessage);
                SetErrorSecond(parsedError.secondmessage);
            } else {
                SetErrorSecond(String(error));
            }
        }

    };
    const handleSelectLesson = async (newValue: OptionTypeLessons) => {
        if (!newValue || !newValue.validate) {
            setFirstHour(null);
            setSecondHour(null);
        } ;

        try {
            // Получаем часы преподавателя непосредственно из массива учителей
            const selectedLesson = filteredDataPlanLesson.find(t => BigInt(t.ID_TeacherPlan) === BigInt(newValue.validate));
            if (selectedLesson === undefined) {
                SetAddSubBurden(true);
                console.error("Данные о числе пар отсутствуют");
            }
            else {
                const selectedSubBurden = dataAllSubBurden.find(x => x.ID_TeacherPlan === selectedLesson.ID_TeacherPlan);
                if (selectedSubBurden && selectedSubBurden.NumeratorPlan !== undefined && selectedSubBurden.DenominatorPlan !== undefined) {
                    setFirstHour(selectedSubBurden.NumeratorPlan);
                    setSecondHour(selectedSubBurden.DenominatorPlan);
                } else {
                    SetAddSubBurden(true);
                    console.error("Данные о числе пар отсутствуют");
                }
            }
            
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                setError(String(err));
            }
        }
    };
    return (
    <>
        <form className="font-for-headers row" onSubmit={AddPScheduleSubmit} method="POST">
            <StyledAutocomplete
                className="w-25 mmt-1 smw-100"
                    id="combo-box-demo"
                options={optionsGroup}
                value={{ label: CurrentNameGroup}}
                noOptionsText={"Нет групп"}
                getOptionLabel={(option) => typeof option === 'object' && option !== null
                    ? (option as OptionType).label
                    : ''
                }
                renderInput={(params) => <TextField
                required
                    {...params}
                    label="Группа"
                    />}
                    onChange={(_, newValue) => {
                        const typedNewValue = newValue as OptionType;
                        if (typedNewValue === null) {
                            SetCurrentNameGroup('');
                        }
                        else {
                            if (typedNewValue && typedNewValue.value) {
                                changeGroup(typedNewValue.label); // Сразу вызываем смену группы при выборе нового значения
                            }
                            SetCurrentNameGroup('');
                        }
                        
                }}
                
            />
            {CurrentNameGroup && (
                <>
                    <StyledAutocomplete
                        className="w-75 mmt-1 smw-100"
                        id="combo-box-demo"
                        options={optionsTeacher}
                        noOptionsText={"Нет преподавателей"}
                            getOptionLabel={(option) => typeof option === 'object' && option !== null
                                ? (option as OptionType).label
                                : ''
                            }
                        renderInput={(params) => <TextField
                            required
                            {...params}
                            label="Преподаватель" />}
                            onChange={(_, newValue) => {
                                const typedNewValue = newValue as OptionType;
                                if (typedNewValue === null) {
                                    setID_Lesson(null);
                                    setLabelLesson(null);
                                    setID_Teacher(null);
                                    setLabelTeacher('');
                                    setFirstHour(null);
                                    setSecondHour(null);
                                }
                                else {
                                    setID_Lesson(null);
                                    setFirstHour(null);
                                    setSecondHour(null);
                                    setLabelLesson('');
                                    setID_Teacher(typedNewValue.value);
                                    setLabelTeacher(typedNewValue.label)
                                }
                            

                        }}
                    />
                    {ID_Teacher && (
                        <>
                            <StyledAutocomplete
                                className="w-50 mmt-1 mt-2 smw-100"
                                id="combo-box-demo"
                                options={optionsLesson}
                                value={{ label: LabelLesson }}
                                noOptionsText={"Нет учебных предметов"}
                                    getOptionLabel={(option) => typeof option === 'object' && option !== null
                                        ? (option as OptionTypeLessons).label
                                        : ''
                                    }
                                renderInput={(params) => <TextField
                                    required
                                    {...params}
                                    label="Учебный предмет" />}
                                    onChange={(_, newValue) => {
                                        const typedNewValue = newValue as OptionTypeLessons;
                                        if (typedNewValue === null) {
                                            setID_Lesson(null);
                                            setLabelLesson('');
                                            setLabelLessonWeek(null);
                                            setID_TeacherPlan(null);
                                        }
                                        else {
                                            setID_Lesson(typedNewValue.value);
                                            setLabelLesson(typedNewValue.label);
                                            setLabelLessonWeek(typedNewValue.lessonlabel);
                                            setID_TeacherPlan(typedNewValue.validate)
                                            handleSelectLesson(typedNewValue);
                                        }
                                    
                                }}
                            />
                            {ID_Lessons && (
                                <>
                                    <StyledAutocomplete
                                        className="w-25 mmt-1 smw-100 mt-2"
                                        id="combo-box-demo"
                                        options={optionsRoom}
                                        noOptionsText={"Нет кабинетов"}
                                            getOptionLabel={(option) => typeof option === 'object' && option !== null
                                                ? (option as OptionType).label
                                                : ''
                                            }
                                        renderInput={(params) => <TextField
                                            required
                                            {...params}
                                            label="Кабинет" />}
                                            onChange={(_, newValue) => {
                                                const typedNewValue = newValue as OptionType;
                                                if (typedNewValue === null) {
                                                    setID_Room(null);
                                                }
                                                else {
                                                    setID_Room(typedNewValue.value);
                                                }
                                        }}
                                    />
                                    <StyledAutocomplete
                                        className="w-25 smw-100 mt-2"
                                        id="combo-box-demo"
                                        options={optionsNLessons}
                                        noOptionsText={"Произошла ошибка"}
                                            getOptionLabel={(option) => typeof option === 'object' && option !== null
                                                ? (option as OptionTypeNumberLessons).label
                                                : ''
                                            }
                                        renderInput={(params) => <TextField
                                            required
                                            {...params}
                                            label="Номер занятия" />}
                                            onChange={(_, newValue) => {
                                                const typedNewValue = newValue as OptionTypeNumberLessons;
                                                if (typedNewValue === null) {
                                                    setNumberLesson(null);
                                                }
                                                else {
                                                    setNumberLesson(typedNewValue.value);
                                                }
                                        }}
                                        />
                                        <ThemeProvider theme={theme}>
                                            <div className="w-25 smw-100">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DateField']}>
                                                        <DateField
                                                            InputProps={{

                                                                style: {
                                                                    fontFamily: 'Vollda',
                                                                },
                                                            }}
                                                            InputLabelProps={{

                                                                style: {
                                                                    fontFamily: 'Vollda',
                                                                    color: '#616161',
                                                                },
                                                            }}
                                                            color='warning' // Используем созданный нами цвет
                                                            label="Дата"
                                                            value={DateTSchedules}
                                                            onChange={handleChange}
                                                            id="Date"
                                                            format='DD/MM/YYYY'
                                                            variant="outlined"
                                                            className='form-control'
                                                            required
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                        </ThemeProvider>
                                    
                                </>
                            )}
                           
                        </>
                    )}
                   
                </>
           )}
                <button type="submit" className="btn btn-warning text-light w-23 smw-40 mmt-2 smw-30 smmx-13 h-25 mt-2 " >Добавить</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {errorInServer && <p style={{ color: 'red' }}>{errorInServer}</p>}
                {errorInServerFirst && <p style={{ color: 'red' }}>{errorInServerFirst}</p>}
                {errorInServerSecond && <p style={{ color: 'red' }}>{errorInServerSecond}</p>}
                {errorInTeacherTime && <p style={{ color: 'red' }}>{errorInTeacherTime}</p>}
                {successPSchedule && <p style={{ color: 'orange' }}>{successPSchedule}</p>}
        </form>
            <Modal className="font-for-headers" show={showAddSubBurden} backdrop="static" keyboard={false}>
                <Modal.Header className="bg-dark text-light" >
                    <Modal.Title >Распределить пары</Modal.Title>
                </Modal.Header>
                <form onSubmit={AddSubBurden} method="POST">
                    <Modal.Body className="modal-body">
                        <ThemeProvider theme={theme} >
                            <div>
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='warning' // Используем созданный нами цвет
                                    label="Группа"
                                    id="Group" 
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    defaultValue={CurrentNameGroup}
                                    disabled
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme} >
                            <div className="mt-3">
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='warning' // Используем созданный нами цвет
                                    label="Преподаватель"
                                    id="Teacher"
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    defaultValue={LabelTeacher}
                                    disabled
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme} >
                            <div className="mt-3">
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='warning' // Используем созданный нами цвет
                                    label="Учебный предмет"
                                    id="Lesson"
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    defaultValue={LabelLesson}
                                    disabled
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme} >
                            <div className="mt-3">
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='warning' // Используем созданный нами цвет
                                    label="Всего пар в неделю"
                                    id="LessonWeek"
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    defaultValue={LabelLessonWeek}
                                    disabled
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme} >
                            <div className="mt-3">
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='warning' // Используем созданный нами цвет
                                    label="Количество пар в числите"
                                    id="FirstSemester" value={FirstHours} onChange={(e) => setFirstHour(Number(e.target.value))}
                                    variant="outlined"
                                    type='number'
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorFirst && <p style={{ color: 'red' }}>{errorFirst}</p>}
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme} >
                            <div className="mt-3">
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='warning' // Используем созданный нами цвет
                                    label="Количество пар в знаменателе"
                                    id="SecondSemester" value={SecondHours} onChange={(e) => setSecondHour(Number(e.target.value))}
                                    variant="outlined"
                                    type='number'
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {successSubBurden && <p style={{ color: 'orange' }}>{successSubBurden}</p>}
                                {errorSecond && <p style={{ color: 'red' }}>{errorSecond}</p>}
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="submit" className="btn btn-warning text-light">Создать</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AddTScheduleForm;