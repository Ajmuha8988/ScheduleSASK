import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./mobileheaders.css"
import { TextField, Autocomplete, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import { GeneralBurdenService } from '../../utils/db/post/CreateGeneralBurden';
import * as React from 'react';
import { styled } from "@mui/material/styles";
import { GetAllTeacher } from '../../utils/db/get/GetAllTeacher';


const theme = createTheme({
    palette: {
        warning: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },

    
});
interface OptionType {
    label: string;
    value: bigint;
}
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
        color: "#000",

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


const ModalSettingsBurden = () => {
    const [errorTime, SetErrorTime] = useState<string | null>(null);
    const [Success, SetSuccess] = useState<string | null>(null);
    const [FirstSemesters, setFirstSemester] = useState<number | null>(null);
    const [SecondSemesters, setSecondSemester] = useState<number | null>(null);
    const { addGeneralBurden } = GeneralBurdenService();
    const [ID_Teachers, setID_Teacher] = useState<bigint | null>(null);
    const teacher = GetAllTeacher();
    const optionsTeacher = teacher?.length > 0 ? teacher.map((teachers) => ({
        label: `${teachers.Lastname} ${teachers.Firstname} ${teachers.Patronymic}`,
        value: teachers.Temp_ID_User,
    })) : [];
    const [showAddBurden, SetAddBurden] = useState(false);
    const CreateGeneralBurden = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!ID_Teachers || !FirstSemesters || !SecondSemesters) {
            SetErrorTime('Произошла непредвиденная ошибка');
            return
        }
        else {
            try {
                const successfullGeneralBurden = await addGeneralBurden({
                    ID_Teacher: ID_Teachers,
                    FirstSemester: FirstSemesters,
                    SecondSemester: FirstSemesters
                });
                if (location.pathname === '/administrator') {
                    SetErrorTime(null);
                    SetSuccess(successfullGeneralBurden)
                } else {
                    setTimeout(() => window.location.reload(), 1000);
                    SetErrorTime(null);
                    SetSuccess(successfullGeneralBurden)
                }

            } catch (error) {
                if (error instanceof Error) {
                    SetErrorTime(error.message);
                    SetSuccess(null)
                } else {

                    SetErrorTime(String(error));
                    SetSuccess(null)
                }
            }
        }
        
    };
    return (
        <>
            <li><button className="dropdown-item text-light" onClick={() => SetAddBurden(true)}>Нагрузку</button></li>
            <Modal className="font-for-headers" show={showAddBurden} onHide={() => SetAddBurden(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title >Назначить нагрузку</Modal.Title>
                </Modal.Header>
                <form onSubmit={CreateGeneralBurden} method="POST">
                    <Modal.Body className="modal-body">
                        <StyledAutocomplete
                            className="w-100 mmt-1 smw-100"
                            id="combo-box-demo"
                            options={optionsTeacher}
                            noOptionsText={"Нет преподавателей"}
                            getOptionLabel={(option) => typeof option === 'object' && option !== null
                                ? (option as OptionType).label
                                : ''}
                            renderInput={(params) => <TextField
                                required
                                {...params}
                                size='small'
                                label="Преподаватель" />}
                            onChange={(_, newValue ) => {
                                const typedNewValue = newValue as OptionType;
                                setID_Teacher(typedNewValue.value);
                            }}
                        />
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
                                    label="Нагрузка на 1-ый семестр (в часах)"
                                    id="FirstSemester" value={FirstSemesters} onChange={(e) => setFirstSemester(Number(e.target.value))}
                                    variant="outlined"
                                    type='number'
                                    className='form-control'
                                    size='small'
                                    required
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
                                    label="Нагрузка на 2-ой семестр (в часах)"
                                    id="SecondSemester" value={SecondSemesters} onChange={(e) => setSecondSemester(Number(e.target.value))}
                                    variant="outlined"
                                    type='number'
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorTime && <p style={{ color: 'red' }}>{errorTime}</p>}
                                {Success && <p style={{ color: '#ffc107' }}>{Success}</p>}
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => SetAddBurden(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light">Создать</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default ModalSettingsBurden;