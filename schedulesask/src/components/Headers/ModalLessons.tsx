import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import "./mobileheaders.css"
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import { LessonService } from '../../utils/db/post/CreateLesson';
import * as React from 'react';

const theme = createTheme({
    palette: {
        warning: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});

const AddLessonButton = () => {
    const location = useLocation();
    const [errorLesson, SetErrorLesson] = useState<string | null>(null);
    const [Success, SetSuccess] = useState<string | null>(null);
    const [Lesson, setLesson] = useState('');
    const { addLesson } = LessonService();
    const [showAddLesson, SetAddLesson] = useState(false);
    const CreateLesson = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const successfullLesson = await addLesson({
                NameLesson: Lesson
            });
            if (location.pathname === '/administrator') {
                SetErrorLesson(null);
                SetSuccess(successfullLesson)
            } else {
                setTimeout(() => window.location.reload(), 1000);
                SetErrorLesson(null);
                SetSuccess(successfullLesson);
            }
        } catch (error) {
            if (error instanceof Error) {
                SetErrorLesson(error.message);
                SetSuccess(null);
            } else {
                SetErrorLesson(String(error));
                SetSuccess(null);
            } 
        }
    };
    return (
        <>
            <li><button className="dropdown-item text-light" onClick={() => SetAddLesson(true)}>Предмет</button></li>
            <Modal className="font-for-headers" show={showAddLesson} onHide={() => SetAddLesson(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title >Создание предмета</Modal.Title>
                </Modal.Header>
                <form onSubmit={CreateLesson} method="POST">
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
                                    color='warning' // Используем созданный нами цвет
                                    label="Учебный предмет"
                                    id="Lesson" value={Lesson} onChange={(e) => setLesson(e.target.value)}
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorLesson && <p style={{ color: 'red' }}>{errorLesson}</p>}
                                {Success && <p style={{ color: '#ffc107' }}>{Success}</p>}
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => SetAddLesson(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light">Создать</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AddLessonButton;