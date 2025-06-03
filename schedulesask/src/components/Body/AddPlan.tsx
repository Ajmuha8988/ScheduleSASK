import { useState } from 'react';
import "./mobilebody.css"
import {
    TextField, Autocomplete, ThemeProvider, FormControl,
    InputLabel, Select, MenuItem, SelectChangeEvent
} from "@mui/material";
import { createTheme } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { PlanDataService } from '../../utils/db/post/AddPlan';
import { GetAllgroups } from '../../utils/db/get/GetAllGroup';
import { GetAlllessons } from '../../utils/db/get/GetAllLessons';
import { GetTeacherinburden } from '../../utils/db/get/GetTeacherInBurden';
import { styled } from "@mui/material/styles";
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';

interface OptionType {
    label: string;
    value: bigint;
}

const theme = createTheme({
    palette: {
        warning: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
        info: {
            main: '#616161', // Замените на нужный вам цвет
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
const AddPlanForm = () => {
    const navigate = useNavigate();
    const { addPlan } = PlanDataService();
    const [ID_Groups, setID_Group] = useState<bigint | null>(null); 
    const [ID_Lessons, setID_Lesson] = useState<bigint | null>(null); 
    const [NumberHourInWeeks, setNumberHourInWeeks] = useState<number | null>(null);
    const [ID_Teachers, setID_Teacher] = useState<bigint | null>(null); 
    const [TimeForLessons, setTimeForLessons] = useState<number | null>(null);
    const [KindOfSemesters, setKindOfSemester] = useState<string>("");
    const [FirstSemesterHours, setFirstSemesterHour] = useState<string>("");
    const [SecondSemesterHours, setSecondSemesterHours] = useState<string>("");
    const [Success, SetSuccess] = useState<string | null>(null);
    const [errorMessage, SetErrorMessage] = useState<string | null>(null);
    const group = GetAllgroups();
    const lesson = GetAlllessons();
    const teacher = GetTeacherinburden();
    const optionsGroup = group.map(groups => ({
        label: `${groups.NameGroup}`,
        value: groups.ID_Group,
    }));
    const optionsLesson = lesson.map(lessons => ({
        label: `${lessons.NameLesson}`,
        value: lessons.ID_Lesson,
    }));
    const optionsTeacher = teacher.map(teachers => ({
        label: `${teachers.Lastname} ${teachers.Firstname} ${teachers.Patronymic}`,
        value: teachers.Temp_ID_User,

    }));
    const handleSelectTeacher = async (newValue: OptionType) => {
        if (!newValue || !newValue.value) {
            setFirstSemesterHour('');
            setSecondSemesterHours('');
        }
        try {
            // Получаем часы преподавателя непосредственно из массива учителей
            const selectedTeacher = teacher.find(
                (t) => BigInt(t.Temp_ID_User) === BigInt(newValue.value)
            );

            if (selectedTeacher && selectedTeacher.FirstSemesterHour !== undefined
                && selectedTeacher.SecondSemesterHour !== undefined) {
                setFirstSemesterHour(selectedTeacher.FirstSemesterHour.toString());
                setSecondSemesterHours(selectedTeacher.SecondSemesterHour.toString());
            } else {
                setFirstSemesterHour('');
                setSecondSemesterHours('');
                console.error("Данные о числе часов отсутствуют");
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log(String(err)); // Конвертируем err в строку, если это не стандартный Error
            }
        }
    };
    const AddPlanSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!ID_Groups || !ID_Lessons || !TimeForLessons || !ID_Teachers
            || !NumberHourInWeeks || !KindOfSemesters) {
            console.log("Невозможно добавить учебный план.");
            return;
        }
        try {
            const successfullPlan =  await addPlan({
                ID_Group: ID_Groups,
                ID_Lesson: ID_Lessons,
                TimeForLesson: TimeForLessons,
                ID_Teacher: ID_Teachers,
                NumberHourInWeek: NumberHourInWeeks,
                KindOfSemester: KindOfSemesters
            });
            SetErrorMessage(null);
            SetSuccess(successfullPlan)
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            if (error instanceof Error) {
                SetErrorMessage(error.message);
            } else {
                SetErrorMessage(String(error)); // Конвертируем err в строку, если это не стандартный Error
            }
            SetSuccess(null);
        }

    };
    return (
        <form className="font-for-headers row" onSubmit={AddPlanSubmit} method="POST">
            <StyledAutocomplete
                className="w-75 mmt-1 mt-2 smw-100"
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
                        setID_Teacher(null);
                        handleSelectTeacher({ label: '', value: BigInt(0) })
                    }
                    else {
                        setID_Teacher(typedNewValue.value);
                        handleSelectTeacher(typedNewValue);
                    }
                }}
            />
            <StyledAutocomplete
                className="w-25 mmt-1 mt-2 smw-100"
                id="combo-box-demo"
                options={optionsGroup}
                noOptionsText={"Нет групп"}
                getOptionLabel={(option) => typeof option === 'object' && option !== null
                    ? (option as OptionType).label
                    : ''
                }
                renderInput={(params) => <TextField
                    required
                    {...params}
                    label="Группа" />}
                onChange={(_, newValue) => {
                    const typedNewValue = newValue as OptionType;
                    if (typedNewValue === null) {
                        setID_Group(null);
                    } else {
                        setID_Group(typedNewValue.value);
                    }
                }}
            />
            <StyledAutocomplete
                className="w-50 mmt-1 mt-2 smw-100"
                id="combo-box-demo"
                options={optionsLesson}
                noOptionsText={"Нет учебных предметов"}
                getOptionLabel={(option) => typeof option === 'object' && option !== null
                    ? (option as OptionType).label
                    : ''
                }
                renderInput={(params) => <TextField
                    required
                    {...params}
                    label="Учебный предмет" />}
                onChange={(_, newValue) => {
                    const typedNewValue = newValue as OptionType;
                    if (typedNewValue === null) {
                        setID_Lesson(null);
                    } else {
                        setID_Lesson(typedNewValue.value);
                    }
                }}
            />
            <ThemeProvider theme={theme} >
                <div className="mt-2 w-25 smw-100">
                    <TextField
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
                        color='warning' // Используем созданный нами цвет
                        label="Всего часов на предмет"
                        id="TimeForLessons" value={TimeForLessons} onChange={(e) => setTimeForLessons(Number(e.target.value))}
                        variant="outlined"
                        type='number'
                        className='form-control'
                        required
                    />
                </div>
            </ThemeProvider>
            <ThemeProvider theme={theme} >
                <div className="mt-2 w-25 smw-100">
                    <TextField
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
                        color='warning' // Используем созданный нами цвет
                        label="Количество часов в неделю"
                        id="NumberHourInWeeks" value={NumberHourInWeeks} onChange={(e) => setNumberHourInWeeks(Number(e.target.value))}
                        variant="outlined"
                        type='number'
                        className='form-control'
                        required
                    />
                </div>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
                <div className="mt-2 w-25 smw-100">
                    <FormControl fullWidth >
                        <InputLabel id="demo-select-small-label" className='font-for-headers' color='info' required>Семестр</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={KindOfSemesters}
                            label="Семестр"
                            onChange={(e: SelectChangeEvent) => setKindOfSemester(e.target.value)}
                            color='warning'
                            sx={{
                                fontFamily: "Vollda",
                                color: '#616161',
                            }} required>
                            <MenuItem value='1-ый' className='font-for-headers'>1-ый</MenuItem>
                            <MenuItem value='2-ой' className='font-for-headers'>2-ой</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
                <div className="mt-2 w-25 smw-100">
                    <TextField
                        id="standard-suffix-shrink"
                        label="1-ый семестр"
                        variant="standard"
                        color='warning'
                        value={FirstSemesterHours || ''}
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
                        label="2-ой семестр"
                        variant="standard"
                        value={SecondSemesterHours || ''}
                        color='warning'   
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
            <script src='./body.js'></script>
            <div className='justify-content-between'>
                <button type="submit" id="SubmitButton" className="btn btn-warning text-light mt-3 " >Добавить</button>
                <button className="btn btn-dark text-light mms-2 mt-3 " onClick={() => navigate('/administrator/pscheduleconstructor')} >Приступить к созданию постоянного расписания</button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {Success && <p style={{ color: '#ffc107' }}>{Success}</p>}
        </form>
    );
};

export default AddPlanForm;