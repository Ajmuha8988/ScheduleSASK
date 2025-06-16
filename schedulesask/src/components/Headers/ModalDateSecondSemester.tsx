import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./mobileheaders.css"
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { createTheme, ThemeProvider } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import { DateSecondSemesterService } from '../../utils/db/post/AddDateSecondSemester';
import * as React from 'react';
import dayjs, {Dayjs } from 'dayjs'; // Обязательно импортируйте библиотеку Day.js

const theme = createTheme({
    palette: {
        warning: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});

const AddDateSecondSemesterButton = () => {
    const [errorDateSecondSemester, SetDateSecondSemester] = useState<string | null>(null);
    const [Success, SetSuccess] = useState<string | null>(null);
    const [DatesecondSemester, setDatesecondSemester] = useState<Dayjs | null>(dayjs());
    const { addDateSecondSemester } = DateSecondSemesterService();
    const [showAddDateSecondSemester, SetAddDateSecondSemester] = useState(false);
    const handleChange = (newValue: Dayjs | null) => {
        setDatesecondSemester(newValue); // Теперь это работает правильно
    };
    const CreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (DatesecondSemester === null) {
            SetDateSecondSemester('Заполните данные до конца!');
        } else {
            try {
                const successfullRoom = await addDateSecondSemester({
                    DateSecondSemester: DatesecondSemester.format('DD/MM/YYYY')
                });
                if (location.pathname === '/administrator') {
                    SetDateSecondSemester(null);
                    SetSuccess(successfullRoom);
                } else {
                    setTimeout(() => window.location.reload(), 1000);
                    SetDateSecondSemester(null);
                    SetSuccess(successfullRoom);
                }
            } catch (error) {
                if (error instanceof Error) {
                    SetDateSecondSemester(error.message);
                    SetSuccess(null);
                } else {
                    SetDateSecondSemester(String(error));
                    SetSuccess(null);
                }
            }
        }
        
    };
    return (
        <>
            <li><button className="dropdown-item text-light" onClick={() => SetAddDateSecondSemester(true)}>Дату выхода</button></li>
            <Modal className="font-for-headers" show={showAddDateSecondSemester} onHide={() => SetAddDateSecondSemester(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title >Назначение даты выхода на 2-ой семестр</Modal.Title>
                </Modal.Header>
                <form onSubmit={CreateRoom} method="POST">
                    <Modal.Body className="modal-body">
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
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
                                            value={DatesecondSemester}
                                            onChange={handleChange}
                                            id="Date"
                                            format='DD/MM/YYYY'
                                            variant="outlined"
                                            className='form-control'
                                            size='small'
                                            required
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                {errorDateSecondSemester && <p style={{ color: '#ffc107' }}>{errorDateSecondSemester}</p>}
                                {Success && <p style={{ color: '#ffc107' }}>{Success}</p>}
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => SetAddDateSecondSemester(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light">Назначить</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AddDateSecondSemesterButton;