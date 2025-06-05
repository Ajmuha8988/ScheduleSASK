import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./mobileheaders.css"
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { SelectChangeEvent, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { RegisterService } from '../../utils/db/post/Register_user';
import { FormControl } from "@mui/material";

const theme = createTheme({
    palette: {
        warning: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
        info:{
            main: '#616161', // Замените на нужный вам цвет
        }
    },
});

const RegisterButton = () => {
    const [showRegistration, setRegistrationShow] = useState(false);
    const [Lastname, setLastname] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Patronymic, setPatronymic] = useState('');
    const [Emails, setEmail] = useState<string | null>('');
    const [Password, setPassword] = useState('');
    const [CallNumber, setCallNumber] = useState('');
    const [errors, setErrors] = useState('');  
    const [Role, setRole] = React.useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { registerUser } = RegisterService();
    const [errorEmail, setErrorEmail] = useState<string | null>(null);
    const [errorCall, setErrorCall] = useState<string | null>(null);
    const [errorPassword, setPasswordMessage] = useState<string | null>(null);
    const RegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!Emails || CallNumber.length < 10) {
            setErrors('Номер телефона должен превышать 10');
            return;
        }
        else {
            if (Password !== confirmPassword) {
                setPasswordMessage('Пароли не совпадают');
            } else {
                setPasswordMessage('');
                try {
                    await registerUser({
                        Lastname: Lastname,
                        Firstname: Firstname,
                        Patronymic: Patronymic,
                        Email: Emails,
                        Password: Password,
                        CallNumber: CallNumber,
                        Role: Role
                    });
                } catch (error) {
                    if (error instanceof Error) {
                        const parsedError = JSON.parse(error.message);
                        // Выводим наиболее значимую ошибку
                        setErrorEmail(parsedError.message);
                        setErrorCall(parsedError.messagecall);
                    } else {
                        setErrorEmail(String(error));
                        setErrorCall(String(error));
                    }
                }
            }
        }
        
    };
    return (
        <header>
            <button className="btn btn-warning text-light mobile-button ms-2" onClick={() => setRegistrationShow(true)}>
                Регистрация
            </button>
            <Modal className="font-for-headers" show={showRegistration} onHide={() => setRegistrationShow(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title>Регистрация</Modal.Title>
                </Modal.Header>
                <form onSubmit={RegisterSubmit} method="POST" action="/register">
                    <Modal.Body className="modal-body">
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
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
                                    size='small'
                                    className='form-control'
                                    color='warning' // Используем созданный нами цвет
                                    label="Фамилия"
                                    variant="outlined"
                                    id="Lastname" value={Lastname} onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
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
                                    label="Имя"
                                    variant="outlined"
                                    id="Fistname" value={Firstname} onChange={(e) => setFirstname(e.target.value)}
                                    className='form-control'
                                    size='small'
                                    required
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
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
                                    label="Отчество"
                                    variant="outlined"
                                    id="Patronymic" value={Patronymic} onChange={(e) => setPatronymic(e.target.value)}
                                    className='form-control'
                                    size='small'
                                    required
                                />
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
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
                                    label="Почта"
                                    type="email" id="Email" value={Emails} onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
                            </div>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
                            <PhoneInput
                                inputProps={{
                                    style: {
                                        ClassNames: 'font-for-headers',
                                        fontSize: '14px', /* Уменьшаем шрифт */
                                        height: '40px',   /* Уменьшаем высоту поля ввода */
                                        width: '100%'
                                    },
                                }}
                                containerClass='my-custom-container'
                                specialLabel='Номер телефона'
                                onlyCountries={['ru', 'kz', 'ua', 'cn', 'by', 'tr']}
                                country='ru'
                                value={CallNumber} onChange={(value) => {
                                    setCallNumber(value); // Обновляем номер телефона
                                }}             // Используем ошибку для визуального выделения
                                containerStyle={{ marginBottom: '8px' }}  // Пространство между полями
                            />

                                {/* Отображаем сообщение об ошибке */}
                                {errors && <p style={{ color: 'red' }}>{errors}</p>}
                                {errorCall && <p style={{ color: 'red' }}>{errorCall}</p>}
                            </div>
                        </ThemeProvider>
                        <div className="mb-3">
                            <ThemeProvider theme={theme}>
                                <div className="mb-3">
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
                                        label="Пароль"
                                        type="password" value={Password} onChange={(e) => setPassword(e.target.value)}
                                        variant="outlined"
                                        className='form-control'
                                        size='small'
                                        required
                                    />
                                </div>
                            </ThemeProvider>
                        </div>
                        <div className="mb-3">
                            <ThemeProvider theme={theme}>
                                <div className="mb-3">
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
                                        label="Повторите пароль"
                                        type="password"
                                        variant="outlined"
                                        className='form-control'
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        size='small'
                                        required
                                    />
                                </div>
                                {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
                            </ThemeProvider>
                        </div>
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-select-small-label" className='font-for-headers' color='info' >Пользователь</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={Role}
                                        label="Пользователь"
                                        onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
                                        color='warning'
                                        sx={{ fontFamily: "Vollda", }} required>
                                        <MenuItem value='Студент' className='font-for-headers'>Студент</MenuItem>
                                        <MenuItem value='Преподаватель' className='font-for-headers'>Преподаватель</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => setRegistrationShow(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light" >Зарегистрироваться</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </header>
      
    );
};

export default RegisterButton;