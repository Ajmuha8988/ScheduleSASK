import { useState, useEffect } from 'react';
import "./mobilebody.css";
import {
    TextField, Autocomplete, ThemeProvider, FormControlLabel, Switch,
    FormControl, FormGroup
} from "@mui/material";
import { createTheme } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { changeGroupService } from '../../utils/db/post/changeGroupInPSchedule';
import { PScheduleService } from '../../utils/db/post/AddPSchedule';
import { GeneralSubBurdenService } from '../../utils/db/post/CreateSubBurden';
import { GetAllgroups } from '../../utils/db/get/GetAllGroup';
import { GetPlanLesson } from '../../utils/db/get/GetPlanLesson';
import { GetAllrooms } from '../../utils/db/get/GetAllRoom';
import { GetAllTeacher } from '../../utils/db/get/GetAllTeacher';
import { GetAllSubBurden } from '../../utils/db/get/getAllSubBurden';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
import { styled, alpha } from "@mui/material/styles";
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import { calculateSemester } from '../../utils/Date/CalculateSemester';
import { Modal } from 'react-bootstrap';


const theme = createTheme({
    palette: {
        customColor: {
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
const SASKSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: "#ffc107",
        '&:hover': {
            backgroundColor: alpha("#ffc107", theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: "#ffc107",
    },
}));
const numberLesson = [1, 2, 3, 4, 5, 6, 7];
const daysOfweek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const kindOfschedules = ['Числитель', 'Знаменатель'];
const AddPScheduleForm = () => {
    const [showAddSubBurden, SetAddSubBurden] = useState(false);
    const [errorFirst, SetErrorFirst] = useState<string | null>(null);
    const [errorSecond, SetErrorSecond] = useState<string | null>(null);
    const [errorInServer, SetErrorInServer] = useState<string | null>(null);
    const [errorInServerFirst, SetErrorInServerFirst] = useState<string | null>(null);
    const [errorInServerSecond, SetErrorInServerSecond] = useState<string | null>(null);
    const [errorInTeacherTime, SetErrorInTeacherTime] = useState<string | null>(null);
    const [successSubBurden, SetSuccessSubBurden] = useState<string | null>(null);
    const [successPSchedule, SetSuccessPSchedule] = useState<string | null>(null);
    const { addPSchedule } = PScheduleService();
    const { addGeneralSubBurden } = GeneralSubBurdenService();
    const { EventChangeGroup } = changeGroupService();
    const { dataSemester } = calculateSemester();
    const { dataGroupName } = GetNamegroup();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : '';
    const [CurrentNameGroup, SetCurrentNameGroup] = useState('');
    useEffect(() => {
        SetCurrentNameGroup(nameGroup); // устанавливаем состояние только один раз
    }, [nameGroup]);
    const [LabelTeacher, setLabelTeacher] = useState(null);
    const [LabelLesson, setLabelLesson] = useState(null);
    const [LabelLessonWeek, setLabelLessonWeek] = useState(null);
    const [ID_TeacherPlans, setID_TeacherPlan] = useState(null);
    const [ID_Lessons, setID_Lesson] = useState(null);
    const [ID_Rooms, setID_Room] = useState(null);
    const [ID_Teacher, setID_Teacher] = useState(null);
    const [NumberLesson, setNumberLesson] = useState(null);
    const [DaysOfWeeks, setDaysOfWeek] = useState(null);
    const [KindOfSchedule, setKindOfSchedule] = useState(null);
    const [FirstHours, setFirstHour] = useState(null);
    const [SecondHours, setSecondHour] = useState(null);
    const [CombinedCouples, SetCombinedCouple] = useState(false);
    const group = GetAllgroups();
    const { dataPlanLesson } = GetPlanLesson();
    const { dataAllSubBurden } = GetAllSubBurden();
    const room = GetAllrooms();
    const teacher = GetAllTeacher();
    const filteredDataPlanLesson = dataPlanLesson.filter(
        lesson => lesson.Temp_ID_User === ID_Teacher && // Предполагается, что данные содержат Teacher_Temp_ID
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
    const optionsDOW = daysOfweek.map(daysOfweeks => ({
        label: daysOfweeks,
        value: daysOfweeks,
    }));
    const optionsKOS = kindOfschedules.map(kindOfscheduless => ({
        label: kindOfscheduless,
        value: kindOfscheduless,
    }));
    const [error, setError] = useState<string | null>(null);
    const changeGroup = async (groupId) => {
        try {
            await EventChangeGroup({ NameGroup: groupId }); // Выполняем изменение группы
            window.location.reload(); // Перезагружаем страницу после успешного изменения
        } catch (error) {
            setError(error.message); // Устанавливаем ошибку в состояние
        }
    };
    const lessonInputRef = React.useRef();
    const AddPScheduleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
             const successPSchedule = await addPSchedule({
                NameGroup: CurrentNameGroup,
                ID_Lesson: ID_Lessons,
                ID_Room: ID_Rooms,
                ID_user: ID_Teacher,
                NumberLessons: NumberLesson,
                DaysOfWeek: DaysOfWeeks,
                KindOfSchedules: KindOfSchedule,
                CombinedCouple: CombinedCouples
             });
            SetSuccessPSchedule(successPSchedule);
            SetErrorInServerFirst(null);
            SetErrorInServer(null);
            SetErrorInServerSecond(null);
            SetErrorInTeacherTime(null);
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            setError(error.message)
            SetSuccessPSchedule(null);
            SetErrorInServer(error.errormessageserver);
            SetErrorInServerFirst(error.firsterrormessage);
            SetErrorInServerSecond(error.hourerrormessage)
            SetErrorInTeacherTime(error.teacherrormessage);
        }

    };
    const AddSubBurden = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const successfullSubBurden = await addGeneralSubBurden({
                ID_TeacherPlan: ID_TeacherPlans,
                NumeratorPlan: FirstHours,
                DenominatorPlan: SecondHours
            });
            SetErrorFirst(null);
            SetErrorSecond(null);
            SetSuccessSubBurden(successfullSubBurden);
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            SetSuccessSubBurden(null);
            SetErrorFirst(error.errormessage1);
            SetErrorSecond(error.errormessage2);
        }

    };
    const handleSelectLesson = async (newValue) => {
        if (!newValue || !newValue.validate) {
            setFirstHour('');
            setSecondHour('');
        } ;

        try {
            // Получаем часы преподавателя непосредственно из массива учителей
            const selectedLesson = filteredDataPlanLesson.find(t => t.ID_TeacherPlan === newValue.validate);
            const selectedSubBurden = dataAllSubBurden.find(x => x.ID_TeacherPlan === selectedLesson.ID_TeacherPlan);
            if (selectedSubBurden && selectedSubBurden.NumeratorPlan !== undefined && selectedSubBurden.DenominatorPlan !== undefined) {
                setFirstHour(selectedSubBurden.NumeratorPlan.toString());
                setSecondHour(selectedSubBurden.DenominatorPlan.toString());
            } else {
                SetAddSubBurden(true);
                console.error("Данные о числе пар отсутствуют");
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    const handleToggleChange = (event) => {
        if (event.target.checked === true) {
            console.log(event.target.checked);
            SetCombinedCouple(true);
        }
        else{
            console.log(event.target.checked);
            SetCombinedCouple(false);
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
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField
                required
                InputLabelProps={{
                     style: {
                        fontFamily: 'Vollda'
                     }
                    }}
                    {...params}
                    label="Группа"
                    />}
                    onChange={(event, newValue) => {
                        if (newValue && newValue.value) {
                            changeGroup(newValue.label); // Сразу вызываем смену группы при выборе нового значения
                        }
                        SetCurrentNameGroup('');
                }}
                
            />
            {CurrentNameGroup && (
                <>
                    <StyledAutocomplete
                        className="w-75 mmt-1 smw-100"
                        id="combo-box-demo"
                        options={optionsTeacher}
                        noOptionsText={"Нет преподавателей"}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField
                            required
                            InputLabelProps={{
                                style: {
                                    fontFamily: 'Vollda'
                                }
                            }}
                            {...params}
                            label="Преподаватель" />}
                            onChange={(event, newValue) => {
                            setID_Lesson('');
                            setLabelLesson('');
                            setID_Teacher(newValue?.value);
                            setLabelTeacher(newValue?.label)

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
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField
                                    required
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Vollda'
                                        }
                                    }}
                                    {...params}
                                    label="Учебный предмет" />}
                                onChange={(event, newValue) => {
                                    setID_Lesson(newValue?.value);
                                    setLabelLesson(newValue?.label);
                                    setLabelLessonWeek(newValue?.lessonlabel);
                                    setID_TeacherPlan(newValue?.validate)
                                    handleSelectLesson(newValue);
                                }}
                            />
                            {ID_Lessons && (
                                <>
                                    <StyledAutocomplete
                                        className="w-25 mmt-1 smw-100 mt-2"
                                        id="combo-box-demo"
                                        options={optionsRoom}
                                        noOptionsText={"Нет кабинетов"}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField
                                            required
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Vollda'
                                                }
                                            }}
                                            {...params}
                                            label="Кабинет" />}
                                        onChange={(event, newValue) => {
                                            setID_Room(newValue?.value);
                                        }}
                                    />
                                    <StyledAutocomplete
                                        className="w-25 smw-100 mt-2"
                                        id="combo-box-demo"
                                        options={optionsNLessons}
                                        noOptionsText={"Произошла ошибка"}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField
                                            required
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Vollda'
                                                }
                                            }}
                                            {...params}
                                            label="Номер занятия" />}
                                        onChange={(event, newValue) => {
                                            setNumberLesson(newValue?.value);
                                        }}
                                    />
                                    <StyledAutocomplete
                                        className="w-25 smw-100 mt-2"
                                        id="combo-box-demo"
                                        options={optionsDOW}
                                        noOptionsText={"Произошла ошибка"}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField
                                            required
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Vollda'
                                                }
                                            }}
                                            {...params}
                                            label="День недели" />}
                                        onChange={(event, newValue) => {
                                            setDaysOfWeek(newValue?.value);
                                        }}
                                    />
                                    <StyledAutocomplete
                                        className="w-25 smw-100 mt-2"
                                        id="combo-box-demo"
                                        options={optionsKOS}
                                        noOptionsText={"Произошла ошибка"}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField
                                            required
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Vollda'
                                                }
                                            }}
                                            {...params}
                                            label="Тип расписание" />}
                                        onChange={(event, newValue) => {
                                            setKindOfSchedule(newValue?.value);
                                        }}
                                    />
                                    <ThemeProvider theme={theme}>
                                        <div className="mt-2 w-25 smw-100">
                                            <TextField
                                                id="standard-suffix-shrink"
                                                label="Количество пар в 1-ом семестре"
                                                variant="standard"
                                                color='customColor'
                                                value={FirstHours || ''}
                                                InputProps={{
                                                    style: {
                                                        fontFamily: 'Vollda',
                                                        color: '#616161',
                                                    },
                                                }}
                                                InputLabelProps={{

                                                    style: {
                                                        fontFamily: 'Vollda',
                                                        color: '#616161',
                                                    },
                                                }}
                                                slotProps={{
                                                    htmlInput: {
                                                        sx: {
                                                            textAlign: 'center',
                                                            fontFamily: 'Vollda',
                                                            color: '#616161',
                                                        },
                                                    },
                                                    input: {
                                                        readOnly: true,
                                                        endAdornment: (
                                                            <InputAdornment
                                                                className='font-for-headers'
                                                                position="end"
                                                                sx={{
                                                                    alignSelf: 'flex-end',
                                                                    margin: 0,
                                                                    marginBottom: '5px',
                                                                    opacity: 0,
                                                                    pointerEvents: 'none',
                                                                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                                                        opacity: 1,
                                                                    },
                                                                    fontFamily: 'Vollda',
                                                                    color: '#616161',
                                                                }}
                                                            >
                                                                часов
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                            />
                                        </div>
                                    </ThemeProvider>
                                    <ThemeProvider theme={theme}>
                                        <div className="mt-2 w-25 smw-100">
                                            <TextField
                                                id="standard-suffix-shrink"
                                                label="Количество пар во 2-ом семестре"
                                                variant="standard"
                                                value={SecondHours || ''}
                                                color='customColor'
                                                InputProps={{
                                                    style: {
                                                        fontFamily: 'Vollda',
                                                        color: '#616161',
                                                    },
                                                }}
                                                InputLabelProps={{

                                                    style: {
                                                        fontFamily: 'Vollda',
                                                        color: '#616161',
                                                    },
                                                }}
                                                slotProps={{
                                                    htmlInput: {
                                                        sx: {
                                                            textAlign: 'center',
                                                            fontFamily: 'Vollda',
                                                            color: '#616161',
                                                        },
                                                    },
                                                    input: {
                                                        readOnly: true,
                                                        endAdornment: (
                                                            <InputAdornment
                                                                className='font-for-headers'
                                                                position="end"
                                                                sx={{
                                                                    alignSelf: 'flex-end',
                                                                    margin: 0,
                                                                    marginBottom: '5px',
                                                                    opacity: 0,
                                                                    pointerEvents: 'none',
                                                                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                                                        opacity: 1,
                                                                    },
                                                                    fontFamily: 'Vollda',
                                                                    color: '#616161',
                                                                }}
                                                            >
                                                                часов
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                            />
                                        </div>
                                    </ThemeProvider>
                                        <FormControl className="mt-2 w-25 smw-100" component="fieldset">
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    control={<SASKSwitch onChange={handleToggleChange} />}
                                                    label="Совмещённая пара"
                                                    labelPlacement="start"
                                                    sx={{
                                                        '.MuiFormControlLabel-label': { // Целимся на сам тег Label
                                                            fontFamily: 'Vollda', // Семейство шрифта
                                                        }
                                                    }}
                                            />
                                        </FormGroup>
                                    </FormControl>
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
                                    color='customColor' // Используем созданный нами цвет
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
                                    color='customColor' // Используем созданный нами цвет
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
                                    color='customColor' // Используем созданный нами цвет
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
                                    color='customColor' // Используем созданный нами цвет
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
                                    color='customColor' // Используем созданный нами цвет
                                    label="Количество пар в числите"
                                    id="FirstSemester" value={FirstHours} onChange={(e) => setFirstHour(e.target.value)}
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
                                    color='customColor' // Используем созданный нами цвет
                                    label="Количество пар в знаменателе"
                                    id="SecondSemester" value={SecondHours} onChange={(e) => setSecondHour(e.target.value)}
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

export default AddPScheduleForm;