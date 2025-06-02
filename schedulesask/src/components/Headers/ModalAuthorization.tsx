import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./mobileheaders.css"
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { AuthorizateService } from '../../utils/db/post/Authorization_user';

const theme = createTheme({
    palette: {
        customColor: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});

const AuthorizateButton = () => {
    const [errorAuthorization, SetErrorAuthorization] = useState<string | null>(null);
    const [Email, setEmail] = useState<{ Email: string } | null>();
    const [Password, setPassword] = useState('');
    const { authorizateUser } = AuthorizateService();
    const [errorEmail, setErrorEmail] = useState<string | null>(null);
    const [showAuthorization, setAuthorizationShow] = useState(false);
    const AuthorizateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await authorizateUser({
                Email: Email,
                Password: Password
            });
        } catch (error) {
            SetErrorAuthorization(error.message);
        }

    };
    return (
        <header>
            <button className="btn btn-warning text-light mobile-button ms-2" onClick={() => setAuthorizationShow(true)}>
                Войти
            </button>
            <Modal className="font-for-headers" show={showAuthorization} onHide={() => setAuthorizationShow(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title >Авторизация</Modal.Title>
                </Modal.Header>
                <form onSubmit={AuthorizateSubmit} method="POST" action="/register">
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
                                    color='customColor' // Используем созданный нами цвет
                                    label="Почта"
                                    type="email" id="Email" value={Email} onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorEmail && <p style={{ color: 'red' }}>{errorEmail}</p>}
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
                                        color='customColor' // Используем созданный нами цвет
                                        label="Пароль"
                                        type="password" value={Password} onChange={(e) => setPassword(e.target.value)}
                                        variant="outlined"
                                        className='form-control'
                                        size='small'
                                        required
                                    />
                                    {errorAuthorization && <p style={{ color: 'red' }}>{errorAuthorization}</p>}
                                </div>
                            </ThemeProvider>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => setAuthorizationShow(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light" >Войти</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </header>

    );
};

export default AuthorizateButton;